import BaseServiceBoot from "../base/BaseServiceBoot";
import RootData from "../../../models/RootData";
import {injectable} from "inversify";

@injectable()
export class RootDataServiceBoot extends BaseServiceBoot {

    constructor(
        private readonly rootData: RootData
    ) {
        super();

    }

    boot() {
    }

}