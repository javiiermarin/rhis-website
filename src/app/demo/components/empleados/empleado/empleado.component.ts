import {Component, OnInit} from '@angular/core';
import {EmpleadoService} from "../../../service/empleado.service";
import {EmpleadoResponse} from "../../../api/empleadoResponse";
import {MessageService} from "primeng/api";
import {EmpleadoRequest} from "../../../api/empleadoRequest";
import {catchError, finalize, of, switchMap} from "rxjs";
import {PuestoService} from "../../../service/puesto.service";
import {PuestoResponse} from "../../../api/puestoResponse";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmpleadoReferencia} from "../../../api/empleadoReferencia";
import {ExperienciaLaboral} from "../../../api/experienciaLaboral";
import {format} from "date-fns";

@Component({
  selector: 'app-empleado',
  providers: [MessageService],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.scss'
})
export class EmpleadoComponent implements OnInit{

  empleadoDialog: boolean = false;
  eliminarEmpleadoDialog: boolean = false;
  isEdit: boolean = false;

  empleadosResponse: EmpleadoResponse [] = [];
  lstpuestosResponse: PuestoResponse[] = [];

  selectedEmpleado: EmpleadoResponse;

  empleado: EmpleadoResponse = new EmpleadoResponse();
  empleadoReferencia1: EmpleadoReferencia = new EmpleadoReferencia();
  empleadoReferencia2: EmpleadoReferencia = new EmpleadoReferencia();
  empleadoReferencia3: EmpleadoReferencia = new EmpleadoReferencia();
  experienciaLaboral: ExperienciaLaboral = new ExperienciaLaboral();

  empleadoFormGroup: FormGroup;

  constructor(private empleadoService: EmpleadoService,
              private messageService: MessageService,
              private puestoService: PuestoService,) {
  }
  ngOnInit() {
    this.empleadoService.obtenerEmpleados().subscribe(data => this.empleadosResponse=data),
    this.puestoService.obtenerPuestos().subscribe(data => this.lstpuestosResponse = data),
    this.initFormGroup()
    };

  initFormGroup(){
    this.empleadoFormGroup = new FormGroup({
      idEmpleado: new FormControl(null),
      nombres: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      dpi: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      direccion: new FormControl(null, Validators.required),
      genero: new FormControl(null),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      nit: new FormControl(null),
      nacionalidad: new FormControl(null),
      nivelIngles: new FormControl(null),
      fechaNacimiento: new FormControl(null),
      fechaIngreso: new FormControl(null),
      fechaSalida: new FormControl(null),
      estadoCivil: new FormControl(null),
      salario: new FormControl(null),
      puesto: new FormControl(null),
    });
  }

  openNew(){
    this.empleadoFormGroup.reset()
    this.empleadoDialog = true;
    this.empleadoReferencia1 = new EmpleadoReferencia();
    this.empleadoReferencia2 = new EmpleadoReferencia();
    this.empleadoReferencia3 = new EmpleadoReferencia();
    this.experienciaLaboral = new ExperienciaLaboral();
    this.isEdit=false;
  }

  ocultarDialogo(){
    this.empleadoDialog=false;
  }

  editarEmpleado(empleadoResponse: EmpleadoResponse){
    this.empleadoDialog = true;
    this.isEdit= true;
    this.empleadoFormGroup = this.editarFormGroup(empleadoResponse);

  }

  eliminarEmpleado(empleadoResponse){

    this.eliminarEmpleadoDialog = true;
  }

  confirmarEliminacion(){

  }

