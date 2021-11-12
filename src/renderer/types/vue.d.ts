import Vue from "vue";
import {AuthStore} from "../store/modules/authStore";

declare module 'vue/types/vue' {

    interface Vue {
        $localStorage: {
            get: (key: string, defaultValue?: any, defaultType?: any) => any,
            set: (key: string, value: any) => any
            remove: (key: string) => any
            addProperty: (key: string, type: any, defaultValue?: any) => any
        }

        $isDev: boolean,
        $isProd: boolean,
        $authStore : AuthStore,
        $test: () => void,
    }
}
