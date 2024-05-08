import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Empleado} from "../api/empleado";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private url : string = `${environment.HOST}/rhis/empleados`

  constructor(private http : HttpClient) { }

  obtenerEmpleados(){
    return this.http.get<Empleado[]>(this.url);
  }

}
