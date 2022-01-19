import ISaveLoadable from "../../systems/lib/saveLoader/ISaveLoadable";
import {Exclude} from "class-transformer";
import DirConstants from "../../systems/constants/DirConstants";


export default class PathConfig implements ISaveLoadable {

    @Exclude()
    saveLoadFileName: string = "PathConfig";

    tempDirPath = DirConstants.DEFAULT_TEMP_DIR;


}