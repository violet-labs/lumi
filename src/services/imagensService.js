import axios from '@/services/axios'
import moment from 'moment'

export async function uploadImage(options) {
    if (!options.paciente_id)
        return false;

    options = {
        dir: 'misc',
        data: moment().format('YYYY-MM-DD HH:mm:ss'),
        descricao: '',
        ...options,
    }

    try {
        let data = new FormData();
        console.log('options.imagem:', options.imagem)
        data.append('paciente_id', options.paciente_id);
        data.append('imagem', options.imagem);
        data.append('dir', options.dir);
        data.append('data', options.data);
        data.append('descricao', options.descricao);

        const response = await axios.post('/img', data,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

        if (!response || !response.data || response.data.status !== 'success')
            return false;

        return response;

    } catch (error) {
        console.error('Erro ao enviar imagem:', error);
    }

    return false;
}