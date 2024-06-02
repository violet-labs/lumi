import moment from 'moment';

const filters = {
    dateDmy(value) {
        if (value)
            return moment(String(value)).format('DD/MM/YYYY')
    }
}
export default filters;