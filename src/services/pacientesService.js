import axios from '@/services/axios'

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

export async function getEnderecoByCep(cep) {
    const enderecoInfo = await axios.get('https://api.brasilaberto.com/v1/zipcode/' + cep, { withCredentials: false })

    return enderecoInfo.data && enderecoInfo.data.result ? enderecoInfo.data.result : null
}

export async function addNovoPaciente(paciente) {
    const response = await axios.post('/pacientes', {
        nome: paciente.nome
    })

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

export async function getAllPacientes(search = '') {
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