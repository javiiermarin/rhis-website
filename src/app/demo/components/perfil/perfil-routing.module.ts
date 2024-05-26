import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";



@NgModule({
  imports: [RouterModule.forChild([
    {path: '', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule)},
  ])],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
