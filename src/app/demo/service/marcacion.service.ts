import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MarcacionRequest} from "../api/marcacionRequest";
import {AsistenciaResponse} from "../api/asistenciaResponse";

@Injectable({
  providedIn: 'root'
})
export class MarcacionService {

  private url: string = `${environment.HOST}/rhis/marcaciones`;

  constructor(private http: HttpClient) { }

  generarMarcacion(empleado: MarcacionRequest){
    return this.http.post(this.url, empleado);
  }

  listarMarcaciones(idEmpleado?: string){
    let params = new HttpParams();
    params = params.set("idEmpleado", idEmpleado);

    const url : string = `${environment.HOST}/rhis/marcaciones`;
    return this.http.get<AsistenciaResponse[]>(url)

  }
}
