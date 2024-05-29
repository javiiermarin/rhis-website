import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {VacacionesComponent} from "./vacaciones.component";



@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: VacacionesComponent},
  ])

  ]
})
export class VacacionesRoutingModule { }
