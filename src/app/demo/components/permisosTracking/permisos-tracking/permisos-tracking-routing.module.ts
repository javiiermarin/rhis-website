import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {PermisosTrackingComponent} from "./permisos-tracking.component";



@NgModule({
  imports: [ RouterModule.forChild([
    {path: '', component: PermisosTrackingComponent},
  ])],

  exports: [ RouterModule]
})
export class PermisosTrackingRoutingModule { }
