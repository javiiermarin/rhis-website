import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {BadgeModule} from "primeng/badge";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DatePipe, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RippleModule} from "primeng/ripple";
import {ToolbarModule} from "primeng/toolbar";
import {VacacionesTrackingResponse} from "../../../api/vacacionesTrackingResponse";
import {VacacionesRequest} from "../../../api/vacacionesRequest";
import {VacacionesResponse} from "../../../api/vacacionesResponse";
import {VacacionesService} from "../../../service/vacaciones.service";
import {format} from "date-fns";
import {switchMap} from "rxjs";
import {VacacionesTrackingRequest} from "../../../api/vacacionesTrackingRequest";

@Component({
  selector: 'app-vacaciones-tracking',
  standalone: true,
  imports: [
    TableModule,
    BadgeModule,
    ButtonModule,
    CalendarModule,
    DatePipe,
    DialogModule,
    FormsModule,
    InputTextareaModule,
    NgIf,
    RippleModule,
    ToolbarModule
  ],
  templateUrl: './vacaciones-tracking.component.html',
  styleUrl: './vacaciones-tracking.component.scss'
})
export class VacacionesTrackingComponent implements OnInit{

  idDivision: string= 'b5691c3c-ecce-47af-8e9c-dd7a946bdbdc';
  estados: VacacionesTrackingResponse [] = [];
  fechaMinima: Date = new Date();
  fechaInicio: string;
  fechaFinal: string;
  vacacionesDialog: boolean= false;
  estadoDialog: boolean = false;
  vacaciones: VacacionesRequest = new VacacionesRequest();
  listVacaciones : VacacionesResponse[]  = [];

  constructor(private vacacionesService: VacacionesService) {
  }

  ngOnInit() {
    this.vacacionesService.obtenerVacaiones().subscribe(data => {
      this.listVacaciones = data;
    })

  }

  openNew(){
    this.vacacionesDialog = true
  }

  solicitudVacaciones(){

    this.vacaciones.empleado = '0fe63b56-a867-456b-8518-643046f43bac';
    this.fechaInicio= format(new Date(this.vacaciones.fechaInicio), 'yyyy-MM-dd');
    this.fechaFinal= format(new Date(this.vacaciones.fechaFinal), 'yyyy-MM-dd');

    this.vacaciones.fechaInicio= this.fechaInicio;
    this.vacaciones.fechaFinal= this.fechaFinal;

    this.vacacionesService.registrarVacaciones(this.vacaciones).pipe(switchMap(() => {
      return this.vacacionesService.obtenerVacaiones();
    })).subscribe(data => this.listVacaciones = data);

  }

  oculatarDialog(){
    this.vacacionesDialog = false;

  }

  verEstado(vacaciones: VacacionesResponse) {
    this.estadoDialog = true;
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

  modificarEstado(vacaciones: VacacionesTrackingResponse)
  {
    this.vacaciones.vacacionesTracking.forEach(tracking => {
      if (tracking.idVacacionesTracking === vacaciones.idVacacionesTracking) {
        tracking.estado = !vacaciones.estado;
      }
    });

    this.vacacionesService.modificarVacaciones(this.vacaciones).pipe(switchMap(() => {
      return this.vacacionesService.obtenerVacaiones();
    })).subscribe( data => this.listVacaciones = data);

    this.estadoDialog = false;


  }




}
