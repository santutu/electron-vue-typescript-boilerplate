import fs from "fs-extra";
import {classToPlain, plainToClass} from "class-transformer";
import path from "path";
import ISaveLoadable from "./ISaveLoadable";
import {injectable} from "inversify";

@injectable()
export default class SaveLoader {


    constructor(
        public saveDirPath: string
    ) {
        this.ensureSaveDir();
    }

    private ensureSaveDir() {
        fs.ensureDirSync(this.saveDirPath);
    }

    private getSaveFilePath(fileName: string): string {

        if (!fileName.endsWith(".json")) {
            fileName += ".json"
        }

        return path.join(this.saveDirPath, fileName)
    }

    async save(ins: ISaveLoadable) {
        await fs.writeJSON(this.getSaveFilePath(ins.saveLoadFileName), classToPlain(ins));
    }


    async load<T>(ins: ISaveLoadable): Promise<T> {
        const saveFilePath = this.getSaveFilePath(ins.saveLoadFileName);
        if (!fs.existsSync(saveFilePath)) {
            return ins as any
        }
        const json = await fs.readJSON(saveFilePath)
        return plainToClass((ins as any).constructor, json as object)
    }

}