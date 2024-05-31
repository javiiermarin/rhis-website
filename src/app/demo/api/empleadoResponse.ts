import {EmpleadoReferencia} from "./empleadoReferencia";
import {ExperienciaLaboral} from "./experienciaLaboral";
import {NivelAcademico} from "./nivelAcademico";
import {PuestoResponse} from "./puestoResponse";

export class EmpleadoResponse {
    idEmpleado: string;
    nombres: string;
    apellidos?: string;
    dpi?: string;
    telefono?: string;
    direccion?: string;
    genero?: string;
    correo?: string;
    nit?: string;
    nacionalidad: string;
    nivelIngles: string;
    fechaRegistro: string;
    fechaNacimiento: string;
    fechaIngreso: string;
    fechaSalida: string;
    habilitado: boolean;
    estadoCivil: string;
    salario: number;
    puesto: PuestoResponse = new PuestoResponse();
    empleadoReferencia: EmpleadoReferencia [] = [];
    experienciaLaboral: ExperienciaLaboral [] = [];
    nivelAcademico: NivelAcademico [] = [];

    fullName?: string;

}