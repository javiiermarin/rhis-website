import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PermisoResponse} from "../api/permisoResponse";

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  private url: string = `${environment.HOST}/rhis/permisos`;

  constructor(private http: HttpClient) { }

  obtenerPermisos(idEmpleado: string){
    let params= new HttpParams();
    params = params.set("idEmpleado", idEmpleado);

    const url: string = `${environment.HOST}/rhis/permisos`;
    return this.http.get<PermisoResponse[]>(url, {params: params});
  }
}
