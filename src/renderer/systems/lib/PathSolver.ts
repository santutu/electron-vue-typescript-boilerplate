import * as Path from "path";
import path from "path";

export class PathSolver {


    /**
     * PathSolver.drive("D:/Program Files") //output "D:"
     * @param path
     */
    static drive(path: string): string {

        const lastIdx = path.indexOf(":");
        if (lastIdx === -1) {
            throw new Error(`${path} is wrong path.`)
        }

        return path.slice(0, lastIdx + 1);
    }


    static fileSrc(src: string): string {
        if (!path.isAbsolute(src)) {
            src = path.resolve(src);
        }
        return `file://${src}`;
    }

    static renameFromFilePath(filePath: string, fileName: string): string {

        const ext = Path.extname(filePath)
        const dirname = Path.dirname(filePath)

        return Path.join(dirname, `${fileName}${ext}`);
    }

}