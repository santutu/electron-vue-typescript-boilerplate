import {injectable} from "inversify";

type Option = {
    minMax: 'MIN' | 'MAX',
}

@injectable()
export default class ExternalCommandLine {

    private cmd = require("node-cmd");

    execute(command: string, option: Option) {

        return this.cmd.run(`start /${option.minMax} cmd /k ${command}`);
    }

}