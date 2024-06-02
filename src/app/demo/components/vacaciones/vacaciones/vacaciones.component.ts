import {Component, OnInit} from '@angular/core';
import {VacacionesService} from "../../../service/vacaciones.service";
import {VacacionesRequest} from "../../../api/vacacionesRequest";
import {VacacionesResponse} from "../../../api/vacacionesResponse";
import {catchError, finalize, of, switchMap} from "rxjs";
import {VacacionesTrackingResponse} from "../../../api/vacacionesTrackingResponse";
import {format} from "date-fns";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {KeycloakService} from "keycloak-angular";
import {VacacionesTrackingRequest} from "../../../api/vacacionesTrackingRequest";
import {EmpleadoResponse} from "../../../api/empleadoResponse";
import {EmpleadoService} from "../../../service/empleado.service";

@Component({
    selector: 'app-vacaciones',
    templateUrl: './vacaciones.component.html',
    styleUrl: './vacaciones.component.scss'
})
export class VacacionesComponent implements OnInit {

    estados: VacacionesTrackingResponse [] = [];
    fechaMinima: Date = new Date();
    fechaFinalMinima: Date = new Date();
    fechaInicio: string;
    fechaFinal: string;
    vacacionesDialog: boolean = false;
    dialogAuthorizeVacations: boolean = false;
    estadoDialog: boolean = false;
    estadoToAuthorizeDialog: boolean = false;
    vacaciones: VacacionesRequest = new VacacionesRequest();
    vacacionesResponse: VacacionesResponse[] = [];
    vacacionesToAuthorize: VacacionesResponse[] = [];
    vacationsFormGroup: FormGroup;
    loading: boolean = false;
    idUserLogged: string | undefined;
    vacacionesTracking: VacacionesTrackingRequest[] = []
    empleadoLogueado: EmpleadoResponse = new EmpleadoResponse();


    constructor(private vacacionesService: VacacionesService,
                private messageService: MessageService,
                private keycloakService: KeycloakService,
                private empleadoService: EmpleadoService) {
    }

    ngOnInit() {
        if (this.keycloakService.isLoggedIn()) {
            this.keycloakService.loadUserProfile().then(profile => {
                this.idUserLogged = profile.id;
                this.empleadoService.getOne(profile.id).subscribe(data => {
                    this.empleadoLogueado = data;
                })

                // Obtener vacaciones y filtrar por el usuario logueado en VacacionesTracking
                this.vacacionesService.obtenerVacaiones().subscribe(data => {
                    // Filtrar vacaciones autorizadas
                    this.vacacionesToAuthorize = data.filter(vacaciones => vacaciones.vacacionesTracking.some(tracking => tracking.empleado.idEmpleado === this.idUserLogged));
                    // Filtrar todas las vacaciones del usuario logueado
                    this.vacacionesResponse = data.filter(vacaciones => vacaciones.empleado.idEmpleado === this.idUserLogged);
                });
            }).catch(error => {
                console.error('Failed to load user profile', error);
            });
        } else {
            console.error('User not logged in');
        }
        this.formGroupVacationsInit();

    }

    formGroupVacationsInit() {
        this.vacationsFormGroup = this.createFormGroupVacations({
            fechaInicio: null,
            fechaFinal: null,
            descripcion: null,
        })

        this.vacationsFormGroup.get('fechaInicio').valueChanges.subscribe(value => {
            if (value) {
                this.vacationsFormGroup.get('fechaFinal').setValidators([
                    this.minDateValidator(value)
                ]);
                this.vacationsFormGroup.get('fechaFinal').updateValueAndValidity();
            }
        });
    }

    createFormGroupVacations(initialValues: any) {
        return new FormGroup({
            fechaInicio: new FormControl(initialValues.fechaInicio, Validators.required),
            fechaFinal: new FormControl(initialValues.fechaFinal, Validators.required),
            descripcion: new FormControl(initialValues.descripcion),
        });
    }

    openNew() {
        this.vacationsFormGroup.reset()
        this.vacaciones = new VacacionesRequest()
        this.vacacionesDialog = true
    }

