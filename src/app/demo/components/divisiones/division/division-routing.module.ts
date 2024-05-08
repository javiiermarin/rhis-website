import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {DivisionesComponent} from "./divisiones.component";



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: DivisionesComponent }
  ])],
  exports: [RouterModule]
})
export class DivisionRoutingModule { }
