import {EmpleadoResponse} from "./empleadoResponse";

export class PagoPlanillaResponse {
    idPagoPlanilla: string;
    empleado: EmpleadoResponse = new EmpleadoResponse();
    fechaInicio: string;
    fechaFinal: string;
    sueldoBase: number;
    salarioNeto: number;


}