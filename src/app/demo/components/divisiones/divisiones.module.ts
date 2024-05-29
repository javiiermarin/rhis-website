import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivisionesRoutingModule } from './divisiones-routing.module';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    DivisionesRoutingModule,
    TableModule,

  ]
})
export class DivisionesModule { }
