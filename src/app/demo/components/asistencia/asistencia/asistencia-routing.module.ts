import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {AsistenciaComponent} from "./asistencia.component";



@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: AsistenciaComponent},
  ])],
  exports: [ RouterModule]
})
export class AsistenciaRoutingModule { }
