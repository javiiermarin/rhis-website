import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {VacacionesTrackingComponent} from "./vacaciones-tracking.component";

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: VacacionesTrackingComponent},
  ])],
  exports: [ RouterModule]
})
export class VacacionesTrackingRoutingModule { }
