import {Component, OnInit} from '@angular/core';
import {Table} from "primeng/table";
import {Product} from "../../../api/product";
import {ProductService} from "../../../service/product.service";
import {MessageService} from "primeng/api";
import {PuestoService} from "../../../service/puesto.service";
import {PuestoRequest} from "../../../api/puestoRequest";
import {DivisionService} from "../../../service/division.service";
import {DivisionResponse} from "../../../api/divisionResponse";
import {PuestoResponse} from "../../../api/puestoResponse";
import {catchError, finalize, of, switchMap} from "rxjs";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-puesto',
    providers: [MessageService],
    templateUrl: './puesto.component.html',
    styleUrl: './puesto.component.scss'
})
export class PuestoComponent implements OnInit {

    puestoDialog: boolean = false;
    products: Product[] = [];
    puestosResponse: PuestoResponse[] = [];
    puestoRequest: PuestoRequest = new PuestoRequest();
    puesto: PuestoResponse = new PuestoResponse();
    product: Product = {};
    divisionesResponse: DivisionResponse [] = [];
    isEdit: boolean = false;
    selectPuesto: PuestoRequest [] = [];
    submitted: boolean = false;
    statuses: any[] = [];
    puestoFormGroup: FormGroup;
    loading: boolean = false

    constructor(private productService: ProductService,
                private messageService: MessageService,
                private puestoService: PuestoService,
                private divisionService: DivisionService) {
    }


    ngOnInit() {
        this.puestoInitFromGroup()
        this.productService.getProducts().then(data => this.products = data);
        this.puestoService.obtenerPuestos().subscribe(data => this.puestosResponse = data);
        this.divisionService.obtenerDivisiones().subscribe(data => this.divisionesResponse = data);
    }

    puestoInitFromGroup() {
        this.puestoFormGroup = this.createFormGroupVacations({
            idPuesto: null,
            nombre: null,
            salarioMaximo: null,
            salarioMinimo: null,
            idDivision: null,
        })
    }

    // Validador personalizado para comprobar que el salario máximo es igual o mayor que el salario mínimo


    createFormGroupVacations(initialValues: any, isEdit: boolean = false): FormGroup {
        const formGroup = new FormGroup({
            idPuesto: new FormControl(initialValues.idPuesto),
            nombre: new FormControl(initialValues.nombre, Validators.required),
            salarioMaximo: new FormControl(initialValues.salarioMaximo, Validators.required),
            salarioMinimo: new FormControl(initialValues.salarioMinimo, Validators.required),
            idDivision: new FormControl(isEdit ? initialValues.division.idDivision : initialValues.idDivision, Validators.required),
        });

        // Configurar la suscripción para el salarioMinimo
        formGroup.get('salarioMinimo').valueChanges.subscribe(value => {
            if (value) {
                formGroup.get('salarioMaximo').setValidators([
                    Validators.required,
                    this.salarioMaximoValidator(value)
                ]);
                formGroup.get('salarioMaximo').updateValueAndValidity();
            }
        });

        // Inicializar la validación para el caso de edición
        if (isEdit) {
            const salarioMinimoValue = formGroup.get('salarioMinimo').value;
            if (salarioMinimoValue) {
                formGroup.get('salarioMaximo').setValidators([
                    Validators.required,
                    this.salarioMaximoValidator(salarioMinimoValue)
                ]);
                formGroup.get('salarioMaximo').updateValueAndValidity();
            }
        }

        return formGroup;
    }

    openNew() {
        this.puestoFormGroup.reset()
        this.puestoDialog = true;
        this.isEdit = false;
    }

    editPuesto(puestoResponse: PuestoResponse) {
        this.puestoFormGroup = this.createFormGroupVacations(puestoResponse, true);
        this.puestoDialog = true;
        this.isEdit = true;
    }

    hideDialog() {
        this.puestoDialog = false;
        this.submitted = false;
    }

    crearPuesto() {
        if (!this.puestoFormGroup.valid) {
            this.puestoFormGroup.markAllAsTouched();
            return;
        }

        const puestoRequest = this.formGroupToEntity();

        this.puestoService.crearPuesto(puestoRequest)
            .pipe(
                switchMap(() => this.puestoService.obtenerPuestos()),
                catchError(() => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Ha ocurrido un error al crear el puesto. Por favor, inténtelo de nuevo.'
                    });
                    return of(null);
                }),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe(data => {
                if (data !== null) {
                    this.puestosResponse = data;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Creación',
                        detail: 'Registro creado exitosamente.!'
                    });
                    this.puestoDialog = false;
                }
            });
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    editarPuesto() {
        if (!this.puestoFormGroup.valid) {
            this.puestoFormGroup.markAllAsTouched();
            return;
        }
        const puestoRequest = this.formGroupToEntity();

        this.puestoService.actualizarPuesto(puestoRequest)
            .pipe(
                switchMap(() => this.puestoService.obtenerPuestos()),
                catchError(() => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Ha ocurrido un error al actualizar el puesto. Por favor, inténtelo de nuevo.'
                    });
                    return of(null);
                }),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe(data => {
                if (data !== null) {
                    this.puestosResponse = data;
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Modificación',
                        detail: 'Registro actualizado exitosamente.!'
                    });
                    this.puestoDialog = false;
                }
            });
    }

    formGroupToEntity() {
        const puestoRequest: PuestoRequest = {
            idPuesto: this.puestoFormGroup.get('idPuesto').value,
            nombre: this.puestoFormGroup.get('nombre').value,
            salarioMaximo: this.puestoFormGroup.get('salarioMaximo').value,
            salarioMinimo: this.puestoFormGroup.get('salarioMinimo').value,
            idDivision: this.puestoFormGroup.get('idDivision').value,
        };
        return puestoRequest;
    }

    // Validador personalizado para asegurar que salarioMaximo sea mayor o igual que salarioMinimo
    salarioMaximoValidator(salarioMinimo: number) {
        return (control: AbstractControl) => {
            const salarioMaximo = control.value;
            return salarioMaximo && salarioMaximo < salarioMinimo ? {salarioMaximoMenorQueMinimo: true} : null;
        };
    }

}
