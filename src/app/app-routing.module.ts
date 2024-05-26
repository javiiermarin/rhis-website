import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'permisosTracking', loadChildren: () => import('./demo/components/permisosTracking/permisos-tracking.module').then(m => m.PermisosTrackingModule)},
                    { path: 'vacacionesTracking', loadChildren: () => import('./demo/components/vacacionesTracking/vacaciones-tracking.module').then(m => m.VacacionesTrackingModule)},
                    { path: 'impuestos', loadChildren: () => import('./demo/components/impuestos/impuestos.module').then(m => m.ImpuestosModule)},
                    { path: 'asistencia', loadChildren: () => import('./demo/components/asistencia/asistencia.module').then(m => m.AsistenciaModule)},
                    { path: 'planilla', loadChildren: () => import('./demo/components/planilla/planilla.module').then(m => m.PlanillaModule)},
                    { path: 'marcacion', loadChildren: () => import('./demo/components/marcacion/marcacion.module').then(m => m.MarcacionModule)},
                    { path: 'jornadas', loadChildren: () => import('./demo/components/jornadas/jornadas.module').then(m => m.JornadasModule)},
                    { path: 'perfil', loadChildren: () => import('./demo/components/perfil/perfil.module').then(m => m.PerfilModule)},
                    { path: 'permisos', loadChildren: () => import('./demo/components/permisos/permisos.module').then(m => m.PermisosModule)},
                    { path: 'vacaciones', loadChildren: () => import('./demo/components/vacaciones/vacaciones.module').then(m => m.VacacionesModule)},
                    { path: 'divisiones', loadChildren: () => import('./demo/components/divisiones/divisiones.module').then(m => m.DivisionesModule)},
                    { path: 'puestos', loadChildren: () => import('./demo/components/puesto/puesto.module').then(m => m.PuestoModule)},
                    { path: 'empleados', loadChildren: () => import('./demo/components/empleados/empleados.module').then(m =>m.EmpleadosModule)},
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
