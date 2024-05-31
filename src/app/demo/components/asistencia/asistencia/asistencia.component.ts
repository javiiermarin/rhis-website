import {Component, OnInit} from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {AsistenciaResponse} from "../../../api/asistenciaResponse";
import {MarcacionService} from "../../../service/marcacion.service";
import {ButtonModule} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {RippleModule} from "primeng/ripple";
import {TabViewModule} from "primeng/tabview";
import {DatePipe} from "@angular/common";
import {MarcacionRandomService} from "../../../service/marcacion-random.service";
import {MarcacionesRandomResponse} from "../../../api/marcacionesRandomResponse";
import {HorasExtrasResponse} from "../../../api/horasExtrasResponse";
import {HorasExtrasService} from "../../../service/horas-extras.service";

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [
    ToolbarModule,
    SharedModule,
    TableModule,
    ButtonModule,
    ChipsModule,
    RippleModule,
    TabViewModule,
    DatePipe
  ],
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.scss'
})
export class AsistenciaComponent  implements OnInit{

  activeIndex: number = 0;

  lstAsistenciasResponse: AsistenciaResponse[] = [];
  lstMarcacionesRandom: MarcacionesRandomResponse[]= [];
  lstHorasExtras: HorasExtrasResponse[]= [];
  idEmpleado: string;

  constructor(private asistenciaService: MarcacionService,
              private marcacionesRandomService: MarcacionRandomService,
              private horasExtrasService: HorasExtrasService) {
  }

  ngOnInit() {
    this.asistenciaService.listarMarcaciones().subscribe(data => this.lstAsistenciasResponse = data);
    this.marcacionesRandomService.listarMarcacionesRandom().subscribe(data => this.lstMarcacionesRandom = data);
    this.horasExtrasService.obtenerHorasExtras().subscribe(data => this.lstHorasExtras = data);
  }


  mostrar(){
  }


}
