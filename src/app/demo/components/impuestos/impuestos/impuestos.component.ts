import {Component, OnInit} from '@angular/core';
import {ImpuestosService} from "../../../service/impuestos.service";
import {ImpuestoResponse} from "../../../api/impuestoResponse";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {NgClass, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ImpuestoRequest} from "../../../api/impuestoRequest";
import {switchMap} from "rxjs";
import {PuestoRequest} from "../../../api/puestoRequest";

@Component({
  selector: 'app-impuestos',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    NgIf,
    PaginatorModule,
    RippleModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    NgClass,
    InputTextareaModule
  ],
  templateUrl: './impuestos.component.html',
  styleUrl: './impuestos.component.scss'
})
export class ImpuestosComponent implements OnInit{

  listImpuestosResponse: ImpuestoResponse[] =[];
  impuestoSeleccionado: string;

  impuestoDialogo: boolean = false;
  eliminarImpuestoDialogo: boolean = false;
  isEdit: boolean = false;

  impuesto: ImpuestoResponse;


  constructor(private impuestosService: ImpuestosService) {}

  ngOnInit() {
    this.impuestosService.listarImpuestos().subscribe(data => this.listImpuestosResponse = data);

  }
  abrirDialog(){
    this.impuestoDialogo= true;
    this.isEdit = false;
    this.impuesto = new ImpuestoResponse()
  }

  ocultarDialogo(){
    this.impuestoDialogo = false;
  }

  editar(impuestos: ImpuestoResponse){
    this.impuestoDialogo = true;
    this.isEdit = true;
    this.impuesto = {...impuestos}

  }

  editarImpuestos(){

    let impuestoRequest = new ImpuestoRequest();

    impuestoRequest.idImpuesto = this.impuesto.idImpuesto;
    impuestoRequest.nombre = this.impuesto.nombre;
    impuestoRequest.porcentaje = this.impuesto.porcentaje;
    impuestoRequest.descripcion = this.impuesto.descripcion;

    this.impuestosService.modificarImpuesto(impuestoRequest).pipe(switchMap (() => {
      return this.impuestosService.listarImpuestos();
    })).subscribe(data => this.listImpuestosResponse = data);

    this.impuestoDialogo = false;

  }

  eliminar(impuestos: ImpuestoResponse){
    this.impuesto = {...impuestos};
    this.eliminarImpuestoDialogo = true;

  }

  eliminarImpuesto(){

    this.impuestosService.eliminarImpuesto(this.impuesto.idImpuesto).pipe(
        switchMap(() => {
          return this.impuestosService.listarImpuestos()
        })).subscribe(data => this.listImpuestosResponse = data);

    this.eliminarImpuestoDialogo = false;

  }

  crearImpuestos(){
    this.impuestosService.registrarImpuesto(this.impuesto).pipe(switchMap(() => {
      return this.impuestosService.listarImpuestos()
    })).subscribe(data => this.listImpuestosResponse = data);

    this.impuestoDialogo = false;
  }

}
