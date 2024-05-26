import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', loadChildren: () => import('./permisos-tracking/permisos-tracking.module').then(m => m.PermisosTrackingModule)}
  ])],

  exports: [RouterModule]
})
export class PermisosTrackingRoutingModule { }
