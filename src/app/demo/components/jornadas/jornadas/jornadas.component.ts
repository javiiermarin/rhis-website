import {Component, OnInit} from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {JornadaService} from "../../../service/jornada.service";
import {JornadaResponse} from "../../../api/jornadaResponse";
import {CurrencyPipe} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {ChipsModule} from "primeng/chips";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {JornadaRequest} from "../../../api/jornadaRequest";

@Component({
  selector: 'app-jornadas',
  standalone: true,
    imports: [
        ToolbarModule,
        SharedModule,
        TableModule,
        CurrencyPipe,
        ButtonModule,
        RippleModule,
        ConfirmDialogModule,
        DialogModule,
        ChipsModule,
        CalendarModule,
        FormsModule
    ],
  templateUrl: './jornadas.component.html',
  styleUrl: './jornadas.component.scss'
})
export class JornadasComponent  implements OnInit{

  jornadaDialog: boolean = false;

  jornada: JornadaRequest;

  lstJornadasResponse: JornadaResponse [] = [];

  constructor(private jornadaService: JornadaService) {

  }

  ngOnInit(): void {
    this.jornadaService.obtenerJornadas().subscribe(data => this.lstJornadasResponse=data);


  }

  abrirDialog(){
      this.jornadaDialog = true;
  }

  ocultarDialog(){
      this.jornadaDialog = false;
  }

  modificarJornada(jornadaRequest: JornadaRequest){
      this.jornadaDialog = true;
      this.jornada = {...jornadaRequest}
      let jornadaR = new JornadaRequest();

      jornadaR.horaInicio = this.jornada.horaInicio;
      jornadaR.horafin = this.jornada.horafin;
      jornadaR.valor = this.jornada.valor;




  }



}
