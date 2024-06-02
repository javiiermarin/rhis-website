import {Component, OnInit} from '@angular/core';
import {LayoutService} from "./service/app.layout.service";
import {KeycloakService} from "keycloak-angular";
import {EmpleadoService} from "../demo/service/empleado.service";
import {EmpleadoResponse} from "../demo/api/empleadoResponse";

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent implements OnInit {

    empleadoResponse: EmpleadoResponse = undefined

    constructor(public layoutService: LayoutService, private keycloakService: KeycloakService, private empleadoService: EmpleadoService) {
    }

    ngOnInit() {
        if (this.keycloakService.isLoggedIn()) {
            this.keycloakService.loadUserProfile().then(profile => {
                this.empleadoService.getOne(profile.id).subscribe(data => {
                    this.empleadoResponse = data;
                })
            }).catch(error => {
                console.error('Failed to load user profile', error);
            });
        } else {
            console.error('User not logged in');
        }

    }

    getFooter(): string | null {
        if (this.empleadoResponse) {
            return 'Usuario logueado: ' + this.empleadoResponse.nombres + ' ' + this.empleadoResponse.apellidos + '. Role: ' + this.empleadoResponse.role.toUpperCase()
        }
        return null;
    }
}
