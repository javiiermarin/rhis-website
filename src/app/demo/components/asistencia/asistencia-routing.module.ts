import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";



@NgModule({
  imports: [RouterModule.forChild([
    {path: '', loadChildren: () => import('./asistencia/asistencia.module').then(m => m.AsistenciaModule)},
  ])],

  exports: [RouterModule]
})
export class AsistenciaRoutingModule { }
