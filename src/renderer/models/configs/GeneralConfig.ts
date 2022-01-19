import ISaveLoadable from "../../systems/lib/saveLoader/ISaveLoadable";
import {Exclude} from "class-transformer";


export default class GeneralConfig implements ISaveLoadable {

    @Exclude()
    saveLoadFileName: string = "GeneralConfig";


}