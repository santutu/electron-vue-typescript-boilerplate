import ISaveLoadable from "../../libs/saveLoader/ISaveLoadable";
import {Exclude} from "class-transformer";


export default class GeneralConfig implements ISaveLoadable {

    @Exclude()
    saveLoadFileName: string = "GeneralConfig";


}