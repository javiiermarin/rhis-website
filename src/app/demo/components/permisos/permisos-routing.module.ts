import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";


@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', loadChildren: () => import('./permisos/permisos.module').then(m => m.PermisosModule)}
  ])],
  exports: [RouterModule]
})
export class PermisosRoutingModule { }
