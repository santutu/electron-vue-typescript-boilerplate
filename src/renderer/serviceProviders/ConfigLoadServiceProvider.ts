import BaseServiceProvider from "./BaseServiceProvider";
import {container} from "../systems/container";
import SaveLoader from "../libs/saveLoader/SaveLoader";
import {injectable} from "inversify";
import {ClassConstructor} from "class-transformer/types/interfaces";
import ISaveLoadable from "../libs/saveLoader/ISaveLoadable";
import {setDefaultProperty} from "../utils/utils";
import GeneralConfig from "../models/configs/GeneralConfig";


@injectable()
export default class ConfigLoadServiceProvider extends BaseServiceProvider {

    configClasses: ClassConstructor<ISaveLoadable>[] = [
        GeneralConfig,
    ]

    async register() {
        const saveLoader = container.get(SaveLoader)

        for (const configClass of this.configClasses) {
            const config = await saveLoader.load(new configClass())


            if ((configClass as any).default) {
                setDefaultProperty((configClass as any).default, config)
            }

            container.bind(configClass).toConstantValue(config)
        }
    }


}