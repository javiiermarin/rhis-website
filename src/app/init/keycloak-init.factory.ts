import {KeycloakService} from "keycloak-angular";
import {environment} from "../../environments/environment";

export function initializeKeycloak(
    keycloak: KeycloakService
) {
    return () =>
        keycloak.init({
            config: {
                url: environment.AUTH_KEYCLOAK,
                realm: environment.REALM_KEYCLOAK,
                clientId: environment.CLIENT_ID,
            },
            initOptions: {
                checkLoginIframe: false
            }
        })
}
