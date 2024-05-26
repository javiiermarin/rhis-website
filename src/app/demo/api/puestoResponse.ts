import {DivisionResponse} from "./divisionResponse";

export class PuestoResponse{

    idPuesto: string;
    nombre: string;
    salarioMaximo: number;
    salarioMinimo: number;
    isEnabled: boolean;
    division: DivisionResponse = new DivisionResponse();
}