import axios from '@/services/axios'

export async function novoPaciente(nome) {
    console.log('bbbbbbb');
    await axios.post('/pacientes', {
        nome: 'Testinho da Silva'
    })
}