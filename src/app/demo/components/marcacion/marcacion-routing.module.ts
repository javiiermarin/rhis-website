import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [RouterModule.forChild([
    {path: '', loadChildren: () => import('./marcacion/marcacion.module').then(m => m.MarcacionModule)},
  ])],

  exports: [ RouterModule]
})
export class MarcacionRoutingModule { }
