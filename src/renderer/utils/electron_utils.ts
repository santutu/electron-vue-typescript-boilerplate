import {remote} from "electron";
import fs from "fs-extra"
import CancelOpenFileException from "../exceptions/CancelOpenFileException";

export async function getJsonByDialog(): Promise<object> {
    const results = await remote.dialog.showOpenDialog({
                                                           properties: ['openFile'],
                                                           filters: [{extensions: ["json"], name: "json"}]
                                                       });

    if (results.canceled) {
        throw new CancelOpenFileException();
    }

    if (results && results.filePaths.length > 0) {
        return await fs.readJSONSync(results.filePaths[0])
    }

    throw new CancelOpenFileException();
}

export async function getToSaveJsonFilePath() {
    const results = await remote.dialog.showSaveDialog({
                                                           properties: ['createDirectory', 'showOverwriteConfirmation'],
                                                           filters: [{extensions: ["json"], name: "json"}]
                                                       });
    if (results.canceled) {
        throw new CancelOpenFileException();
    }

    if (results && results.filePath) {
        return results.filePath
    }

    throw new CancelOpenFileException();

}