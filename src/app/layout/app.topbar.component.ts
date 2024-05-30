import {Component, ElementRef, ViewChild} from '@angular/core';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {LayoutService} from "./service/app.layout.service";
import {KeycloakService} from "keycloak-angular";

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
    sidebarActive: boolean;
    anchored: boolean,
}

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
        sidebarActive: false,
        anchored: false
    };

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private keycloakService: KeycloakService,
                private confirmationService: ConfirmationService) {
    }

    showProfileSidebar() {
        this.state.profileSidebarVisible = true;
    }

    /**
     * Funcion que cierra sesión
     */
    logout() {
        return this.keycloakService.logout(window.location.origin + "/");
    }

    confirmLogout() {
        this.confirmationService.confirm({
            message: '¿Está seguro que desea cerrar sesión?',
            header: 'Confirmación',
            icon: 'pi pi-power-off',
            acceptLabel: 'Si',
            rejectLabel: 'No',
            accept: () => {
                this.logout().then(() => true)
            }
        });
    }
}
