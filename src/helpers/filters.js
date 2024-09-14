import moment from 'moment'
import * as utils from '../utils.js'

moment.locale('pt')

const filters = {
    howMuchTime(dataOuString, compareToDate, prefix = true) {
        if (!dataOuString)
            return '-';

        const data = new Date(dataOuString)

        const diferencaEmMilissegundos = data - compareToDate

        if (diferencaEmMilissegundos == 0)
            return 'hoje'

        var startMillis = data.getTime()
        var endMillis = compareToDate.getTime()

        var difference = endMillis - startMillis
        var daysDifference = Math.abs(difference / (1000 * 60 * 60 * 24))

        var anos = Math.abs(Math.floor(daysDifference / 365))

        var remainingDays = daysDifference % 365

        var meses = Math.abs(Math.floor(remainingDays / 30))

        const futuro = (diferencaEmMilissegundos >= 0)

        let resposta = []

        if (prefix) {
            if (futuro)
                resposta.push('em') // Futuro
            else
                resposta.push('há') // Passado
        }

        if (anos > 1)
            resposta.push(`${anos} anos`)
        else if (anos > 0)
            resposta.push(`${anos} ano`)

        if (anos > 0 && meses > 0)
            resposta.push('e')

        if (meses > 1)
            resposta.push(`${meses} meses`)
        else if (meses > 0)
            resposta.push(`${meses} mês`)


        if (anos == 0 && meses == 0 && remainingDays > 0) {
            if (remainingDays < 1) {
                let hours = Math.floor(remainingDays * 24);
                let minutes = Math.floor((remainingDays * 24 - hours) * 60);
                let seconds = Math.floor(((remainingDays * 24 - hours) * 60 - minutes) * 60);
            
                if (hours > 0) {
                    resposta.push(hours + ' hora' + (hours > 1 ? 's' : ''));
                } else if (minutes > 0) {
                    resposta.push(minutes + ' minuto' + (minutes > 1 ? 's' : ''));
                } else {
                    resposta.push(seconds + ' segundo' + (seconds > 1 ? 's' : ''));
                }
            }
            else if (remainingDays >= 1 && remainingDays < 2) {
                if (futuro)
                    resposta = ['amanhã']
                else
                    resposta = ['ontem']
            }
            else {
                const roundDays = Math.floor(remainingDays)
                resposta.push(`${roundDays} dias`)
            }
        }

        return resposta.join(' ')
    },
    dateDmy(value) {
        if (!value)
            return '-'
        return moment(String(value)).format('DD/MM/YYYY')
    },
    dateDDY(value) {
        if (!value)
            return '-'
        return utils.capitalizeFirst(moment(String(value)).format('MMMM/YYYY'))
    },
    dateTime(value) {
        if (!value)
            return '-'

        return moment(String(value)).format('DD/MM/YYYY HH:mm')
    },
}
export default filters