import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Division} from "../api/division";

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  private url : string = `${environment.HOST}/rhis/divisiones`

  constructor(private http : HttpClient) { }

  obtenerDivisiones(){
    return this.http.get<Division[]>(this.url)
  }
}
