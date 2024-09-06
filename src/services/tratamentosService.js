import axios from '@/services/axios'

export async function salvarAnalises(analises, pacienteId) {
    try {
        const response = await axios.post('/tratamentos/salvar-analises', {
            paciente_id: pacienteId,
            analises,
        });

        if (!response || !response.data || response.data.status !== 'success')
            return false

        return response

    } catch (error) {
        console.error('Erro ao enviar formulário de boas-vindas:', error);
    }

    return false
}