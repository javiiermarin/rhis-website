import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {MarcacionComponent} from "./marcacion.component";



@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MarcacionComponent},
  ])],

  exports: [RouterModule]
})
export class MarcacionRoutingModule { }
