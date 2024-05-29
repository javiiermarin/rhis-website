import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', loadChildren: () => import('./vacaciones/vacaciones.module').then(m => m.VacacionesModule)}
  ])],

  exports: [RouterModule]
})
export class VacacionesRoutingModule { }
