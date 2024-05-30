import {Component, OnInit} from '@angular/core';
import {TipoPermisoService} from "../../../service/tipo-permiso.service";
import {TipoPermiso} from "../../../api/tipoPermiso";
import {PermisoRequest} from "../../../api/permisoRequest";
import {PermisoResponse} from "../../../api/permisoResponse";
import {PermisoService} from "../../../service/permiso.service";

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.scss'
})
export class PermisosComponent implements OnInit{


  permisoRequest: PermisoRequest = new PermisoRequest();
  permiso: PermisoResponse = new PermisoResponse();
  permisosDialog: boolean = false;
  lstTipoPermisos: TipoPermiso[] = [];
  lstPermisoResponse: PermisoResponse[] = [];
  selectedTipoPermiso: TipoPermiso;
  idEmpleado: string = '0fe63b56-a867-456b-8518-643046f43bac';

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

}
