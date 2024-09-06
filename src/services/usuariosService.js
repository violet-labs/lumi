import axios from '@/services/axios'

export async function authLogin(credentials) {
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
        console.error('Erro ao enviar formulário de boas-vindas:', error);
    }

    return false
}