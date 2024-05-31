import {VacacionesTrackingResponse} from "./vacacionesTrackingResponse";
import {VacacionesTrackingRequest} from "./vacacionesTrackingRequest";

export class VacacionesRequest {
    idVacaciones?: string;
    fechaInicio: string;
    fechaFinal: string;
    empleado: string;
    descripcion?: string;
    vacacionesTracking?: VacacionesTrackingRequest [] = [];
}