  crearEmpleado(){
    if (!this.empleadoFormGroup.valid) {
      this.empleadoFormGroup.markAllAsTouched();
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'El formulario tiene campos incompletos.' });
      return;
    }

    let empleadoRequest1 = this.functionEmpleadoRequest();

    this.empleadoService.crearEmpleado(empleadoRequest1)
        .pipe(
            switchMap(() => this.empleadoService.obtenerEmpleados()),
            catchError(() => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Ha ocurrido un error al crear el campo personalizado. Por favor, inténtelo de nuevo.'
              });
              return of(null);
            }),
            finalize(() => {
            })
        )
        .subscribe(data => {
          if (data !== null) {
            this.empleadoDialog = false;

            this.empleadosResponse = data
            this.messageService.add({
              severity: 'success',
              summary: 'Creación',
              detail: 'Registro creado exitosamente.!'
            });
          }
        });
  }

  functionEmpleadoRequest(){
    const empleadoRequest1: EmpleadoRequest = {
      idEmpleado: this.empleadoFormGroup.get('idEmpleado').value,
      nombres: this.empleadoFormGroup.get('nombres').value,
      apellidos: this.empleadoFormGroup.get('apellidos').value,
      dpi: this.empleadoFormGroup.get('dpi').value,
      telefono: this.empleadoFormGroup.get('telefono').value,
      direccion: this.empleadoFormGroup.get('direccion').value,
      genero: this.empleadoFormGroup.get('genero').value,
      correo: this.empleadoFormGroup.get('correo').value,
      nit: this.empleadoFormGroup.get('nit').value,
      nacionalidad: this.empleadoFormGroup.get('nacionalidad').value,
      nivelIngles: this.empleadoFormGroup.get('nivelIngles').value,
      fechaNacimiento: format(new Date(this.empleadoFormGroup.get('fechaNacimiento').value), 'yyyy-MM-dd'),
      fechaIngreso: format(new Date(this.empleadoFormGroup.get('fechaIngreso').value), 'yyy-MM-dd'),
      fechaSalida: format(new Date(this.empleadoFormGroup.get('fechaSalida').value), 'yyyy-MM-dd'),
      estadoCivil: this.empleadoFormGroup.get('estadoCivil').value,
      salario: this.empleadoFormGroup.get('salario').value,
      puesto: this.empleadoFormGroup.get('puesto').value,
      experienciaLaboral: [],
      empleadoReferencia: [],
    };

    empleadoRequest1.experienciaLaboral.push(this.experienciaLaboral);
    empleadoRequest1.empleadoReferencia.push(this.empleadoReferencia1, this.empleadoReferencia2,
        this.empleadoReferencia3);

    return empleadoRequest1;

  }

  modificarEmpleado(){
    if (!this.empleadoFormGroup.valid) {
      this.empleadoFormGroup.markAllAsTouched();
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'El formlario esta vacio' });
      return;
    }

    let empleadoRequest1 = this.functionEmpleadoRequest();

    this.empleadoService.modificarEmpleado(empleadoRequest1)
        .pipe(
            switchMap(() => this.empleadoService.obtenerEmpleados()),
            catchError(() => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Ha ocurrido un error al crear el campo personalizado. Por favor, inténtelo de nuevo.'
              });
              return of(null);
            }),
            finalize(() => {
            })
        )
        .subscribe(data => {
          if (data !== null) {
            this.empleadoDialog = false;

            this.empleadosResponse = data
            this.messageService.add({
              severity: 'success',
              summary: 'Creación',
              detail: 'Registro modificado exitosamente.!'
            });
          }
        });

  }

  editarFormGroup(empleadoResponse: EmpleadoResponse){
    const empleadoFormGroup = new FormGroup({
      idEmpleado: new FormControl(empleadoResponse.idEmpleado),
      nombres: new FormControl(empleadoResponse.nombres),
      apellidos: new FormControl(empleadoResponse.apellidos),
      dpi: new FormControl(empleadoResponse.dpi),
      telefono: new FormControl(empleadoResponse.telefono),
      direccion: new FormControl(empleadoResponse.direccion),
      genero: new FormControl(empleadoResponse.genero),
      correo: new FormControl(empleadoResponse.correo),
      nit: new FormControl(empleadoResponse.nit),
      nacionalidad: new FormControl(empleadoResponse.nacionalidad),
      nivelIngles: new FormControl(empleadoResponse.nivelIngles),
      fechaNacimiento: new FormControl(new Date(empleadoResponse.fechaNacimiento)),
      fechaIngreso: new FormControl(new Date(empleadoResponse.fechaIngreso)),
      fechaSalida: new FormControl(new Date(empleadoResponse.fechaSalida)),
      estadoCivil: new FormControl(empleadoResponse.estadoCivil),
      salario: new FormControl(empleadoResponse.salario),
      puesto: new FormControl(empleadoResponse.puesto.idPuesto),
    });
    empleadoResponse.empleadoReferencia.forEach((referencia, index) => {
      this[`empleadoReferencia${index + 1}`].idEmpleadoReferencia = referencia.idEmpleadoReferencia;
      this[`empleadoReferencia${index + 1}`].nombres = referencia.nombres;
      this[`empleadoReferencia${index + 1}`].apellidos = referencia.apellidos;
      this[`empleadoReferencia${index + 1}`].telefono = referencia.telefono;
      this[`empleadoReferencia${index + 1}`].descripcion = referencia.descripcion;
    });
    if (empleadoResponse.experienciaLaboral.length > 0) {
      this.experienciaLaboral.idExperienciaLaboral = empleadoResponse.experienciaLaboral[0].idExperienciaLaboral
      this.experienciaLaboral.nombreEmpresa = empleadoResponse.experienciaLaboral[0].nombreEmpresa;
      this.experienciaLaboral.puesto = empleadoResponse.experienciaLaboral[0].puesto;
      this.experienciaLaboral.telefono = empleadoResponse.experienciaLaboral[0].telefono;
      this.experienciaLaboral.antiguedad = empleadoResponse.experienciaLaboral[0].antiguedad
    }

    return empleadoFormGroup;

  }

}
