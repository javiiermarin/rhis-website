import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {JornadaResponse} from "../api/jornadaResponse";

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  private url: string = `${environment.HOST}/rhis/jornadas`;

  constructor(private http: HttpClient) { }

  obtenerJornadas(){
    return this.http.get<JornadaResponse[]>(this.url)
  }


}
