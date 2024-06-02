import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {MenuItem} from "primeng/api";
import {
    getRolesAllowedAdministrationModule,
    getRolesAllowedMyPortalModule,
    getRolesAllowedRRHHModule
} from "../utils/rolesAllowedUtils";
import {decodeToken} from "../utils/jwt-utils";
import {KeycloakService} from "keycloak-angular";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',

})
export class AppMenuComponent implements OnInit {

    items: MenuItem[];
    userName: string = null;

    constructor(public layoutService: LayoutService, private keycloakService: KeycloakService,) { }

    ngOnInit() {
        const jwtDecode: any = decodeToken(this.keycloakService.getKeycloakInstance().token)
        this.userName = jwtDecode.name;
        const roles: string[] = jwtDecode.realm_access?.roles || [];
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
                        requiredRoles: getRolesAllowedMyPortalModule(),
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
                        requiredRoles: getRolesAllowedRRHHModule(),
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
                        requiredRoles: getRolesAllowedAdministrationModule(),
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
        this.items = filterItemsByRoles(this.items, roles);
    }
}

/**
 * Funcion que filtra los menu y submenus segun los roles requeridos
 *
 * @param items items del menu
 * @param roles roles del usuario logueado
 */
function filterItemsByRoles(items: any[], roles: string[]): any[] {
    return items.filter(item => !item.requiredRoles || item.requiredRoles.some((role: string) => roles.includes(role)))
        .map(item => {
            if (item.items && item.items.length > 0) {
                item.items = filterItemsByRoles(item.items, roles);
            }
            return item;
        });
}
