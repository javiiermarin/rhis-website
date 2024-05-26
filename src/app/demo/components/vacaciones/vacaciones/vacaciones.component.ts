import {Component, OnInit} from '@angular/core';
import {VacacionesService} from "../../../service/vacaciones.service";
import {VacacionesRequest} from "../../../api/vacacionesRequest";
import {VacacionesResponse} from "../../../api/vacacionesResponse";
import {switchMap} from "rxjs";
import {VacacionesTrackingResponse} from "../../../api/vacacionesTrackingResponse";
import {format} from "date-fns";

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrl: './vacaciones.component.scss'
})
export class VacacionesComponent implements OnInit{

  idDivision: string= 'ee25a61b-67c9-449b-9ff6-879e38bdc919';

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
    this.vacacionesService.obtenerVacaiones(this.idDivision).subscribe(data =>
    this.listVacaciones = data);
  }

  openNew(){
    this.vacacionesDialog = true
  }

  solicitudVacaciones(){

    this.vacaciones.empleado = '70349ae4-32e5-4a3c-af66-82832911b466';
    this.fechaInicio= format(new Date(this.vacaciones.fechaInicio), 'yyyy-MM-dd');
    this.fechaFinal= format(new Date(this.vacaciones.fechaFinal), 'yyyy-MM-dd');

    this.vacaciones.fechaInicio= this.fechaInicio;
    this.vacaciones.fechaFinal= this.fechaFinal;

    this.vacacionesService.registrarVacaciones(this.vacaciones).pipe(switchMap(() => {
      return this.vacacionesService.obtenerVacaiones('b5691c3c-ecce-47af-8e9c-dd7a946bdbdc');
    })).subscribe(data => this.listVacaciones = data);

  }

  oculatarDialog(){
    this.vacacionesDialog = false;

  }

  verEstado(vacaciones: VacacionesResponse) {
    this.estadoDialog = true;
    this.estados = vacaciones.vacacionesTracking
  }

}
