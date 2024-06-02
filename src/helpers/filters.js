import moment from 'moment';

const filters = {
    dateDmy(value) {
        if (value)
            return moment(String(value)).format('MM/DD/YYYY')
    }
}
export default filters;