import {Component, OnInit} from '@angular/core';
import {TipoPermisoService} from "../../../service/tipo-permiso.service";
import {TipoPermiso} from "../../../api/tipoPermiso";
import {PermisoRequest} from "../../../api/permisoRequest";
import {PermisoResponse} from "../../../api/permisoResponse";
import {PermisoService} from "../../../service/permiso.service";
import {PermisoTrackingResponse} from "../../../api/permisoTrackingResponse";
import {format} from "date-fns";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.scss'
})
export class PermisosComponent implements OnInit{

  estados: PermisoTrackingResponse [] = [];

  fechaInicio: string;
  fechaFinal: string;

  permisoRequest: PermisoRequest = new PermisoRequest();
  permiso: PermisoResponse = new PermisoResponse();
  permisosDialog: boolean = false;
  lstTipoPermisos: TipoPermiso[] = [];
  lstPermisoResponse: PermisoResponse[] = [];
  selectedTipoPermiso: TipoPermiso;
  idEmpleado: string = '0fe63b56-a867-456b-8518-643046f43bac';

  estadoDialog: boolean = false;

  constructor(private tipoPermisoService: TipoPermisoService,
              private permisoService: PermisoService) {}

  ngOnInit() {
    this.tipoPermisoService.obtenerTipoPermisos().subscribe(data => this.lstTipoPermisos = data),
        this.permisoService.obtenerPermisos(this.idEmpleado).subscribe(data => this.lstPermisoResponse =data)
  }


  abrirDialog(){
    this.permiso = new PermisoResponse();
    this.permisoRequest = new PermisoRequest();
    this.permisosDialog = true;

  }

  ocultarDialog(){
    this.permisosDialog=false

  }

  solicitarPermiso(){

    this.permisoRequest.empleado = 'd177557c-0dfc-46e6-a877-f7c0e6b7cda2';
    this.fechaInicio = format(new Date(this.permisoRequest.fechaInicio), 'yyyy-MM-dd');
    this.fechaFinal = format(new Date(this.permisoRequest.fechaFinal), 'yyyy-MM-dd');

    this.permisoRequest.fechaInicio = this.fechaInicio;
    this.permisoRequest.fechaFinal = this.fechaFinal;
    this.permisoRequest.tipoPermiso = this.selectedTipoPermiso.idTipoPermiso;


    this.permisoService.registrarPermiso(this.permisoRequest).pipe(switchMap(() => {
      return this.permisoService.obtenerPermisos('0fe63b56-a867-456b-8518-643046f43bac');
    })).subscribe(data => this.lstPermisoResponse = data);

    this.permisosDialog = false;

  }

  verEstado(permisos: PermisoResponse){
    this.estadoDialog = true;
    this.estados = permisos.permisoTracking;

  }

}
