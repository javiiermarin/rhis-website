import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {ImpuestosComponent} from "./impuestos.component";


@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: ImpuestosComponent},
  ])],

  exports: [ RouterModule]
})
export class ImpuestosRoutingModule { }
