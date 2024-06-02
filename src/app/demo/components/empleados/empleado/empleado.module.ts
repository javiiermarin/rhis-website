import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoRoutingModule } from './empleado-routing.module';
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {EmpleadoComponent} from "./empleado.component";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {ToolbarModule} from "primeng/toolbar";
import {MenuModule} from "primeng/menu";
import {ChartModule} from "primeng/chart";
import {RadioButtonModule} from "primeng/radiobutton";
import { CalendarModule } from 'primeng/calendar';
import {InputMaskModule} from "primeng/inputmask";



@NgModule({
  declarations: [
      EmpleadoComponent
  ],
    imports: [
        CommonModule,
        EmpleadoRoutingModule,
        TableModule,
        ToastModule,
        ButtonModule,
        DialogModule,
        DropdownModule,
        InputTextModule,
        ReactiveFormsModule,
        RippleModule,
        ToolbarModule,
        FormsModule,
        MenuModule,
        ChartModule,
        RadioButtonModule,
        CalendarModule,
        InputMaskModule,
    ]
})
export class EmpleadoModule { }
