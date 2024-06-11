import moment from 'moment'
import * as utils from './utils.js'

moment.locale('pt')

const filters = {
    howMuchTime(dataOuString, compareTo, prefix = true) {
        const data = new Date(dataOuString)
        const compareToDate = new Date(compareTo)

        const diferencaEmMilissegundos = data - compareToDate

        var startMillis = data.getTime()
        var endMillis = compareToDate.getTime()

        var difference = endMillis - startMillis
        var daysDifference = difference / (1000 * 60 * 60 * 24)

        var anos = Math.abs(Math.floor(daysDifference / 365))

        var remainingDays = daysDifference % 365

        var meses = Math.abs(Math.floor(remainingDays / 30))

        const resposta = []

        if (prefix) {
            if (diferencaEmMilissegundos >= 0)
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

        return resposta.join(' ')
    },
    dateDmy(value) {
        if (value)
            return moment(String(value)).format('DD/MM/YYYY')
    },
    dateDDY(value) {
        if (value)
            return utils.capitalizeFirst(moment(String(value)).format('MMMM/YYYY'))
    },
}
export default filters