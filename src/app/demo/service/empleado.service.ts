import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {EmpleadoResponse} from "../api/empleadoResponse";
import {EmpleadoRequest} from "../api/empleadoRequest";

@Injectable({
    providedIn: 'root'
})
export class EmpleadoService {

    private url: string = `${environment.HOST}/rhis/empleados`

    constructor(private http: HttpClient) {
    }

    obtenerEmpleados() {
        return this.http.get<EmpleadoResponse[]>(this.url);
    }

    getOne(idEmpleado: string) {
        return this.http.get<EmpleadoResponse>(this.url + "/" + idEmpleado);
    }

    crearEmpleado(empleadoRequest: EmpleadoRequest) {
        return this.http.post(this.url, empleadoRequest);
    }

    modificarEmpleado(empleadoRequest: EmpleadoRequest) {
        return this.http.put(this.url, empleadoRequest);
    }

}
