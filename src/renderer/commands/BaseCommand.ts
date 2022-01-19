import {injectable} from "inversify";
import Validator from "../systems/lib/validator/Validator";
import {factory} from "../utils/utils";
import Event from "../systems/lib/Event";


@injectable()
export default abstract class BaseCommand<ReturnType = any> {

    onProceed: Event = new Event();
    onEnded: Event = new Event();
    validator: Validator = factory(Validator)

    abstract _defineExecute(): Promise<ReturnType>;

    execute = async (): Promise<ReturnType> => {
        // this._log('start');
        const results = await this._defineExecute();
        this.onEnded.invoke({command: this, results});
        // this._log('ended');
        return results;
    }

    private _log(prefix: string) {
        const commandName = this.constructor.name
        const ignoreCommands = ["QueueCommand"];
        if (!ignoreCommands.includes(commandName)) {
            console.log(`${prefix} ${commandName}`)
        }
    }
}