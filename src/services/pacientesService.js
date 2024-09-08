import axios from '@/services/axios'

export async function adicionarMeioContato(paciente_id, contato) {
    try {
        const response = await axios.post('/contatos-pacientes', {
            paciente_id,
            ...contato
        });

        if (!response || !response.data || response.data.status !== 'success')
            return false;

        return response;

    } catch (error) {
        console.error('Erro ao salvar meio de contato:', error);
    }

    return false;
}

export async function excluirMeioContato(id) {
    try {
        const response = await axios.delete('/contatos-pacientes/' + id);

        if (!response || !response.data || response.data.status !== 'success')
            return false;

        return response;

    } catch (error) {
        console.error('Erro ao excluir meio de contato:', error);
    }

    return false;
}

export async function salvarDiagnostico(paciente_id, diagnostico) {
    try {
        const response = await axios.post('/pacientes/salvar-diagnostico', {
            paciente_id,
            diagnostico,
        });

        if (!response || !response.data || response.data.status !== 'success')
            return false;

        return response;

    } catch (error) {
        console.error('Erro ao salvar diagnóstico:', error);
    }

    return false;
}

export async function salvarPrognostico(paciente_id, prognostico) {
    try {
        const response = await axios.post('/pacientes/salvar-prognostico', {
            paciente_id,
            prognostico,
        });

        if (!response || !response.data || response.data.status !== 'success')
            return false;

        return response;

    } catch (error) {
        console.error('Erro ao salvar diagnóstico:', error);
    }

    return false;
}

export async function sendWelcomeForm(questions) {
    try {
        const response = await axios.post('/pacientes/welcome-form', {
            id_paciente: 3,
            questions,
        });

        if (!response || !response.data || response.data.status !== 'success')
            return false

        return response

    } catch (error) {
        console.error('Erro ao enviar formulário de boas-vindas:', error);
    }

    return false
}

export async function getPacienteByToken(token) {
    try {
        const response = await axios.get('/pacientes/get-by-token/' + token);

        if (!response || !response.data || !response.data.paciente || response.data.status !== 'success')
            return false

        return response.data.paciente

    } catch (error) {
        console.error('Erro ao buscar paciente através do token da URL', error);
    }

    return false
}

export async function addNovoPaciente(paciente) {
    const response = await axios.post('/pacientes', paciente)

    return (response && response.status == 200)
}

export async function updatePaciente(paciente) {
    const response = await axios.put('/pacientes/' + paciente.id, paciente)

    return (response && response.status == 200)
}

export async function getPaciente(id) {
    const paciente = await axios.get('/pacientes/' + id)

    if (!paciente || !paciente.data)
        return null

    return paciente.data
}

export async function searchPacientes(search = '') {
    const allPacientes = await axios.post('/pacientes/search', {
        search: search
    })

    if (!allPacientes || !allPacientes.data)
        return []


    const response = []
    for (const paciente of allPacientes.data) {
        paciente.progress = 95
        paciente.dentista = 'DANIEL SALLES'
        paciente.email = 'thales-lima@live.com'
        response.push(paciente)
    }

    return response
}

export async function uploadImage(image, type, date, description) {
    let data = new FormData();
    data.append('image', image);
    data.append('type', type);
    data.append('date', date);
    data.append('description', description);

    await axios.post('/pacientes/upload-image', data,
        {
            header: { 'Content-Type': 'image/png' }
        })
}