import {Component, OnInit} from '@angular/core';
import {Product} from "../../../api/product";
import {MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {DivisionService} from "../../../service/division.service";
import {DivisionRequest} from "../../../api/divisionRequest";
import {catchError, finalize, forkJoin, of, switchMap} from "rxjs";
import {DivisionResponse} from "../../../api/divisionResponse";
import {EmpleadoService} from "../../../service/empleado.service";
import {EmpleadoResponse} from "../../../api/empleadoResponse";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-divisiones',
    providers: [MessageService],
    templateUrl: './divisiones.component.html',
    styleUrl: './divisiones.component.scss'
})
export class DivisionesComponent implements OnInit {

    divisionDialog: boolean = false;
    deleteProductDialog: boolean = false;
    empleados: EmpleadoResponse [] = [];
    selectedEmpleado: EmpleadoResponse = new EmpleadoResponse();
    divisionResponse: DivisionResponse [] = [];
    product: Product = {};
    isEdit: boolean = false;
    division: DivisionResponse = new DivisionResponse();
    divisionRequest: DivisionRequest = new DivisionRequest();
    selectedDivision: [] = [];
    filteredCountries: EmpleadoResponse [] | undefined;
    submitted: boolean = false;
    statuses: any[] = [];
    divisionFormGroup: FormGroup;
    loading: boolean = false;

    constructor(
        private messageService: MessageService,
        private divisionService: DivisionService,
        private empleadoService: EmpleadoService) {
    }

    ngOnInit() {
        this.divisionFormGroupInit();
        this.getAllDivisiones()
        this.empleadoService.obtenerEmpleados().subscribe(data => {
            this.empleados = data.map(em => ({
                ...em,
                fullName: em.nombres + ' ' + em.apellidos
            }));
        });
    }

    getAllDivisiones() {
        this.divisionService.obtenerDivisiones().pipe(
            switchMap((data: DivisionResponse[]) => {
                this.divisionResponse = data;

                // Crear un array de observables para obtener los nombres de los encargados
                const empleadoObservables = data.map(division => {
                    if (division.encargado) {
                        // Si el encargado no es nulo, realizar la petición para obtener el nombre del encargado
                        return this.empleadoService.getOne(division.encargado).pipe(
                            map(empleado => ({
                                ...division,
                                nombreEncargado: empleado.nombres + ' ' + empleado.apellidos // Aquí concatenamos el nombre completo del encargado
                            }))
                        );
                    } else {
                        // Si el encargado es nulo, devolver directamente la división con nombreEncargado vacío
                        return of({
                            ...division,
                            nombreEncargado: '' // O algún valor predeterminado si prefieres
                        });
                    }
                });

                // Utilizar forkJoin para esperar a que todas las peticiones de empleado se completen
                return forkJoin(empleadoObservables);
            })
        ).subscribe((divisionesConNombres) => {
            this.divisionResponse = divisionesConNombres;
        });
    }

    divisionFormGroupInit() {
        this.divisionFormGroup = this.createFormGroupVacations({
            idDivision: null,
            nombre: null,
            encargado: null,
            enabled: true
        })
    }

    createFormGroupVacations(initialValues: any) {
        return new FormGroup({
            idDivision: new FormControl(initialValues.idDivision),
            nombre: new FormControl(initialValues.nombre, Validators.required),
            encargado: new FormControl(initialValues.encargado, Validators.required),
            enabled: new FormControl(initialValues.enabled),
        });
    }

    openNew() {
        this.divisionFormGroup.reset()
        this.divisionFormGroup.get('enabled').setValue(true);
        this.divisionDialog = true;
        this.isEdit = false;
    }


    editDivision(divisionResponse: DivisionResponse) {
        this.divisionFormGroup = this.createFormGroupVacations(divisionResponse)
        this.divisionDialog = true;
        this.isEdit = true;
    }

    editarDivision() {
        const divisionRequest = this.formGroupToEntity()
        this.divisionService.actualizarDivision(divisionRequest)
            .pipe(
                switchMap(() => this.divisionService.obtenerDivisiones()),
                switchMap((data: DivisionResponse[]) => {
                    this.divisionResponse = data;
                    // Crear un array de observables para obtener los nombres de los encargados
                    const empleadoObservables = data.map(division => {
                        if (division.encargado) {
                            // Si el encargado no es nulo, realizar la petición para obtener el nombre del encargado
                            return this.empleadoService.getOne(division.encargado).pipe(
                                map(empleado => ({
                                    ...division,
                                    nombreEncargado: empleado.nombres + ' ' + empleado.apellidos
                                }))
                            );
                        } else {
                            // Si el encargado es nulo, devolver directamente la división con nombreEncargado vacío
                            return of({
                                ...division,
                                nombreEncargado: '' // O algún valor predeterminado si prefieres
                            });
                        }
                    });
                    // Utilizar forkJoin para esperar a que todas las peticiones de empleado se completen
                    return forkJoin(empleadoObservables);
                }),
                catchError(() => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Ha ocurrido un error al actualizar la división. Por favor, inténtelo de nuevo.'
                    });
                    return of([]);
                }),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((divisionesConNombres) => {
                this.divisionResponse = divisionesConNombres;
                if (divisionesConNombres.length > 0) {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Actualización',
                        detail: 'Registro actualizado exitosamente!'
                    });
                    this.divisionDialog = false;
                }
            });

    }

    hideDialog() {
        this.divisionDialog = false;
        this.submitted = false;
    }

    saveDivision() {
        if (!this.divisionFormGroup.valid) {
            this.divisionFormGroup.markAllAsTouched()
            return;
        }
        const divisionRequest = this.formGroupToEntity()

        this.divisionService.crearDivision(divisionRequest)
            .pipe(
                switchMap(() => this.divisionService.obtenerDivisiones()),
                switchMap((data: DivisionResponse[]) => {
                    this.divisionResponse = data;
                    // Crear un array de observables para obtener los nombres de los encargados
                    const empleadoObservables = data.map(division => {
                        if (division.encargado) {
                            // Si el encargado no es nulo, realizar la petición para obtener el nombre del encargado
                            return this.empleadoService.getOne(division.encargado).pipe(
                                map(empleado => ({
                                    ...division,
                                    nombreEncargado: empleado.nombres + ' ' + empleado.apellidos
                                }))
                            );
                        } else {
                            // Si el encargado es nulo, devolver directamente la división con nombreEncargado vacío
                            return of({
                                ...division,
                                nombreEncargado: '' // O algún valor predeterminado si prefieres
                            });
                        }
                    });
                    // Utilizar forkJoin para esperar a que todas las peticiones de empleado se completen
                    return forkJoin(empleadoObservables);
                }),
                catchError(() => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Ha ocurrido un error al crear la división. Por favor, inténtelo de nuevo.'
                    });
                    return of([]);
                }),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((divisionesConNombres) => {
                this.divisionResponse = divisionesConNombres;
                if (divisionesConNombres.length > 0) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Creación',
                        detail: 'Registro creado exitosamente.!'
                    });
                    this.divisionDialog = false;
                }
            });
    }

    formGroupToEntity() {
        const divisionRequest: DivisionRequest = {
            idDivision: this.divisionFormGroup.get('idDivision').value,
            nombre: this.divisionFormGroup.get('nombre').value,
            enabled: this.divisionFormGroup.get('enabled').value,
            encargado: this.divisionFormGroup.get('encargado').value,
        };
        return divisionRequest;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


}





