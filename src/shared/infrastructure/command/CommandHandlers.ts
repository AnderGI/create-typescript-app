import { Command } from "../../domain/command/Command";
import { CommandHandler } from "../../domain/command/CommandHandler";
import { CommandNotRegisteredError } from "../../domain/command/CommandNotRegisteredError";
import { CommandNotFoundError } from "../../domain/command/CommandNotFoundError";


export class CommandHandlers  {
  private readonly commandToHandlerRelation = new Map<Command, CommandHandler<Command>>();

  constructor(commandHandlers: CommandHandler<Command>[]) {
    commandHandlers.forEach(commandHandler => {
      this.set(commandHandler);
    });
  }

  private set(handler:CommandHandler<Command>):void {
    const command = handler.subscribedTo()
    
    if(!command) throw new CommandNotFoundError(handler);
    
    this.commandToHandlerRelation.set(handler.subscribedTo(), handler);
  }

  public get(command: Command): CommandHandler<Command> {
    const commandHandler = this.commandToHandlerRelation.get(command.constructor);

    if (!commandHandler) {
      throw new CommandNotRegisteredError(command);
    }

    return commandHandler;
  }
}