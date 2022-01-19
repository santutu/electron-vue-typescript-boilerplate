import BaseServiceBoot from "../base/BaseServiceBoot";
import fs from "fs-extra";
import {injectable} from "inversify";
import {IS_PROD} from "../../system_constants";
import PathConfig from "../../../models/configs/PathConfig";


@injectable()
export default class EmptyTempFileServiceBoot extends BaseServiceBoot {

    constructor(
        private readonly pathConfig: PathConfig
    ) {
        super();
    }

    boot() {
        //todo
        if (IS_PROD) {
            fs.removeSync(this.pathConfig.tempDirPath);
        }
    }


}