import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PermisosComponent} from "./permisos.component";
import {PermisosRoutingModule} from "./permisos-routing.module";
import {ToolbarModule} from "primeng/toolbar";
import {SharedModule} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule} from "@angular/forms";
import {BadgeModule} from "primeng/badge";



@NgModule({
  declarations: [
      PermisosComponent
  ],
    imports: [
        CommonModule,
        PermisosRoutingModule,
        ToolbarModule,
        SharedModule,
        ButtonModule,
        RippleModule,
        TableModule,
        DialogModule,
        DropdownModule,
        CalendarModule,
        InputTextareaModule,
        FormsModule,
        BadgeModule
    ]
})
export class PermisosModule { }
