import {EmpleadoReferencia} from "./empleadoReferencia";
import {ExperienciaLaboral} from "./experienciaLaboral";
import {NivelAcademico} from "./nivelAcademico";

export class EmpleadoRequest{

    idEmpleado : string;
    nombres : string;
    apellidos? : string;
    dpi? : string;
    telefono? : string;
    direccion? : string;
    genero? : string;
    correo? : string;
    nit? : string;
    nacionalidad? : string;
    nivelIngles? : string;
    fechaRegistro? : string;
    fechaNacimiento? : string;
    fechaIngreso? : string;
    fechaSalida? : string;
    habilitado? : boolean;
    estadoCivil? : string;
    salario? : number;
    puesto? : string;
    empleadoReferencia : EmpleadoReferencia[] = [];
    experienciaLaboral? : ExperienciaLaboral[]=[];
    nivelAcademico? : NivelAcademico[]=[];
}