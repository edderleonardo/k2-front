// TODO: crear endpoint que devuelva el token con el nombre token
export function getUserToken() {
    return localStorage.getItem('token');
}

export function setUserToken(token) {
    localStorage.setItem('token', token);
}
