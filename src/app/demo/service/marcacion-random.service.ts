import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {VacacionesResponse} from "../api/vacacionesResponse";
import {MarcacionesRandomResponse} from "../api/marcacionesRandomResponse";

@Injectable({
  providedIn: 'root'
})
export class MarcacionRandomService {

  private url: string = `${environment.HOST}/rhis/marcacionesRandom`;

  constructor(private http: HttpClient) { }

  listarMarcacionesRandom(){
    return this.http.get<MarcacionesRandomResponse[]>(this.url)
  }
}
