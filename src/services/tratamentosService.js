import axios from '@/services/axios'

export async function excluirMetaTerapeutica(id) {
    try {
        const response = await axios.delete('/tratamentos/meta-terapeutica/' + id);

        if (!response || !response.data || response.data.status !== 'success')
            return false;

        return response;

    } catch (error) {
        console.error('Erro ao excluir meta terapêutica:', error);
    }

    return false;
}

export async function adicionarMetaTerapeutica(paciente_id, metaTerapeutica) {
    try {
        const response = await axios.post('/tratamentos/add-meta', {
            paciente_id,
            descricao: metaTerapeutica
        });

        if (!response || !response.data || response.data.status !== 'success')
            return false;

        return response;

    } catch (error) {
        console.error('Erro ao adicionar meta terapêutica:', error);
    }

    return false;
}

export async function getAnalises(pacienteId) {
    try {
        const response = await axios.get('/tratamentos/analises/' + pacienteId);

        if (!response || !response.data || !response.data.data || response.data.status !== 'success' || response.data.data.length == 0)
            return false

        return response.data.data

    } catch (error) {
        console.error('Erro ao consultar as análises:', error);
    }

    return false
}

export async function salvarAnalises(analises, pacienteId) {
    try {
        const response = await axios.post('/tratamentos/analises', {
            paciente_id: pacienteId,
            analises: JSON.stringify(analises),
        });

        if (!response || !response.data || response.data.status !== 'success')
            return false

        return response.data

    } catch (error) {
        console.error('Erro ao salvar as análises:', error);
    }

    return false
}