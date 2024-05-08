import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', loadChildren: () => import('./division/division.module').then(m => m.DivisionModule)},
  ])],
  exports: [RouterModule]
})
export class DivisionesRoutingModule { }
