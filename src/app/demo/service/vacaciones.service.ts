import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {VacacionesResponse} from "../api/vacacionesResponse";
import {VacacionesRequest} from "../api/vacacionesRequest";

@Injectable({
  providedIn: 'root'
})
export class VacacionesService {

  private url: string = `${environment.HOST}/rhis/vacaciones`



  constructor(private http: HttpClient) { }

  obtenerVacaiones() {
    const url = `${environment.HOST}/rhis/vacaciones`
    return this.http.get<VacacionesResponse[]>(url);
  }

  registrarVacaciones(vacacionesRequest: VacacionesRequest){
    return this.http.post(this.url, vacacionesRequest);
  }

  modificarVacaciones(vacacionesRequest: VacacionesRequest){
    return this.http.put(this.url, vacacionesRequest);
  }
}
