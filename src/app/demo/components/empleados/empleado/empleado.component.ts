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
import {OptionsDto} from "../../../api/OptionsDto";

@Component({
    selector: 'app-empleado',
    providers: [MessageService],
    templateUrl: './empleado.component.html',
    styleUrl: './empleado.component.scss'
})
export class EmpleadoComponent implements OnInit {

    empleadoDialog: boolean = false;
    isEdit: boolean = false;
    empleadosResponse: EmpleadoResponse [] = [];
    lstpuestosResponse: PuestoResponse[] = [];
    roleList: OptionsDto[] = [
        {
            name: "Administración",
            value: "administracion"
        },
        {
            name: "Usuario",
            value: "user"
        },
        {
            name: "Recursos Humanos",
            value: "rrhh"
        },
    ];
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
        this.empleadoService.obtenerEmpleados().subscribe(data => this.empleadosResponse = data);
        this.puestoService.obtenerPuestos().subscribe(data => this.lstpuestosResponse = data);
        this.initFormGroup();
    };

    initFormGroup() {
        this.empleadoFormGroup = this.createFormGroupEmpleado({
            idEmpleado: null,
            nombres: null,
            apellidos: null,
            dpi: null,
            telefono: null,
            direccion: null,
            genero: null,
            correo: null,
            nit: null,
            role: null,
            nacionalidad: null,
            nivelIngles: null,
            fechaNacimiento: null,
            fechaIngreso: null,
            fechaSalida: null,
            estadoCivil: null,
            salario: null,
            puesto: null,
            empleadoReferencia: [],
            experienciaLaboral: []
        })
    }

    createFormGroupEmpleado(initialValues: any, isEdit: boolean = false) {
        const formGroup = new FormGroup({
            idEmpleado: new FormControl(initialValues.idEmpleado),
            nombres: new FormControl(initialValues.nombres, Validators.required),
            apellidos: new FormControl(initialValues.apellidos, Validators.required),
            dpi: new FormControl(initialValues.dpi, Validators.required),
            telefono: new FormControl(initialValues.telefono, Validators.required),
            role: new FormControl(initialValues.role, Validators.required),
            direccion: new FormControl(initialValues.direccion, Validators.required),
            genero: new FormControl(initialValues.genero),
            correo: new FormControl(initialValues.correo, [Validators.required, Validators.email]),
            nit: new FormControl(initialValues.nit),
            nacionalidad: new FormControl(initialValues.nacionalidad),
            nivelIngles: new FormControl(initialValues.nivelIngles),
            fechaNacimiento: new FormControl(initialValues.fechaNacimiento),
            fechaIngreso: new FormControl(initialValues.fechaIngreso),
            fechaSalida: new FormControl(initialValues.fechaSalida),
            estadoCivil: new FormControl(initialValues.estadoCivil),
            salario: new FormControl(initialValues.salario, Validators.required),
            puesto: new FormControl(isEdit ? initialValues.puesto.idPuesto : initialValues.puesto, Validators.required),
        });

        formGroup.get('puesto').valueChanges.subscribe(selectedPuestoId => {
            const selectedPuesto = this.lstpuestosResponse.find(puesto => puesto.idPuesto === selectedPuestoId);

            if (selectedPuesto) {
                const salarioControl = formGroup.get('salario');
                const validators = [Validators.required];

                if (selectedPuesto.salarioMinimo != null) {
                    validators.push(Validators.min(selectedPuesto.salarioMinimo));
                }

                if (selectedPuesto.salarioMaximo != null) {
                    validators.push(Validators.max(selectedPuesto.salarioMaximo));
                }

                salarioControl.setValidators(validators);
                salarioControl.updateValueAndValidity();
            }
        });

        initialValues.empleadoReferencia.forEach((referencia, index) => {
            this[`empleadoReferencia${index + 1}`].idEmpleadoReferencia = referencia.idEmpleadoReferencia;
            this[`empleadoReferencia${index + 1}`].nombres = referencia.nombres;
            this[`empleadoReferencia${index + 1}`].apellidos = referencia.apellidos;
            this[`empleadoReferencia${index + 1}`].telefono = referencia.telefono;
            this[`empleadoReferencia${index + 1}`].descripcion = referencia.descripcion;
        });
        if (initialValues.experienciaLaboral.length > 0) {
            this.experienciaLaboral.idExperienciaLaboral = initialValues.experienciaLaboral[0].idExperienciaLaboral
            this.experienciaLaboral.nombreEmpresa = initialValues.experienciaLaboral[0].nombreEmpresa;
            this.experienciaLaboral.puesto = initialValues.experienciaLaboral[0].puesto;
            this.experienciaLaboral.telefono = initialValues.experienciaLaboral[0].telefono;
            this.experienciaLaboral.antiguedad = initialValues.experienciaLaboral[0].antiguedad
        }

        return formGroup
    }

    openNew() {
        this.empleadoFormGroup.reset()
        this.empleadoDialog = true;
        this.empleadoReferencia1 = new EmpleadoReferencia();
        this.empleadoReferencia2 = new EmpleadoReferencia();
        this.empleadoReferencia3 = new EmpleadoReferencia();
        this.experienciaLaboral = new ExperienciaLaboral();
        this.isEdit = false;
    }

    ocultarDialogo() {
        this.empleadoDialog = false;
    }

    editarEmpleado(empleadoResponse: EmpleadoResponse) {
        this.empleadoReferencia1 = new EmpleadoReferencia()
        this.empleadoReferencia2 = new EmpleadoReferencia()
        this.empleadoReferencia3 = new EmpleadoReferencia()
        this.experienciaLaboral = new ExperienciaLaboral();
        this.empleadoDialog = true;
        this.isEdit = true;
        this.empleadoFormGroup = this.createFormGroupEmpleado(empleadoResponse, true);
    }

    crearEmpleado() {
        if (!this.empleadoFormGroup.valid) {
            this.empleadoFormGroup.markAllAsTouched();
            this.messageService.add({
                severity: 'warn',
                summary: 'Error',
                detail: 'El formulario tiene campos incompletos.'
            });
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

    functionEmpleadoRequest() {
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
            role: this.empleadoFormGroup.get('role').value,
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

    modificarEmpleado() {
        if (!this.empleadoFormGroup.valid) {
            this.empleadoFormGroup.markAllAsTouched();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'El formlario esta vacio'});
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
}
