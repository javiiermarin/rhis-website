import {EmpleadoResponse} from "./empleadoResponse";

export class VacacionesTrackingResponse{

    idVacacionesTracking: string;
    estado: boolean;
    empleado: EmpleadoResponse = new EmpleadoResponse();
}