import {EmpleadoResponse} from "./empleadoResponse";
import {TipoPermiso} from "./tipoPermiso";
import {PermisoTrackingResponse} from "./permisoTrackingResponse";

export class PermisoResponse{

    tipoPermiso: TipoPermiso;
    fechaSolicitud: string;
    fechaInicio: string;
    fechaFinal: string;
    empleado: EmpleadoResponse;
    permisoTracking: PermisoTrackingResponse[] = [];


}