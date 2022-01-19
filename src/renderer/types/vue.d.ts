import {AuthStore} from "../store/modules/authStore";
import {Enum} from "./types";
import Validator from "../systems/lib/validator/Validator";
import path from "path";
import {PathSolver} from "../systems/lib/PathSolver";

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
        $authStore: AuthStore,
        $test: () => void,
        $log: (value: any) => void,
        $enumToArray: <E>(enumIdentify: Enum<E>) => (string | number)[],
        $validator: Validator
        $path: typeof path
        $pathSolver: typeof PathSolver
    }
}
