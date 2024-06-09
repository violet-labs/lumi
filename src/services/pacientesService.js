import axios from '@/services/axios'

export async function addNovoPaciente(paciente) {
    const response = await axios.post('/pacientes', {
        nome: paciente.nome
    })

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
        paciente.place = 'Poços de Caldas'
        paciente.dentista = 'DANIEL SALLES'
        paciente.email = 'thales-lima@live.com'
        response.push(paciente)
    }

    return response
}

export async function uploadImage(event, imageType) {
    let data = new FormData();
    data.append('name', 'my-picture');
    data.append('image', event.target.files[0]);
    data.append('imageType', imageType);

    await axios.post('/pacientes/upload-image', data,
    {
        header: {'Content-Type': 'image/png' }
    })
}