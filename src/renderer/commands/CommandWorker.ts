import BaseCommand from "./BaseCommand";
import Queue from "../systems/lib/Queue";
import Event from "../systems/lib/Event";
import {StartStopStatusEnum} from "./StartStopStatusEnum";
import {injectable} from "inversify";
import {secondsToHms, sleep} from "../utils/utils";
import {Timer} from "../systems/lib/Timer";
import moment from "moment";

@injectable()
export default class CommandWorker {

    onEnded: Event = new Event();
    onProceed: Event = new Event();
    onProceedError: Event = new Event();

    commands: Queue<BaseCommand> = new Queue<BaseCommand>()
    currentCommand: BaseCommand | null = null;

    private _status: StartStopStatusEnum = StartStopStatusEnum.IDLE

    get status(): StartStopStatusEnum {
        return this._status;
    }

    private timer = new Timer();

    get startTime(): string {
        return this.timer.startTime
    }

    get endTime(): string {
        return this.timer.endTime
    }


    get executionHms(): string {
        return this.timer.executionHms
    }


    errorCommands: BaseCommand[] = []
    successCommands: BaseCommand[] = []

    stopOnError = true

    requestStop() {
        this._status = StartStopStatusEnum.STOPPING;
    }

    async wait(term: number = 500) {
        while (true) {
            await sleep(term);
            if (this.isIdle) {
                return;
            }
        }
    }

    async work(commands: BaseCommand[] | BaseCommand) {

        if (!Array.isArray(commands)) {
            commands = [commands]
        }

        this.addCommands(commands);

        if (this.isExecuting) {
            return;
        }
        this.clear();

        this.timer.startUp();

        try {
            this._status = StartStopStatusEnum.EXECUTING;
            while (true) {
                const command = this.commands.queue();
                if (!command) {
                    break;
                }
                this.currentCommand = command;

                try {
                    if (this.isStopping) {
                        break;
                    }

                    await command.execute()
                    this.onProceed.invoke({
                                              command,
                                              commands: this.commands
                                          });
                    this.successCommands.push(command)

                } catch (e) {
                    this.onProceedError.invoke({e});
                    this.errorCommands.push(command)
                    if (this.stopOnError) {
                        throw e;
                    }

                }
            }

            this.onEnded.invoke(null);
        } finally {
            this._status = StartStopStatusEnum.IDLE;
            this.currentCommand = null;
            this.timer.endUp();
        }
    }


    get length(): number {
        return this.commands.length + (this.isIdle ? 0 : 1)
    }

    get isExecuting(): boolean {
        return this._status === StartStopStatusEnum.EXECUTING;
    }

    get isIdle(): boolean {
        return this._status === StartStopStatusEnum.IDLE;
    }

    get isStopping(): boolean {
        return this._status === StartStopStatusEnum.STOPPING;
    }


    addCommands(commands: BaseCommand[]) {
        this.commands.addList(commands)
        return this;
    }

    addCommand(command: BaseCommand) {
        this.commands.add(command);
        return this;
    }


    clear() {
        this.errorCommands = [];
        this.successCommands = [];
    }

    cancel(command: BaseCommand) {
        this.commands.removeByItem(command)
        return this;
    }


}