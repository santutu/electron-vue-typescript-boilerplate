import {serviceProviderClasses} from "../configs/app";
import {container} from "./container";
import GlobalWebContents from "./GlobalWebContents";
import {injectable} from "inversify";
import {IS_DEV} from "./system_constants";

@injectable()
export default class InitializeApp {

    static isOnceRegisterServiceProviders = false;

    async init() {
        await this.registerServiceProviders();
        if (IS_DEV) {
            (new GlobalWebContents()).registerContextMenu();
        }
    }

    protected async registerServiceProviders() {
        for (const serviceProviderClass of serviceProviderClasses) {
            const serviceProvider = container.get(serviceProviderClass)
            await serviceProvider.register();
        }
        InitializeApp.isOnceRegisterServiceProviders = true
    }
}