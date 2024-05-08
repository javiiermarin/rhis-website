import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {PuestoComponent} from "./puesto.component";



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: PuestoComponent }
  ])],
  exports: [RouterModule]
})
export class PuestoRoutingModule { }
