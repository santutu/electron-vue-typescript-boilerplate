import {injectable} from "inversify";
import BaseServiceRegister from "../base/BaseServiceRegister";
import {container} from "../../Container";
import SaveLoader from "../../lib/saveLoader/SaveLoader";
import {IS_TEST} from "../../system_constants";
import StartStopManager from "../../lib/startStopManager/StartStopManager";
import Validator from "../../lib/validator/Validator";

@injectable()
export default class AppServiceRegister extends BaseServiceRegister {


    async register() {
        container.bind(StartStopManager).to(StartStopManager).inSingletonScope()
        container.bind(SaveLoader).toConstantValue(
            new SaveLoader(
                IS_TEST ? './tests/temp' : "./save"
            )
        )

        container.bind(Validator).to(Validator).inSingletonScope();


    }


}