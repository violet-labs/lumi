import moment from 'moment';

moment.locale('pt')

const filters = {
    dateDmy(value) {
        if (value)
            return moment(String(value)).format('DD/MM/YYYY')
    },
    dateYearsMonths(data) {
        if (!data)
            return ''
        
        data = new Date(data)

        const dataAtual = Date.now();
        const diferencaEmMilissegundos = dataAtual - data;
        const anosEmMilissegundos = 31536000000;
        const mesesEmMilissegundos = anosEmMilissegundos / 12;

        const anos = Math.floor(diferencaEmMilissegundos / anosEmMilissegundos);
        const mesesRestantes = Math.floor((diferencaEmMilissegundos % anosEmMilissegundos) / mesesEmMilissegundos);

        const saida = `${anos} anos e ${mesesRestantes} meses`;

        return saida;
    },
}
export default filters;