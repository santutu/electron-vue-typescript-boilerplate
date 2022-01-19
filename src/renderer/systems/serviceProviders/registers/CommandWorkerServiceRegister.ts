import BaseServiceRegister from "../base/BaseServiceRegister";
import {container} from "../../Container";
import CommandWorker from "../../../commands/CommandWorker";
import {injectable} from "inversify";

@injectable()
export default class CommandWorkerServiceRegister extends BaseServiceRegister {
    register() {
        container.bind(CommandWorker).toSelf().inSingletonScope();
    }

}