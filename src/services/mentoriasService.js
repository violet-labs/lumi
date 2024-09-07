import axios from '@/services/axios'

export async function solicitarMentoria(paciente_id, observacao) {
    try {
        const response = await axios.post('/mentorias/solicitar', {
            paciente_id,
            observacao,
        });

        if (!response || !response.data || response.data.status !== 'success')
            return false

        return response.data.data

    } catch (error) {
        console.error('Erro ao solicitar mentoria:', error);
    }

    return false
}