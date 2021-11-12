import Vue from 'vue'
import {isDev, isProd} from "../../helpers/helpers";
import authStore from "../store/modules/authStore";

Vue.prototype.$isDev = isDev;
Vue.prototype.$isProd = isProd;
Vue.prototype.$authStore = authStore

Vue.prototype.$test = function () {
    console.log('this is test message')
}
