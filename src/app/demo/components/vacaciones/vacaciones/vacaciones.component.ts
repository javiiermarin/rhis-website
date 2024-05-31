import {Component, OnInit} from '@angular/core';
import {VacacionesService} from "../../../service/vacaciones.service";
import {VacacionesRequest} from "../../../api/vacacionesRequest";
import {VacacionesResponse} from "../../../api/vacacionesResponse";
import {catchError, finalize, of, switchMap} from "rxjs";
import {VacacionesTrackingResponse} from "../../../api/vacacionesTrackingResponse";
import {format} from "date-fns";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";

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
    estadoDialog: boolean = false;
    vacaciones: VacacionesRequest = new VacacionesRequest();
    vacacionesResponse: VacacionesResponse[] = [];
    vacationsFormGroup: FormGroup;
    loading: boolean = false;

    constructor(private vacacionesService: VacacionesService,
                private messageService: MessageService,) {
    }

    ngOnInit() {
        this.formGroupVacationsInit();
        this.vacacionesService.obtenerVacaiones().subscribe(data =>
            this.vacacionesResponse = data);
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
                        detail: 'Ha ocurrido un error al crear la división. Por favor, inténtelo de nuevo.'
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

    formGroupToEntity() {
        const vacacionesRequest: VacacionesRequest = {
            fechaInicio: format(new Date(this.vacationsFormGroup.get('fechaInicio').value), 'yyyy-MM-dd'),
            fechaFinal: format(new Date(this.vacationsFormGroup.get('fechaFinal').value), 'yyyy-MM-dd'),
            descripcion: this.vacationsFormGroup.get('descripcion').value,
            empleado: null
        };
        return vacacionesRequest;
    }

    oculatarDialog() {
        this.vacacionesDialog = false;

    }

    verEstado(vacaciones: VacacionesResponse) {
        this.estadoDialog = true;
        this.estados = vacaciones.vacacionesTracking
    }

    // Validador personalizado para establecer la fecha mínima
    minDateValidator(startDate: Date) {
        return (control) => {
            const endDate = control.value;
            return endDate && endDate < startDate ? { minDate: true } : null;
        };
    }

}
