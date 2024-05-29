import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', loadChildren: () => import('./vacaciones-tracking/vacaciones-tracking.module').then(m => m.VacacionesTrackingModule)}
  ])],
  exports: [RouterModule]
})
export class VacacionesTrackingRoutingModule { }
