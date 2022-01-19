import ParallelCommand from "./ParallelCommand";
import QueueCommand, {OnProceedData} from "./QueueCommand";
import BaseCommand from "./BaseCommand";
import Event from "../systems/lib/Event";
import pAll from "p-all";
import Queue from "../systems/lib/Queue";


export default class Invoker extends BaseCommand {

    private readonly commands: Queue<BaseCommand> = new Queue<BaseCommand>()

    onProceed: Event<OnProceedData> = new Event();

    constructor() {
        super();
    }

    _defineExecute = async () => {
        const commandTotalCount = this.commands.length

        for (const command of this.commands.queueAll()) {
            const results = await command.execute();
            this.onProceed.invoke({
                                      currentCommands: this.commands.getItems(),
                                      results,
                                      commandTotalCount,
                                      command
                                  });
        }
    }

    queue(commands: BaseCommand[]) {
        commands.forEach(command => command.onProceed.addListener((data) => {
            this.onProceed.invoke(data);
        }))

        const queueCommand = new QueueCommand(commands)
        queueCommand.onProceed.addListener(data => {
            this.onProceed.invoke(data);
        })

        this.commands.add(queueCommand);
        return this;
    }

    parallel(commands: BaseCommand[], options: pAll.Options) {
        commands.forEach(command => command.onProceed.addListener((data) => {
            this.onProceed.invoke(data);
        }))

        const parallelCommand = new ParallelCommand(commands, options)
        parallelCommand.onProceed.addListener(data => {
            this.onProceed.invoke(data);
        })

        this.commands.add(parallelCommand);
        return this;
    }


    listenProceed(cb: (data: OnProceedData) => void) {
        this.onProceed.addListener((data) => {
            cb(data);
        })

        return this;
    }



}

export function queue(commands: BaseCommand[]) {
    return new Invoker().queue(commands);
}

export function parallel(commands: BaseCommand[], options: pAll.Options = {concurrency: 3, stopOnError: true}) {
    return new Invoker().parallel(commands, options)
}

