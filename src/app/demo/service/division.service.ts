import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DivisionRequest} from "../api/divisionRequest";
import {DivisionResponse} from "../api/divisionResponse";

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  private url : string = `${environment.HOST}/rhis/divisiones`

  constructor(private http : HttpClient) { }

  obtenerDivisiones(){
    return this.http.get<DivisionResponse[]>(this.url)
  }

  crearDivision(division: DivisionRequest){
    return this.http.post(this.url, division);
    
  }

  actualizarDivision(division: DivisionRequest){
    return this.http.put(this.url, division);
  }

  eliminarDivision(idDivision: string) {
    return this.http.delete(`${this.url}/${idDivision}`);
  }
}
