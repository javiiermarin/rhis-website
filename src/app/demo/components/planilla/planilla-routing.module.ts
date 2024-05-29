import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', loadChildren: () => import ('./planilla/planilla.module').then(m => m.PlanillaModule)},
  ])],

  exports: [RouterModule]
})
export class PlanillaRoutingModule { }
