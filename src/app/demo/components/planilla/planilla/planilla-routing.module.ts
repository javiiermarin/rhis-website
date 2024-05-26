import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {PlanillaComponent} from "./planilla.component";



@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: PlanillaComponent},
  ])],

  exports: [ RouterModule]
})
export class PlanillaRoutingModule { }
