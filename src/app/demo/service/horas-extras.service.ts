import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {HorasExtrasResponse} from "../api/horasExtrasResponse";

@Injectable({
  providedIn: 'root'
})
export class HorasExtrasService {

  private url: string = `${environment.HOST}/rhis/horasExtras`;

  constructor(private http: HttpClient) { }

  obtenerHorasExtras(){
   return this.http.get<HorasExtrasResponse[]>(this.url)
  }


}
