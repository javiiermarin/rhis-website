import {EmpleadoResponse} from "./empleadoResponse";

export class HorasExtrasResponse {

    empleado: EmpleadoResponse = new EmpleadoResponse();
    horaInicio: string;
    horaFinal: string;
    fecha:string;
    horas: number;
    habilitado: boolean;
}