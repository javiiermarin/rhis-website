import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {JornadasComponent} from "./jornadas.component";



@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: JornadasComponent},
  ])],
  exports: [ RouterModule]
})
export class JornadaRountingModule { }
