import Vue from 'vue'
import moment from "moment";
import _ from "lodash"

Vue.filter('uppercase', function (value: string) {
    return value.toUpperCase();
});

Vue.filter('fromNow', function (value: string) {
    const datetime = moment(value)
    return datetime.fromNow()
});

Vue.filter('comma', function (value: number | any[]) {
    if (Array.isArray(value)) {
        return value.join(', ')
    }
    return value.toLocaleString()
});


Vue.filter('br', function (value: string) {
    return _.replace(value, new RegExp("\n", "g"), "<br>")
});


