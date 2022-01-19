import {v4 as uuidv4} from 'uuid';
import path from "path";
import {ClassConstructor} from "class-transformer/types/interfaces";
import fs from "fs-extra";
import {deserialize, serialize} from "class-transformer";
import mv from "mv";
import {container} from "../systems/Container";
import {interfaces} from "inversify/lib/interfaces/interfaces";
import {Enum} from "../types/types";
import {PathSolver} from "../systems/lib/PathSolver";
import * as Path from "path";

export function factory<T>(cls: interfaces.ServiceIdentifier<T>): T {
    return container.get(cls);
}

export function setDefaultProperty(defaultData: Object, ins: any) {

    //todo deep
    for (const key in defaultData) {
        if (ins[key] === undefined) {
            ins[key] = defaultData[key];
        }
    }

}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function sleepInterval(ms: number, cb: (past: number, wait: number) => void) {
    let current = 0;
    let interval = 1000

    while (current < ms) {
        current += interval;
        await sleep(interval);
        cb(current, ms);
    }
}


export function getExtension(filePath: string): string {
    const baseName = path.basename(filePath)

    return baseName.slice(baseName.indexOf("."))

}

export function jsonFileToClass<T>(cls: ClassConstructor<T>, jsonFilePath: string) {
    const rawJson = fs.readFileSync(jsonFilePath, {encoding: "utf-8"})
    return deserialize(cls, rawJson)

}

export function jsonFileToPlain(jsonFilePath: string) {
    const rawJson = fs.readFileSync(jsonFilePath, {encoding: "utf-8"})
    return JSON.parse(rawJson);

}

export function classToJsonFile(jsonFilePath: string, clsObj: any) {
    ensureDirectory(path.dirname(jsonFilePath));
    fs.writeFileSync(jsonFilePath, serialize(clsObj), {encoding: 'utf-8'})

    return jsonFilePath
}

export function changeExtension(filePath: string, extension: string): string {
    const baseName = path.basename(filePath)
    const dirName = path.dirname(filePath)
    const oriExtension = getExtension(baseName)

    const newFileName = baseName.replace(oriExtension, extension)

    return path.join(dirName, newFileName);
}

export function moveFileOrDir(filePath: string, newFilePath: string): Promise<string> {
    const dirname = path.dirname(newFilePath)
    if (!fs.existsSync(dirname)) {
        ensureDirectory(dirname)
    }
    return new Promise((resolve, reject) => {
        mv(filePath, newFilePath, (err) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(newFilePath);
            }
        });
    });
}

export function moveFileToDir(filePath: string, distDirPath: string) {
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


export function renameFile(filePath: string, newName: string) {
    const newFilePath = PathSolver.renameFromFilePath(filePath, newName);
    fs.renameSync(filePath, newFilePath)
    return newFilePath
}

export function ensureDirectory(directory: string) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, {recursive: true});
        return true;
    }
    return false;
}


export async function tryMoveFile(filePath: string, distDirPath: string): Promise<boolean> {
    try {
        await moveFileToDir(filePath, distDirPath);
        return true;
    } catch (e) {
        return false;
    }

}

export async function moveFileIfExist(filePath: string, distDirPath: string) {
    if (fs.existsSync(filePath)) {
        await moveFileToDir(filePath, distDirPath)
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

export function ensureDirAndFileName(name: string) {
    return name.replace(/\//gi, '-')
        .replace(/\\/gi, ' ')
        .replace(/;/gi, ' ')
        .replace(/\*/gi, ' ')
        .replace(/\?/gi, ' ')
        .replace(/"/gi, ' ')
        .replace(/</gi, ' ')
        .replace(/>/gi, ' ')
        .replace(/\|/gi, ' ')
        .replace(/:/gi, ' ')
}

export function minusAPathFromBPath(aDirPath: string, bDirPath: string): string {
    const aDirPathArr = aDirPath.split(path.sep)
    const bDirPathArr = bDirPath.split(path.sep)

    return path.join(...aDirPathArr.slice(bDirPathArr.length))


}


export function uuid(): string {
    return uuidv4()
}

export function enumToArray<E>(enumIdentify: Enum<E>): (string | number)[] {
    return Object.values(enumIdentify);

}

export function hasValueOnEnum<E>(enum1: Enum<E>, val: any) {
    return (<any>Object).values(enum1).includes(val)
}

export function decodeUnicode(unicodeString) {
    var r = /\\u([\d\w]{4})/gi;
    unicodeString = unicodeString.replace(r, function (match, grp) {
        return String.fromCharCode(parseInt(grp, 16));
    });
    return unescape(unicodeString);
}

export function encodeUnicode(convertString) {
    var unicodeString = '';
    for (var i = 0; i < convertString.length; i++) {
        var theUnicode = convertString.charCodeAt(i).toString(16).toUpperCase();
        while (theUnicode.length < 4) {
            theUnicode = '0' + theUnicode;
        }
        theUnicode = '\\u' + theUnicode;
        unicodeString += theUnicode;
    }
    return unicodeString;
}


export function secondsToHms(seconds: number): string {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}

export function percentage(v1: number, v2: number) {
    const value = v1 === 0 || v2 === 0 ? 1 : v1 / v2
    return Math.round(value * 10) / 10
}


export async function sleepUntilCondition(
    millis: number,
    cb: (currentMillis: number) => Promise<boolean>
): Promise<boolean> {
    let currentMillis = 0;
    let result: boolean;
    while (!(result = await cb(currentMillis)) && millis > currentMillis) {
        await sleep(1000);
        currentMillis += 1000;
    }

    return result;
}


export async function moveDir(dirPath: string, destPath: string) {
    if (fs.existsSync(destPath)) {
        throw new Error(`${destPath} is already exist.`);
    }

    await fs.move(dirPath, destPath);
}


export async function inTempFile<T>(
    filePath: string,
    cb: (tempOriginalPath: string) => T,
    option: { autoRemove: boolean } = {autoRemove: false}
) {
    const tempOriginalPath = renameFile(filePath, uuid());
    try {

        const results = await cb(tempOriginalPath)

        if (option.autoRemove) {
            fs.removeSync(tempOriginalPath)
        }
        return results

    } catch (e) {
        if (fs.existsSync(tempOriginalPath) && !fs.existsSync(filePath)) {
            fs.renameSync(tempOriginalPath, filePath)
        }
        throw e
    }

}