import {injectable} from "inversify";
import {ChildProcess, ChildProcessWithoutNullStreams, spawn} from "child_process"
import Event from "./Event";

@injectable()
export default class SpawnExecutor {

    constructor() {
        this.addLogListener();
    }

    onMessage = new Event<{ message: string, sendHandle }>();
    onStdOutData = new Event<{ data }>();
    onError = new Event<{ err }>();
    onStdErrorData = new Event<{ data }>();
    onClose = new Event<{ code }>();
    onExit = new Event<{ code, signal }>();

    private output = "";

    addLogListener() {
        this.onStdOutData.addListener(({data}) => {
            console.log('onStdOutData', data.toString());
        })

        this.onStdOutData.addListener(({data}) => {
            this.output += data.toString();
        })
        this.onMessage.addListener(({message, sendHandle}) => {
            console.log('onMessage', message);
        })


        this.onError.addListener(({err}) => {
            console.log('onError', err.toString());
        })

        this.onStdErrorData.addListener(({data}) => {
            console.log('onStdErrorData', data.toString());
        })
    }


    async executeAndWait(fileName: string, ...args: string[]): Promise<string> {
        this.output = ""

        const child = await this.execute(fileName, ...args)
        await this.waitProcess(child);
        return this.output;
    }

    async execute(fileName: string, ...args: string[]): Promise<ChildProcessWithoutNullStreams> {

        const child = spawn(`${fileName}`, [...args]);

        child.stdout.on('data', (data) => {
            this.onStdOutData.invoke({data});
        });


        child.on('message', (message, sendHandle) => {
            this.onMessage.invoke({
                                      message, sendHandle
                                  });

        });

        return child

    }


    async waitProcess(child: ChildProcess | any): Promise<void> {

        return await new Promise((resolve, reject) => {

            child.on('exit', (code, signal) => {
                this.onExit.invoke({code, signal})
                // console.log('exit', code);
                // console.log('exit', signal);
                resolve();
            });

            child.on('close', code => {
                this.onClose.invoke({code});
                // console.log('close', code);
                resolve();
            });

            child.on('error', err => {
                this.onError.invoke({err})
                // console.log('ererer', err);
                reject(err.toString());
            });

            child.stderr.on('data', (data) => {
                this.onStdErrorData.invoke({data});
                // console.log(`child stderr:\n${data}`);
                reject(data.toString());
            });

        });


    }


}