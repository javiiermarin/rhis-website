import {Component, OnInit} from '@angular/core';
import {Table} from "primeng/table";
import {Product} from "../../../api/product";
import {ProductService} from "../../../service/product.service";
import {MessageService} from "primeng/api";
import {PuestoService} from "../../../service/puesto.service";
import {PuestoRequest} from "../../../api/puestoRequest";
import {DivisionService} from "../../../service/division.service";
import {DivisionResponse} from "../../../api/divisionResponse";
import {DivisionRequest} from "../../../api/divisionRequest";
import {PuestoResponse} from "../../../api/puestoResponse";
import {switchMap} from "rxjs";

@Component({
    selector: 'app-puesto',
    providers: [MessageService],
    templateUrl: './puesto.component.html',
    styleUrl: './puesto.component.scss'
})
export class PuestoComponent implements OnInit{

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    products: Product[] = [];

    puestosResponse: PuestoResponse[] = [];

    puestoRequest: PuestoRequest = new PuestoRequest();

    puesto: PuestoResponse = new PuestoResponse();

    product: Product = {};

    divisionesResponse: DivisionResponse [] = [];

    selectedDivision: DivisionRequest;

    isEdit: boolean = false;

    selectPuesto: PuestoRequest [] = [];

    submitted: boolean = false;

    statuses: any[] = [];

    constructor(private productService: ProductService,
                private messageService : MessageService,
                private puestoService: PuestoService,
                private divisionService: DivisionService) { }


    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);
        this.puestoService.obtenerPuestos().subscribe(data => this.puestosResponse=data);
        this.divisionService.obtenerDivisiones().subscribe(data => this.divisionesResponse=data);


    }

    openNew() {
        this.puestoRequest = new PuestoRequest();
        this.productDialog = true;
        this.isEdit =  false;
        this.puesto = new PuestoResponse();
    }

    editPuesto(puestoResponse: PuestoResponse) {
        this.puesto = { ...puestoResponse };
        this.productDialog = true;
        this.isEdit = true;
    }

    deletePuesto(puestoResponse: PuestoResponse) {
        this.deleteProductDialog = true;
        this.puesto = { ...puestoResponse };
    }

    confirmDelete() {
        this.puestoService.eliminarPuesto(this.puesto.idPuesto).pipe(switchMap (() => {
            return this.puestoService.obtenerPuestos();
        })).subscribe(data => this.puestosResponse=data)
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.deleteProductDialog = false;
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    crearPuesto() {
        this.puestoRequest.division = this.selectedDivision.idDivision;
        this.puestoRequest.nombre = this.puesto.nombre;
        this.puestoRequest.salarioMaximo = this.puesto.salarioMaximo;
        this.puestoRequest.salarioMinimo = this.puesto.salarioMinimo;

        this.puestoService.crearPuesto(this.puestoRequest).pipe(switchMap(() => {
            return this.puestoService.obtenerPuestos();
        })).subscribe(data => this.puestosResponse = data);

        this.productDialog = false;
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    editarPuesto(){

        let puestoRequest = new PuestoRequest();

        puestoRequest.idPuesto = this.puesto.idPuesto;
        puestoRequest.nombre = this.puesto.nombre;
        puestoRequest.division = this.selectedDivision.idDivision;
        puestoRequest.salarioMaximo = this.puesto.salarioMaximo;
        puestoRequest.salarioMinimo = this.puesto.salarioMinimo;

        this.puestoService.actualizarPuesto(puestoRequest).pipe(switchMap (() => {
            return this.puestoService.obtenerPuestos();
        })).subscribe(data => this.puestosResponse = data);

        this.productDialog = false;

    }

}
