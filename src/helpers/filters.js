import moment from 'moment'
import * as utils from '../utils.js'

moment.locale('pt-br')

const filters = {
    howMuchTime(compareDate, options = {}) {

        if (!compareDate)
            return '-';

        console.log('compareDate1:', compareDate)

        const defaultOptions = {
            type: 'datetime',
            compareTo: new Date(),
            prefix: true,
        }

        options = {
            ...defaultOptions,
            ...options
        }

        // ---------------

        let { compareTo, type, prefix } = options

        if (typeof compareDate == 'string')
            if (type == 'date')
                compareDate = new Date(compareDate + 'T00:00:00')
            else if (type == 'datetime')
                compareDate = new Date(compareDate)

        if (typeof compareTo == 'string')
            compareTo = new Date(compareTo)

        // ---------------

        const interval = timeInterval(compareDate, compareTo)
        console.log('interval:', timeInterval(new Date('2024-09-18T00:00:00'), new Date('2024-09-18T00:01:00')))
        const diferencaEmMilissegundos = compareDate - compareTo
        const { years: anos, months: meses, days, hours, minutes, seconds } = interval
        const futuro = (diferencaEmMilissegundos >= 0)

        if (type == 'date' && diferencaEmMilissegundos == 0)
            return 'hoje'

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

        if (anos == 0 && meses == 0 && days > 0) {
            if (days < 1 && type == 'date')
                return 'hoje'
            else if (days < 1) {
                if (hours > 0) {
                    resposta.push(hours + ' hora' + (hours > 1 ? 's' : ''));
                } else if (minutes > 0) {
                    resposta.push(minutes + ' minuto' + (minutes > 1 ? 's' : ''));
                } else {
                    // resposta.push(seconds + ' segundo' + (seconds > 1 ? 's' : ''));
                    resposta.push('poucos segundos');
                }
            }
            else if (days >= 1 && days < 2) {
                if (futuro)
                    resposta = ['amanhã']
                else
                    resposta = ['ontem']
            }
            else {
                const roundDays = Math.floor(days)
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
    dateTime(value, beautify = true) {
        if (!value)
            return '-'

        let format

        if (beautify)
            format = 'DD/MM/YYYY, à\\s HH:mm\\h'
        else
            format = 'DD/MM/YYYY HH:mm'

        return moment(String(value)).format(format)
    },
}

function timeInterval(date1, date2) {
    if (date1 > date2) { // swap
        var result = timeInterval(date2, date1);
        result.years = -result.years;
        result.months = -result.months;
        result.days = -result.days;
        return result;
    }
    var diffMs = date2.getTime() - date1.getTime();
    var diffDays = diffMs / (1000 * 3600 * 24); // convert milliseconds to days
    result = {
        years: date2.getYear() - date1.getYear(),
        months: date2.getMonth() - date1.getMonth(),
        days: diffDays
    };
    if (result.days < 0) {
        result.months--;
        // days = days left in date1's month, 
        //   plus days that have passed in date2's month
        var copy1 = new Date(date1.getTime());
        copy1.setDate(32);
        result.days = 32 - date1.getDate() - copy1.getDate() + date2.getDate() + (diffMs % (1000 * 3600 * 24)) / (1000 * 3600 * 24);
    }
    if (result.months < 0) {
        result.years--;
        result.months += 12;
    }

    
    result.hours = Math.floor(result.days * 24);
    result.minutes = Math.floor((result.days * 24 - result.hours) * 60);
    result.seconds = Math.floor(((result.days * 24 - result.hours) * 60 - result.minutes) * 60);

    return result;
}

export default filters