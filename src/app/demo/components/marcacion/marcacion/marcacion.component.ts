import {Component, OnInit} from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {MarcacionRequest} from "../../../api/marcacionRequest";
import {MarcacionService} from "../../../service/marcacion.service";
import {RippleModule} from "primeng/ripple";

@Component({
  selector: 'app-marcacion',
  standalone: true,
  imports: [
    ToolbarModule,
    FormsModule,
    ButtonModule,
    ChipsModule,
    RippleModule
  ],
  templateUrl: './marcacion.component.html',
  styleUrl: './marcacion.component.scss'
})
export class MarcacionComponent implements OnInit{

  idEmpleado: string;
  empleado: MarcacionRequest = new MarcacionRequest();

  lstMarcacion: MarcacionRequest [] = [];

  constructor(private marcacionService: MarcacionService) {
  }

  ngOnInit() {

  }

  generarMarcacion(){
    this.empleado.empleado = this.idEmpleado;
    this.marcacionService.generarMarcacion(this.empleado).subscribe(data => console.log(data))
  }
}
