import {injectable} from "inversify";
import BaseServiceRegister from "../base/BaseServiceRegister";
import {container} from "../../Container";
import RootData from "../../../models/RootData";


@injectable()
export default class RootDataServiceRegister extends BaseServiceRegister {

    async register() {

        container.bind(RootData).toSelf().inSingletonScope();

    }


}