import axios from '@/services/axios'

export async function adicionarClinica(nome) {
    try {
        const response = await axios.post('/clinicas', {
            nome
        })

        if (!response || !response.data)
            return false;

        return response.data

    } catch (error) {
        console.error('Erro ao adicionar clínica:', error);
    }

    return false

}

export async function getClinicas() {
    try {
        const response = await axios.get('/clinicas')

        if (!response || !response.data)
            return false;

        return response.data

    } catch (error) {
        console.error('Erro ao consultar clínicas:', error);
    }

    return false

}