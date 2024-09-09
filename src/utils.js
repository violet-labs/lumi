export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function phoneMask(phone) {
    if (!phone || typeof phone != 'string')
        return ''

    phone = phone.replace(/\D+/g, '');
    const phoneLength = phone.length

    let phoneMask = null
    if (phoneLength <= 8)
        phoneMask = '####-#####'
    if (phoneLength == 9)
        phoneMask = '#####-#####'
    else if (phoneLength == 10)
        phoneMask = '(##) ####-#####'
    else if (phoneLength >= 11)
        phoneMask = '(##) #####-####'

    return phoneMask
}

export function getTratamentoProgresso(data_inicio_tratamento, data_final_prevista) {
    if (!data_inicio_tratamento || !data_final_prevista)
        return '-';

    const inicio = new Date(data_inicio_tratamento);
    const termino = new Date(data_final_prevista);
    const hoje = new Date();

    if (hoje < inicio)
        return 0.00;
    if (hoje > termino)
        return 100.00;

    const duracaoTotal = termino.getTime() - inicio.getTime();
    const duracaoAteHoje = hoje.getTime() - inicio.getTime();

    const progresso = (duracaoAteHoje / duracaoTotal) * 100;

    return parseFloat(progresso.toFixed(2));
}

export function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}