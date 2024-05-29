import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";



@NgModule({
  imports: [RouterModule.forChild([
    {path: '', loadChildren: () => import('./impuestos/impuestos.module').then(m => m.ImpuestosModule)}
  ])],

  exports: [RouterModule]
})
export class ImpuestosRoutingModule { }
