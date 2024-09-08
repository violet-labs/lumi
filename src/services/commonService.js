import axios from '@/services/axios'

export async function getEnderecoByCep(cep) {
    const enderecoInfo = await axios.get('https://api.brasilaberto.com/v1/zipcode/' + cep, { withCredentials: false })

    return enderecoInfo.data && enderecoInfo.data.result ? enderecoInfo.data.result : null
}