import BaseCommand from "./BaseCommand";
import {factory} from "../utils/utils";
import Tracker from "../systems/lib/tracker/Tracker";
import pAll from "p-all";
import Event from "../systems/lib/Event";
import Collection from "../systems/lib/Collection";
import {OnProceedData} from "./QueueCommand";


//todo : 현재 validator 가 싱글톤이라 실행 불가능.
export default class ParallelCommand extends BaseCommand {

    protected readonly tracker: Tracker<BaseCommand> = factory(Tracker);
    protected readonly commands: Collection<BaseCommand>;

    onProceed: Event<OnProceedData> = new Event();

    get onStartEachCommand() {
        return this.tracker.onStart
    }

    get onDoneEachCommand() {
        return this.tracker.onDone
    }

    get onErrorEachCommand() {
        return this.tracker.onError
    }

    constructor(
        commands: BaseCommand[] = [],
        private options: pAll.Options
    ) {
        super();
        this.commands = new Collection<BaseCommand>(commands);
        this.logError();
    }


    _defineExecute = async () => {

        this.tracker.clear();

        for (const command of this.commands) {
            command.validator = this.validator;
        }

        const commandTotalCount = this.commands.length
        const commandExecutions = this.commands.items.map((command) => {
            return async () => {
                return await this.tracker.track(async ({DontStopOnError}) => {
                    try {
                        const results = await command.execute()
                        this.commands.remove(command)
                        this.onProceed.invoke({
                                                  currentCommands: this.commands.items,
                                                  commandTotalCount,
                                                  results,
                                                  command
                                              })

                        return results

                    } catch (e) {
                        if (!this.options.stopOnError) {
                            throw new DontStopOnError(e);
                        }
                        throw e;
                    }
                }, command);
            }

        })


        return await pAll(commandExecutions, this.options);
    }


    addCommand = (command: BaseCommand) => {
        this.commands.add(command)
        return this;
    }

    addCommands = (commands: BaseCommand[]) => {

        for (const command of commands) {
            this.addCommand(command);
        }

        return this;
    }


    protected clear() {
        this.tracker.clear();
        this.commands.clear();
    }


    log() {
        this.tracker.onStart.addListener(({track, index}) => {
            console.log("start track", track.id)
            console.log(track.item.constructor.name, track.startTime)
        })
        this.tracker.onDone.addListener(({track, index}) => {
            console.log("done track", track.id)
            console.log(track.item.constructor.name, track.executionHms, `${track.startTime} ~ ${track.endTime}`)
        })

    }

    logError() {

        this.tracker.onError.addListener(({track, index, e}) => {
            console.log("error track");
            console.log(track);
            console.log(e);
        })
    }
}