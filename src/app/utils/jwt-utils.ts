import {jwtDecode} from "jwt-decode";


/**
 * Funcion que decodifica el token
 * @param token access token
 */
export function decodeToken(token: string): any {
    return jwtDecode(token);
}

/**
 * Funcion que obtiene el rol del usuario logueado
 * @param roles lista de roles
 */
export function getRole(roles: string[]) {
    return roles.find(
        (rol) => rol === '' || rol === '' || rol === '' || rol === '')
}