    authorizeVacations() {
        this.dialogAuthorizeVacations = true;
    }

    crearSolicitudVacaciones() {
        if (!this.vacationsFormGroup.valid) {
            this.vacationsFormGroup.markAllAsTouched()
            return;
        }

        let vacacionesRequest = this.formGroupToEntity();
        this.vacacionesService.registrarVacaciones(vacacionesRequest)
            .pipe(
                switchMap(() => this.vacacionesService.obtenerVacaiones()),
                catchError(() => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Ha ocurrido un error al ingresar las vacaciones. Por favor, inténtelo de nuevo.'
                    });
                    return of(null);
                }),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe(data => {
                if (data !== null) {
                    this.vacacionesResponse = data;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Creación',
                        detail: 'Registro creado exitosamente.!'
                    });
                    this.vacacionesDialog = false;
                }
            });

    }

    formGroupToEntity(isEdit: boolean = false) {
        let vacacionesRequest: VacacionesRequest = {
            fechaInicio: format(new Date(this.vacationsFormGroup.get('fechaInicio').value), 'yyyy-MM-dd'),
            fechaFinal: format(new Date(this.vacationsFormGroup.get('fechaFinal').value), 'yyyy-MM-dd'),
            descripcion: this.vacationsFormGroup.get('descripcion').value,
            empleado: null
        };

        if (isEdit){
            vacacionesRequest.vacacionesTracking = this.vacacionesTracking
        }

        return vacacionesRequest;
    }

    oculatarDialog() {
        this.vacacionesDialog = false;
    }

    verEstado(vacaciones: VacacionesResponse) {
        this.estadoDialog = true;
        this.estados = vacaciones.vacacionesTracking
    }

    verEstadoAutorizaciones(vacaciones: VacacionesResponse) {
        this.estadoToAuthorizeDialog = true;
        this.estados = vacaciones.vacacionesTracking

        this.vacaciones.idVacaciones = vacaciones.idVacaciones;
        this.vacaciones.fechaInicio = vacaciones.fechaInicio;
        this.vacaciones.fechaFinal = vacaciones.fechaFinal;
        this.vacaciones.descripcion = vacaciones.descripcion;
        this.vacaciones.empleado = vacaciones.empleado.idEmpleado;
        this.vacaciones.vacacionesTracking = vacaciones.vacacionesTracking.map(tracking => {
            return {
                idVacacionesTracking: tracking.idVacacionesTracking,
                estado: tracking.estado
            } as VacacionesTrackingRequest;
        });
    }

    // Validador personalizado para establecer la fecha mínima
    minDateValidator(startDate: Date) {
        return (control) => {
            const endDate = control.value;
            return endDate && endDate < startDate ? {minDate: true} : null;
        };
    }

    modificarEstado(vacaciones: VacacionesTrackingResponse) {

        this.vacaciones.vacacionesTracking.forEach(tracking => {
            if (tracking.idVacacionesTracking === vacaciones.idVacacionesTracking) {
                tracking.estado = !vacaciones.estado;
            }
        });

        this.vacacionesService.modificarVacaciones(this.vacaciones).pipe(switchMap(() => {
            return this.vacacionesService.obtenerVacaiones();
        })).subscribe(data => this.vacacionesToAuthorize = data.filter(vacaciones => vacaciones.vacacionesTracking.some(tracking => tracking.empleado.idEmpleado === this.idUserLogged)));

        this.messageService.add({
            severity: 'success',
            summary: 'Creación',
            detail: 'Vacaciones autorizadas exitosamente.!'
        });

        this.estadoToAuthorizeDialog = false;
    }

    validateAuthorization(vacacionesTracking: VacacionesTrackingResponse): boolean {
        if(vacacionesTracking.empleado.role === 'user' && vacacionesTracking.empleado.idEmpleado === this.idUserLogged && !vacacionesTracking.estado) {
            return true;
        }

        if (this.estados.every((estado) => estado.estado === true)){
            return false
        }

        return this.empleadoLogueado.role === 'rrhh' && this.estados.some((estado) => estado.estado === true)  && vacacionesTracking.empleado.idEmpleado === this.idUserLogged;
    }


}
