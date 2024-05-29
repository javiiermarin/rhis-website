import {EmpleadoResponse} from "./empleadoResponse";

export class VacacionesTrackingResponse{

    idVacacionesTracking: string;
    estado: boolean;
    empledo: EmpleadoResponse = new EmpleadoResponse();
}