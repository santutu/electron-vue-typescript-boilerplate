import BaseServiceBoot from "../base/BaseServiceBoot";
import {injectable} from "inversify";
import PathConfig from "../../../models/configs/PathConfig";
import {ensureDirectory} from "../../../utils/utils";


@injectable()
export default class AppInitializationServiceBoot extends BaseServiceBoot {

    constructor(
        private readonly pathConfig: PathConfig
    ) {
        super();
    }

    async boot() {
        await ensureDirectory(this.pathConfig.tempDirPath)
    }


}