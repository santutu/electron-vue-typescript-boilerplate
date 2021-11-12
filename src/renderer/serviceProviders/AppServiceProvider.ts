import {injectable} from "inversify";
import BaseServiceProvider from "./BaseServiceProvider";
import {container} from "../systems/container";
import SaveLoader from "../libs/saveLoader/SaveLoader";
import {IS_TEST} from "../systems/system_constants";
import StartStopManager from "../libs/startStopManager/StartStopManager";

@injectable()
export default class AppServiceProvider extends BaseServiceProvider {

    async register() {
        container.bind(StartStopManager).to(StartStopManager).inSingletonScope()
        container.bind(SaveLoader).toConstantValue(
            new SaveLoader(
                IS_TEST ? './tests/temp' : "./save"
            )
        )
    }


}