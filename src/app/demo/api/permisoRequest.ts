import {PermisoTrackingResponse} from "./permisoTrackingResponse";

export class PermisoRequest{

    idPermiso: string;
    tipoPermiso: string;
    empleado: string;
    fechaInicio: string;
    fechaFinal: string;
    descripcion: string;
    permisoTracking: PermisoTrackingResponse[] = [];

}