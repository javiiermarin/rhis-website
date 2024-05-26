import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', loadChildren: () => import('./jornadas/jornadas.module').then(m => m.JornadasModule)},
  ])],

  exports: [RouterModule]
})
export class JornadaRountingModule { }
