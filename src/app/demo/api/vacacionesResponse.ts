import {EmpleadoResponse} from "./empleadoResponse";
import {VacacionesTrackingResponse} from "./vacacionesTrackingResponse";

export class VacacionesResponse{

    idVacaciones: string;
    fechaSolicitud: string;
    fechaInicio: string;
    fechaFinal: string;
    descripcion: string;
    createdBy?: string;
    createdAt?: string;
    empleado: EmpleadoResponse = new EmpleadoResponse();
    vacacionesTracking: VacacionesTrackingResponse [] = [];

}