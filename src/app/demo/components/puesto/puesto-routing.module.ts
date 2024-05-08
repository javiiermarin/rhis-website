import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', loadChildren: () => import('./puestos/puestos.module').then(m => m.PuestosModule)}
  ])],
  exports: [RouterModule]
})
export class PuestoRoutingModule { }
