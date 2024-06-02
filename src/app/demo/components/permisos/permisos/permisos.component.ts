import {Component, OnInit} from '@angular/core';
import {TipoPermisoService} from "../../../service/tipo-permiso.service";
import {TipoPermiso} from "../../../api/tipoPermiso";
import {PermisoRequest} from "../../../api/permisoRequest";
import {PermisoResponse} from "../../../api/permisoResponse";
import {PermisoService} from "../../../service/permiso.service";
import {PermisoTrackingResponse} from "../../../api/permisoTrackingResponse";
import {format} from "date-fns";
import {catchError, finalize, of, switchMap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.scss'
})
export class PermisosComponent implements OnInit{

  estados: PermisoTrackingResponse [] = [];

  fechaInicio: string;
  fechaFinal: string;
  fechaMinima: Date = new Date();
  fechaFinalMinima: Date = new Date();

  permisoRequest: PermisoRequest = new PermisoRequest();
  permiso: PermisoResponse = new PermisoResponse();

  permisosDialog: boolean = false;
  estadoDialog: boolean = false;

  lstTipoPermisos: TipoPermiso[] = [];
  lstPermisoResponse: PermisoResponse[] = [];
  //selectedTipoPermiso: TipoPermiso;
  idEmpleado: string = 'd177557c-0dfc-46e6-a877-f7c0e6b7cda2';

  permisosFormGroup: FormGroup;
  loading: boolean = false;


  constructor(private tipoPermisoService: TipoPermisoService,
              private permisoService: PermisoService,
              private messageService: MessageService,) {}


  ngOnInit() {
    this.formGroupPermisosInit();

    this.tipoPermisoService.obtenerTipoPermisos().subscribe(data =>
        this.lstTipoPermisos = data);

    this.permisoService.obtenerPermisos(this.idEmpleado).subscribe(data =>
        this.lstPermisoResponse =data)
  }

  formGroupPermisosInit(){
    this.permisosFormGroup = this.createFormsPermisos({
          tipoPermiso: null,
          fechaInicio: null,
          fechaFinal: null,
          descripcion: null,
        })

        this.permisosFormGroup.get('fechaInicio').valueChanges.subscribe(value => {
          if (value) {
            this.permisosFormGroup.get('fechaFinal').setValidators([
                this.minDateValidator(value)
            ]);
            this.permisosFormGroup.get('fechaFinal').updateValueAndValidity();
          }
        });
  }

  createFormsPermisos(initialValues: any){
    return new FormGroup({
      tipoPermiso: new FormControl(initialValues.tipoPermiso, Validators.required),
      fechaInicio: new FormControl(initialValues.fechaInicio, Validators.required),
      fechaFinal: new FormControl(initialValues.fechaFinal, Validators.required),
      descripcion: new FormControl(initialValues.descripcion),
    });
  }


  abrirDialog(){
    this.permiso = new PermisoResponse();
    this.permisoRequest = new PermisoRequest();
    this.permisosDialog = true;
  }

  crearSolicitudPermisos() {
    if (!this.permisosFormGroup.valid) {
      this.permisosFormGroup.markAllAsTouched()
      return;
    }

    let permisosRequest = this.formGroupToEntity();
    this.permisoService.registrarPermiso(permisosRequest)
        .pipe(
            switchMap(() => this.permisoService.obtenerPermisos('')),
            catchError( () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Ha ocurrido un error al generar el permiso. Por favor, intentelo de nuevo.'
              });
              return of(null);
            }),
            finalize(() => {
              this.loading = false;
            })
        )
        .subscribe(data => {
          if (data !== null){
            this.lstPermisoResponse = data;
            this.messageService.add({
              severity: 'success',
              summary: 'Creacion',
              detail: 'Registro creado exitosamente.!'
            });
            this.permisosDialog = false;
          }
        });
  }

    formGroupToEntity(){
      const permisosRequest: PermisoRequest = {
        tipoPermiso: this.permisosFormGroup.get('tipoPermiso').value,
        fechaInicio: format(new Date(this.permisosFormGroup.get('fechaInicio').value), 'yyyy-MM-dd'),
        fechaFinal: format(new Date(this.permisosFormGroup.get('fechaFinal').value), 'yyyy-MM-dd'),
        descripcion: this.permisosFormGroup.get('descripcion').value,
        empleado: null
      };

      return permisosRequest;
    }

  ocultarDialog(){
    this.permisosDialog=false
  }

  /*
  solicitarPermiso(){
    this.permisoRequest.empleado = 'd177557c-0dfc-46e6-a877-f7c0e6b7cda2';
    this.fechaInicio = format(new Date(this.permisoRequest.fechaInicio), 'yyyy-MM-dd');
    this.fechaFinal = format(new Date(this.permisoRequest.fechaFinal), 'yyyy-MM-dd');

    this.permisoRequest.fechaInicio = this.fechaInicio;
    this.permisoRequest.fechaFinal = this.fechaFinal;
    this.permisoRequest.tipoPermiso = this.selectedTipoPermiso.idTipoPermiso;


    this.permisoService.registrarPermiso(this.permisoRequest).pipe(switchMap(() => {
      return this.permisoService.obtenerPermisos('0fe63b56-a867-456b-8518-643046f43bac');
    })).subscribe(data => this.lstPermisoResponse = data);

    this.permisosDialog = false;
  }

   */

  verEstado(permisos: PermisoResponse){
    this.estadoDialog = true;
    this.estados = permisos.permisoTracking;
  }

  //Validador personalizado para establecer la fecha minima
  minDateValidator(startDate: Date){
    return (control) => {
      const endDate = control.value;
      return endDate && endDate < startDate ? {minDate: true} : null;
    };
  }
}
