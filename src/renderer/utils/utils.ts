import path from "path";
import {ClassConstructor} from "class-transformer/types/interfaces";
import fs from "fs-extra";
import {deserialize, serialize} from "class-transformer";
import mv from "mv";

export function setDefaultProperty(defaultData: Object, ins: any) {

    //todo deep
    for (const key in defaultData) {
        if (ins[key] === undefined) {
            ins[key] = defaultData[key];
        }
    }

}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export function getExtension(filePath: string): string {
    const baseName = path.basename(filePath)

    return baseName.slice(baseName.indexOf("."))

}

export function jsonFileToClass<T>(cls: ClassConstructor<T>, jsonFilePath: string) {
    const rawJson = fs.readFileSync(jsonFilePath, {encoding: "utf-8"})
    return deserialize(cls, rawJson)

}

export function classToJsonFile(jsonFilePath: string, clsObj: any) {
    fs.writeFileSync(jsonFilePath, serialize(clsObj), {encoding: 'utf-8'})
}

export function changeExtension(filePath: string, extension: string): string {
    const baseName = path.basename(filePath)
    const dirName = path.dirname(filePath)
    const oriExtension = getExtension(baseName)

    const newFileName = baseName.replace(oriExtension, extension)

    return path.join(dirName, newFileName);


}

export function ensureDirectory(directory: string) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, {recursive: true});
        return true;
    }
    return false;
}

export function moveFile(filePath: string, distDirPath: string) {
    return new Promise((resolve, reject) => {
        try {
            const baseName = path.basename(filePath)

            ensureDirectory(distDirPath);

            const distFilePath = path.join(distDirPath, baseName);
            mv(filePath, distFilePath, (err) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(distFilePath);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}

export async function tryMoveFile(filePath: string, distDirPath: string): Promise<boolean> {
    try {
        await moveFile(filePath, distDirPath);
        return true;
    } catch (e) {
        return false;
    }

}

export async function moveFileIfExist(filePath: string, distDirPath: string) {
    if (fs.existsSync(filePath)) {
        await moveFile(filePath, distDirPath)
    }
}

export async function tryMoveFileIfExist(filePath: string, distDirPath: string): Promise<boolean> {
    try {
        await moveFileIfExist(filePath, distDirPath);
        return true;
    } catch (e) {
        return false;
    }
}

export function minusAPathFromBPath(aDirPath: string, bDirPath: string): string {
    const aDirPathArr = aDirPath.split(path.sep)
    const bDirPathArr = bDirPath.split(path.sep)

    return path.join(...aDirPathArr.slice(bDirPathArr.length))


}

