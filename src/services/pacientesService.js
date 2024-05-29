import axios from '@/services/axios'

export async function novoPaciente(nome) {
    await axios.post('/pacientes', {
        nome: 'Testinho da Silva'
    })
}

export async function getAllPacientes() {
    const allPacientes = await axios.get('/pacientes')

    console.log('allPacientes.data:', allPacientes.data)

    if (!allPacientes || !allPacientes.data)
        return []

    return allPacientes.data
}