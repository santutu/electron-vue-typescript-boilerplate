import Vue from 'vue'
const VueLocalStorage = require('vue-localstorage');


Vue.use(VueLocalStorage);
Vue.use(VueLocalStorage, {
    name: 'ls',
    bind: true //created computed members from your variable declarations
});
