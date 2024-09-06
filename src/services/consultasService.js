import axios from '@/services/axios'

export async function novaConsulta(consulta) {
    try {
        const response = await axios.post('/consultas', { consulta });

        if (!response || !response.data || !response.data.dentista || response.data.status !== 'success')
            return false

        return response.data

    } catch (error) {
        console.error('Erro ao buscar dentista através do token da URL', error);
    }

    return false
}