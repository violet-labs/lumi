import axios from '@/services/axios'

export async function addNovoPaciente(paciente) {
    const response = await axios.post('/pacientes', {
        nome: paciente.nome
    })

    return (response && response.status == 200)
}

export async function getAllPacientes(search = '') {
    const allPacientes = await axios.post('/pacientes/search', {
        search: search
    })

    if (!allPacientes || !allPacientes.data)
        return []


    const response = []
    for (const paciente of allPacientes.data){
        paciente.progress = 95
        paciente.place = 'Poços de Caldas'
        paciente.dentista = 'DANIEL SALLES'
        paciente.email = 'thales-lima@live.com'
        response.push(paciente)
    }

    return response
}