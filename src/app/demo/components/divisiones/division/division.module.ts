import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivisionRoutingModule } from './division-routing.module';
import {DivisionesComponent} from "./divisiones.component";



@NgModule({
  declarations: [
      DivisionesComponent
  ],
  imports: [
    CommonModule,
    DivisionRoutingModule
  ]
})
export class DivisionModule { }
