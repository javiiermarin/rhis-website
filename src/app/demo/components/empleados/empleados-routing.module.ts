import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', loadChildren: () => import ('./empleado/empleado.module').then(m => m.EmpleadoModule)},
  ])],

  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
