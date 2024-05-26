import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuestoRoutingModule } from './puesto-routing.module';
import {ButtonModule} from "primeng/button";
import {CurrencyPipe, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RadioButtonModule} from "primeng/radiobutton";
import {RatingModule} from "primeng/rating";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {ToolbarModule} from "primeng/toolbar";
import {ToastModule} from "primeng/toast";
import {PuestoComponent} from "./puesto.component";
import {TableModule} from "primeng/table";



@NgModule({
  declarations: [
      PuestoComponent
  ],
  imports: [
    CommonModule,
    PuestoRoutingModule,
    ButtonModule,
    CurrencyPipe,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    RatingModule,
    ReactiveFormsModule,
    RippleModule,
    ToolbarModule,
    ToastModule,
    NgIf,
    FormsModule,
    TableModule
  ]
})
export class PuestosModule { }
