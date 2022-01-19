import {serviceBootClasses, serviceRegisterClasses} from "./config/app";
import GlobalWebContents from "./GlobalWebContents";
import {injectable} from "inversify";
import {IS_DEV} from "./system_constants";
import {factory} from "../utils/utils";
import {container} from "./Container";

@injectable()
export default class InitializeApp {


    async init() {
        await this.registerService();
        await this.bootService()

        if (IS_DEV) {
            (new GlobalWebContents()).registerContextMenu();
        }
    }

    public async registerService() {
        for (const registerClass of serviceRegisterClasses) {
            const serviceRegister = factory(registerClass)
            await serviceRegister.register();
        }
    }


    public async bootService() {
        for (const bootClass of serviceBootClasses) {
            const serviceBoot = factory(bootClass)
            await serviceBoot.boot();
        }
    }

    public clearServiceRegister() {
        container.unbindAll();
    }
}