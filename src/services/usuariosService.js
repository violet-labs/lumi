import axios from '@/services/axios'
import router from "@/router/index";
import {jwtDecode} from 'jwt-decode';

function decodedToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
    }
}

async function login(credentials) {
    try {
        const { email, password } = credentials

        const response = await axios.post('/auth/login', {
            email, password
        });

        if (!response || !response.data || !response.data.access_token)
            return false

        const data = response.data

        axios.refreshToken(data.access_token)
        localStorage.setItem('isAuthenticated', 'true');

        return true

    } catch (error) {
        console.error('Erro ao realizar login:', error);
    }

    return false
}

async function logout() {

    try {
        await axios.post('/auth/logout')

        localStorage.clear()
        router.push('/entrar')

        return true

    } catch (error) {
        console.error('Erro ao realizar login:', error);
        return false
    }

}

export default {
    login,
    logout,
    decodedToken,
}