import Vue from 'vue'
import authStore from "../store/modules/authStore";
import {enumToArray, factory} from "../utils/utils";
import {Enum} from "./types";
import Validator from "../systems/lib/validator/Validator";
import {IS_DEV, IS_PROD} from "../systems/system_constants";
import * as path from "path";
import {PathSolver} from "../systems/lib/PathSolver";


export const registerVueGlobalVariables = function () {
    Vue.prototype.$isDev = IS_DEV;
    Vue.prototype.$isProd = IS_PROD;
    Vue.prototype.$authStore = authStore
    Vue.prototype.$log = function (value: any) {
        console.log(value)
    }

    Vue.prototype.$test = function () {
        console.log('this is test message')
    }

    Vue.prototype.$enumToArray = function <E>(enumIdentify: Enum<E>) {
        return enumToArray(enumIdentify)
    }
    Vue.prototype.$validator = factory(Validator);

    Vue.prototype.$path = path;
    Vue.prototype.$pathSolver = PathSolver

}
