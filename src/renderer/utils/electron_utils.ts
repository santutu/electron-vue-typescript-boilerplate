import {remote, shell} from "electron";
import CancelOpenFileError from "../systems/errors/CancelOpenFileError";
import * as path from "path";

export async function selectDirByDialog(title: string, defaultPath: string): Promise<string> {

    if (!path.isAbsolute(defaultPath)) {
        defaultPath = path.resolve(defaultPath);
    }

    const results = await remote.dialog.showOpenDialog({
                                                           title,
                                                           defaultPath,
                                                           properties: ['openDirectory'],
                                                       });

    if (results.canceled) {
        throw new CancelOpenFileError();
    }

    if (results && results.filePaths.length > 0) {
        return results.filePaths[0]
    }

    throw new CancelOpenFileError();
}

export async function selectJsonFileByDialog(): Promise<string> {
    const results = await remote.dialog.showOpenDialog({
                                                           properties: ['openFile'],
                                                           filters: [{extensions: ["json"], name: "json"}]
                                                       });

    if (results.canceled) {
        throw new CancelOpenFileError();
    }

    if (results && results.filePaths.length > 0) {
        return results.filePaths[0]
    }

    throw new CancelOpenFileError();
}

export async function getToSaveJsonFilePath() {
    const results = await remote.dialog.showSaveDialog({
                                                           properties: ['createDirectory', 'showOverwriteConfirmation'],
                                                           filters: [{extensions: ["json"], name: "json"}]
                                                       });
    if (results.canceled) {
        throw new CancelOpenFileError();
    }

    if (results && results.filePath) {
        return results.filePath
    }

    throw new CancelOpenFileError();

}

export async function getToSaveDirPath(title: string, defaultPath: string) {
    const results = await remote.dialog.showSaveDialog({
                                                           title,
                                                           defaultPath,
                                                           properties: ['createDirectory', 'showOverwriteConfirmation'],
                                                           filters: [{extensions: [""], name: "Directory"}]
                                                       });
    if (results.canceled) {
        throw new CancelOpenFileError();
    }

    if (results && results.filePath) {
        return results.filePath
    }

    throw new CancelOpenFileError();

}

export function showItemInFolder(Path: string) {
    if (!path.isAbsolute(Path)) {
        Path = path.resolve(Path);
    }

    shell.showItemInFolder(Path)
}