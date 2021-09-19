import { faMarsDouble } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

let DateUtils = {
    relativeSinceDate: (d) => {
        return moment(d).fromNow();
    } 
}

export default DateUtils;
