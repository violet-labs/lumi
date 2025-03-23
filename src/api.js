export function isAuthenticated() {
    return localStorage.getItem('isAuthenticated', 'false') === 'true';
}