import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PagoPlanillaResponse} from "../api/pagoPlanillaResponse";
import {PagoPlanillaRequest} from "../api/pagoPlanillaRequest";

@Injectable({
  providedIn: 'root'
})
export class PlanillaService {

  private url: string = `${environment.HOST}/rhis/pago_planillas`

  constructor(private http : HttpClient) {}

  generarPlanilla(pagoPlanillaRequest: PagoPlanillaRequest){
    return this.http.post(this.url, pagoPlanillaRequest);

  }

  obtenerPlanilla(){
    return this.http.get<PagoPlanillaResponse[]>(this.url)
  }
}
