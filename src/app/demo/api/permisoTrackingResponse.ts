import {EmpleadoResponse} from "./empleadoResponse";

export class PermisoTrackingResponse{

    idPermisosTracking: string;
    estado: boolean;
    empleado: EmpleadoResponse = new EmpleadoResponse();

}