import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',

})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

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
                                label: 'Vacaciones',
                                icon: 'pi pi-calendar-minus'
                            },
                            {
                                label: 'Permisos',
                                icon: 'pi pi-calendar'
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
                                        label: "Registrar Personal",
                                        icon: "pi pi-user-edit"
                                    },
                                    {
                                        label: "Buscar Empleados",
                                        icon: 'pi pi-search',
                                        routerLink: ['/empleados']
                                    },
                                ]

                            },
                            {
                                label: "Divisiones",
                                icon: 'pi pi-search',
                                routerLink: ['/divisiones']
                            },
                            {
                                label: "Puestos",
                                icon: 'pi pi-search',
                                routerLink: ['./puestos']
                            }
                        ],
                        },

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
