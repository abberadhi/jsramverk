import moment from 'moment';

let DateUtils = {
    relativeSinceDate: (d) => {
        if (typeof d == "number") return moment(d).fromNow();

        return moment(d).fromNow();
    } 
}

export default DateUtils;
