import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VacacionesComponent} from "./vacaciones.component";
import { VacacionesRoutingModule } from './vacaciones-routing.module';
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {ɵEmptyOutletComponent} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {BadgeModule} from "primeng/badge";


@NgModule({
  declarations: [
      VacacionesComponent
  ],
    imports: [
        CommonModule,
        VacacionesRoutingModule,
        ToastModule,
        ToolbarModule,
        ɵEmptyOutletComponent,
        ButtonModule,
        RippleModule,
        TableModule,
        DialogModule,
        CalendarModule,
        FormsModule,
        InputTextareaModule,
        BadgeModule,
    ]
})
export class VacacionesModule { }
