export function getTratamentoProgresso(data_inicio_tratamento, data_final_previsa) {
    if (!data_inicio_tratamento || !data_final_previsa)
        return '-';

    const inicio = new Date(data_inicio_tratamento);
    const termino = new Date(data_final_previsa);
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