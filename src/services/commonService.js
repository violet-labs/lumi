import axios from '@/services/axios'

export async function getEnderecoByCep(cep) {
    const enderecoInfo = await axios.get(`https://viacep.com.br/ws/${cep}/json`, { withCredentials: false })

    if (!enderecoInfo?.data)
        return null

    const endereco = {
        street: enderecoInfo.data.logradouro,
        city: enderecoInfo.data.localidade,
        state: enderecoInfo.data.estado
    }

    return endereco
}