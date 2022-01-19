import BaseCommand from "./BaseCommand";
import Queue from "../systems/lib/Queue";
import Event from "../systems/lib/Event";


export type OnProceedData = {
    currentCommands: BaseCommand[],
    commandTotalCount: number,
    results: any,
    command: BaseCommand
}
export default class QueueCommand extends BaseCommand {

    onProceed: Event<OnProceedData> = new Event();
    protected readonly commands: Queue<BaseCommand>;

    constructor(commands: BaseCommand[] = []) {
        super();
        this.commands = new Queue(commands);
    }

    _defineExecute = async () => {
        const commandTotalCount = this.commands.length
        for (const command of this.commands.queueAll()) {
            command.validator = this.validator;

            const results = await command.execute();
            this.onProceed.invoke({
                                      currentCommands: this.commands.getItems(),
                                      commandTotalCount,
                                      command,
                                      results
                                  });
        }


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


}

