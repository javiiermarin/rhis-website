import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {

    constructor(
        protected override router: Router,
        protected keycloakService: KeycloakService
    ) {
        super(router, keycloakService);
    }

    async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        if (!this.authenticated) {
            await this.keycloakService.login({
                redirectUri: window.location.origin + "/" + state.url,
            });
        }

        // Roles permitidos en el app routing
        const requiredRoles: string[] = route.data?.['ro' +
        'les'];

        const hasAccess = this.roles.some(role => requiredRoles.includes(role));

        if (!hasAccess) {
            await this.router.navigate(['/access']);
            return false;
        }

        return true;
    }
}
