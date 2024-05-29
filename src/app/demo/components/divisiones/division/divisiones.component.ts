import {Component, OnInit} from '@angular/core';
import {Product} from "../../../api/product";
import {MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {DivisionService} from "../../../service/division.service";
import {DivisionRequest} from "../../../api/divisionRequest";
import {switchMap} from "rxjs";
import {DivisionResponse} from "../../../api/divisionResponse";
import {EmpleadoService} from "../../../service/empleado.service";
import {EmpleadoResponse} from "../../../api/empleadoResponse";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";

@Component({
  selector: 'app-divisiones',
  providers: [MessageService],
  templateUrl: './divisiones.component.html',
  styleUrl: './divisiones.component.scss'
})
export class DivisionesComponent implements OnInit{

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  empleados: EmpleadoResponse [] = [];

  selectedEmpleado: EmpleadoResponse = new EmpleadoResponse();

  divisionResponse:  DivisionResponse [] = [];

  product: Product = {};
  
  isEdit: boolean = false;

  division: DivisionResponse = new DivisionResponse();

  divisionRequest: DivisionRequest = new DivisionRequest();

  selectedDivision: [] = [];

  filteredCountries: EmpleadoResponse [] | undefined;

  submitted: boolean = false;

  statuses: any[] = [];

  constructor(
              private messageService: MessageService,
              private divisionService: DivisionService,
              private empleadoService: EmpleadoService) { }

  ngOnInit() {
    this.divisionService.obtenerDivisiones().subscribe(data => {
      this.divisionResponse=data
    });
    this.empleadoService.obtenerEmpleados().subscribe(data => {
      this.empleados = data;
    })

  }

  openNew() {
    this.divisionRequest = new DivisionRequest();
    this.productDialog = true;
    this.isEdit=false;
    this.division = new DivisionResponse();
  }


  editDivision(divisionResponse: DivisionResponse)
  {
    this.division = { ...divisionResponse };
    this.productDialog = true;
    this.isEdit = true;
  }

  editarDivision(){

    let divisionRequest = new DivisionRequest();

    divisionRequest.encargado = this.selectedEmpleado.idEmpleado;
    divisionRequest.idDivision = this.division.idDivision;
    divisionRequest.nombre = this.division.nombre;
    divisionRequest.isEnabled = this.division.isEnabled;

    this.divisionService.actualizarDivision(divisionRequest).pipe(switchMap(() => {
      return this.divisionService.obtenerDivisiones()
    })).subscribe(data => this.divisionResponse=data);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });

    this.divisionResponse = [...this.divisionResponse];
    this.productDialog = false;
    this.divisionRequest = new DivisionRequest();
  }

  deleteDivision(divisionResponse: DivisionResponse) {
    this.deleteProductDialog = true;
    this.division = { ...divisionResponse };
  }

  confirmDelete() {
    this.divisionService.eliminarDivision(this.division.idDivision).pipe(switchMap (() => {
      return this.divisionService.obtenerDivisiones();
    })).subscribe(data => this.divisionResponse=data)
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    this.deleteProductDialog = false;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveDivision() {
        this.divisionRequest.encargado = this.selectedEmpleado.idEmpleado;
        this.divisionRequest.nombre = this.division.nombre;
        this.divisionRequest.isEnabled = this.division.isEnabled;
    
        this.divisionService.crearDivision(this.divisionRequest).pipe(switchMap(() => {
          return this.divisionService.obtenerDivisiones()
        })).subscribe(data => this.divisionResponse=data);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Dividion Creada', life: 3000 });

        this.divisionResponse = [...this.divisionResponse];
        this.productDialog = false;
        this.divisionRequest = new DivisionRequest();

    }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }




  }





