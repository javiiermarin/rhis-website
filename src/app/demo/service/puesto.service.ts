import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PuestoResponse} from "../api/puestoResponse";
import {PuestoRequest} from "../api/puestoRequest";

@Injectable({
  providedIn: 'root'
})


export class PuestoService {

  private url: string = `${environment.HOST}/rhis/puestos`

  constructor(private http: HttpClient) { }

  obtenerPuestos(){
    return this.http.get<PuestoResponse[]>(this.url)
  }

  crearPuesto(puestoRequest: PuestoRequest){
    return this.http.post(this.url, puestoRequest);
  }

  actualizarPuesto(puestoRequest: PuestoRequest){
    return this.http.put(this.url, puestoRequest);
  }

  eliminarPuesto(idPuesto: string){
    return this.http.delete(`${this.url}/${idPuesto}`);
  }



}
