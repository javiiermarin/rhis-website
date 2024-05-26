import {EmpleadoResponse} from "./empleadoResponse";

export class AsistenciaResponse{

    idMarcacionEmpleado: string;
    empleado: EmpleadoResponse = new EmpleadoResponse();
    horaEntrada: string;
    horaSalidaAlmuerzo: string;
    horaEntradaAlmuerzo: string;
    horaSalida: string;
    fecha: string;
}