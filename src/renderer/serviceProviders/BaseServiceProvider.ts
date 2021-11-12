import {injectable} from "inversify";

@injectable()
export default abstract class BaseServiceProvider {


    abstract register()
}

