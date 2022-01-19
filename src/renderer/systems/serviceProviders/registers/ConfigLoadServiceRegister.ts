import BaseServiceRegister from "../base/BaseServiceRegister";
import {container} from "../../Container";
import SaveLoader from "../../lib/saveLoader/SaveLoader";
import {injectable} from "inversify";
import {ClassConstructor} from "class-transformer/types/interfaces";
import ISaveLoadable from "../../lib/saveLoader/ISaveLoadable";
import {factory, setDefaultProperty} from "../../../utils/utils";
import GeneralConfig from "../../../models/configs/GeneralConfig";
import PathConfig from "../../../models/configs/PathConfig";


@injectable()
export default class ConfigLoadServiceRegister extends BaseServiceRegister {

    private configClasses: ClassConstructor<ISaveLoadable>[] = [
        GeneralConfig,
        PathConfig,
    ]

    async register() {
        const saveLoader = factory(SaveLoader)

        for (const configClass of this.configClasses) {
            const config = await saveLoader.load(new configClass())


            if ((configClass as any).default) {
                setDefaultProperty((configClass as any).default, config)
            }

            container.bind(configClass).toConstantValue(config)
        }
    }


}