import * as Path from "path";
import {uuid} from "../../utils/utils";


export class RelativePath {
    rootPathId!: string;
    path!: string


    constructor(rootPathId: string, path: string) {
        this.rootPathId = rootPathId
        this.path = path;
    }

    join(...paths: string[]): RelativePath {
        return new RelativePath(this.rootPathId, Path.join(this.path, ...paths))
    }
}

export default class RootPath {

    private id = uuid()

    public path: string;

    constructor(path: string) {
        if (path !== undefined && !Path.isAbsolute(path)) {
            throw new Error(`${path} must be absolute path`);
        }
        this.path = path;
    }


    resolve(path: RelativePath): string {
        if (path.rootPathId !== this.id) {
            throw new Error(`No equals "wd id"`);
        }

        return this.resolveRaw(path.path)
    }

    resolveRaw(path: string): string {
        if (Path.isAbsolute(path)) {
            throw new Error(`path parameter must be relative path.`)
        }

        return this.makeAbsolute(Path.join(this.path, path));
    }

    createRelativePath(relativePath: string): RelativePath {
        if (Path.isAbsolute(relativePath)) {
            throw new Error(`${relativePath} must not be absolute.`)
        }

        return new RelativePath(this.id, relativePath)
    }


    relative(pathOnCwd: string): RelativePath {

        return new RelativePath(this.id, this.relativeRaw(pathOnCwd))
    }


    relativeRaw(pathOnCwd: string): string {
        pathOnCwd = this.makeAbsolute(pathOnCwd)
        return Path.relative(this.path, pathOnCwd)
    }


    private makeAbsolute(path: string): string {
        if (!Path.isAbsolute(path)) {
            path = Path.resolve(path);
        }

        return path;
    }


}