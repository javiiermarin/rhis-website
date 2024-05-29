import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivisionRoutingModule } from './division-routing.module';
import {DivisionesComponent} from "./divisiones.component";
import { TableModule } from 'primeng/table';
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
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
import { AutoCompleteModule } from 'primeng/autocomplete';



@NgModule({
    declarations: [
        DivisionesComponent
    ],
    exports: [
        DivisionesComponent
    ],
    imports: [
        CommonModule,
        DivisionRoutingModule,
        TableModule,
        ToastModule,
        ButtonModule,
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
        FormsModule,
        AutoCompleteModule
    ]
})
export class DivisionModule { }
