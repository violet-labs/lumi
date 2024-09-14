import axios from '@/services/axios'

export async function adicionarMeioContato(dentista_id, contato) {
    try {
        const response = await axios.post('/contatos-dentistas', {
            dentista_id,
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
        const response = await axios.delete('/contatos-dentistas/' + id);

        if (!response || !response.data || response.data.status !== 'success')
            return false;

        return response;

    } catch (error) {
        console.error('Erro ao excluir meio de contato:', error);
    }

    return false;
}

export async function addNovoDentista(dentista) {
    const response = await axios.post('/dentistas', dentista)

    return (response && response.status == 200)
}

export async function getDentistaByToken(token) {
    try {
        const response = await axios.get('/dentistas/get-by-token/' + token);

        if (!response || !response.data || !response.data.dentista || response.data.status !== 'success')
            return false

        return response.data.dentista

    } catch (error) {
        console.error('Erro ao buscar dentista através do token da URL', error);
    }

    return false
}

export async function updateDentista(dentista) {
    const response = await axios.put('/dentistas/' + dentista.id, dentista)

    return (response && response.status == 200)
}

export async function getDentista(id) {
    const dentista = await axios.get('/dentistas/' + id)

    if (!dentista || !dentista.data)
        return null

    return dentista.data
}

export async function searchDentistas(search = '') {
    const allDentistas = await axios.post('/dentistas/search', {
        search: search
    })

    if (!allDentistas || !allDentistas.data)
        return []


    const response = []
    for (const dentista of allDentistas.data) {
        // DEBUG / EDIT
        response.push(dentista)
    }

    return response
}

export async function uploadImage(image, type, date, description) {
    let data = new FormData();
    data.append('image', image);
    data.append('type', type);
    data.append('date', date);
    data.append('description', description);

    await axios.post('/dentistas/upload-image', data,
        {
            header: { 'Content-Type': 'image/png' }
        })
}

export async function getDentistas() {
    try {
        const response = await axios.get('/dentistas')

        if (!response || !response.data)
            return false;

        return response.data

    } catch (error) {
        console.error('Erro ao consultar dentistas:', error);
    }

    return false

}