import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ImpuestoResponse} from "../api/impuestoResponse";
import {ImpuestoRequest} from "../api/impuestoRequest";

@Injectable({
  providedIn: 'root'
})
export class ImpuestosService {

  private url: string = `${environment.HOST}/rhis/impuestos`

  constructor(private http: HttpClient) {}

  registrarImpuesto(impuestoRequest: ImpuestoRequest){
    return this.http.post(this.url, impuestoRequest);
  }

  listarImpuestos(){
    return this.http.get<ImpuestoResponse[]>(this.url)
  }

  modificarImpuesto(impuestoRequest: ImpuestoRequest){
    return this.http.put(this.url, impuestoRequest);
  }

  eliminarImpuesto(idImpuesto: string){
    return this.http.delete(`${this.url}/${idImpuesto}`)
  }


}
