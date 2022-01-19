import BaseCommand from "./BaseCommand";
import {sleep} from "../utils/utils";

export default class SleepCommand extends BaseCommand {
    constructor(
        private readonly sleepMs: number
    ) {
        super();
    }

    _defineExecute = async () => {
        await sleep(this.sleepMs);
    };

}