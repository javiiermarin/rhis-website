import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TipoPermiso} from "../api/tipoPermiso";

@Injectable({
  providedIn: 'root'
})
export class TipoPermisoService {

  private url: string = `${environment.HOST}/rhis/tipoPermisos`

  constructor(private http: HttpClient) { }

  obtenerTipoPermisos(){
    return this.http.get<TipoPermiso[]>(this.url)
  }

}
