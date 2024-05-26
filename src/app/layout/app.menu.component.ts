import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',

})
export class AppMenuComponent implements OnInit {

    items: MenuItem[];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.items = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Menu',
                items: [
                    {
                        label: 'Mi Portal',
                        icon: 'pi pi-fw pi-id-card',
                        items: [
                            {
                                label: 'Mi perfil',
                                icon: 'pi pi-user',
                                routerLink: ['/perfil']
                            },
                            {
                                label: 'Vacaciones',
                                icon: 'pi pi-calendar-minus',
                                routerLink: ['/vacaciones']
                            },
                            {
                                label: 'Permisos',
                                icon: 'pi pi-calendar',
                                routerLink: ['/permisos']
                            }
                        ]},
                    {
                        label: 'Recursos Humanos',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: "Personal",
                                icon: "pi pi-user-edit",
                                items:[
                                    {
                                        label: "Empleados",
                                        icon: 'pi pi-user-edit',
                                        routerLink: ['/empleados']
                                    },
                                ]

                            },
                            {
                                label: 'Gestion de ausencias',
                                icon: '',
                                items: [
                                    {
                                        label: 'Permisos',
                                        icon: 'pi pi-calendar',
                                        routerLink: ['/permisosTracking']
                                    },
                                    {
                                        label: 'Vacaciones',
                                        icon: 'pi pi-calendar-minus',
                                        routerLink: ['/vacacionesTracking']
                                    }

                                ]
                            },
                            {
                                label: 'Control de Asistencia',
                                icon: '',
                                items: [
                                    {
                                        label: 'Marcacion',
                                        icon: 'pi pi-clock',
                                        routerLink: ['/marcacion']
                                    },
                                    {
                                        label: 'Asistencias',
                                        icon: 'pi pi-clock',
                                        routerLink: ['/asistencia']

                                    }

                                ]
                            },
                            {
                                label: 'Impuestos',
                                icon: '',
                                items: [
                                    {
                                        label: 'Impuestos',
                                        icon: '',
                                        routerLink: ['/impuestos']
                                    }

                                ]
                            },
                            {
                                label: 'Jornadas',
                                icon: 'pi pi-hourglass',
                                routerLink: ['/jornadas']
                            },
                            {
                                label: 'Planilla',
                                icon: 'pi pi-money-bill',
                                routerLink: ['/planilla']
                            }
                        ],
                        },
                    {
                        label: 'Administracion',
                        icon: 'pi pi-briefcase',
                        items:[
                            {
                                label: "Divisiones",
                                icon: 'pi pi-th-large',
                                routerLink: ['/divisiones']
                            },
                            {
                                label: "Puestos",
                                icon: 'pi pi-bars',
                                routerLink: ['/puestos']
                            }

                        ]
                    }

                ]
            },
            /*{
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/notfound']
                    },

                ]
            },*/

        ];
    }
}
