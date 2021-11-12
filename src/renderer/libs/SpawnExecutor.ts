import {injectable} from "inversify";
import {ChildProcess, spawn} from "child_process"

@injectable()
export default class SpawnExecutor {

    constructor() {

    }

    async execute(fileName: string, ...args: string[]) {
        const child = await this.executeChild(fileName, ...args)
        await this.waitChild(child);
        return child
    }

    private async waitChild(child: ChildProcess | any): Promise<void> {

        return await new Promise((resolve, reject) => {
            child.stdout.on('data', (data) => {
                console.log('data', data.toString());
            });
            //
            //
            // child.stderr.on('data', (data) => {
            //     console.error(`child stderr:\n${data}`);
            // });

            // child.on('message', (message, sendHandle) => {
            //     console.log('message', message);
            //     console.log('message', sendHandle)
            // });

            child.on('exit', (code, signal) => {
                console.log('exit', code);
                console.log('exit', signal);
                resolve();
            });

            child.on('close', code => {
                console.log('close', code);
                resolve();
            });

            child.on('error', err => {
                console.log('ererer', err);
                reject();
            });

        });


    }

    private async executeChild(fileName: string, ...args: string[]) {

        const child = spawn(`${fileName}`, [...args]);
        // child.kill
        child.stdout.on('data', (data) => {
            console.log('data', data.toString());
        });


        child.stderr.on('data', (data) => {
            console.log(`child stderr:\n${data}`);
        });

        return child

    }


}