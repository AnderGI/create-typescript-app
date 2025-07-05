import { Command } from './Command';
import { CommandHandler } from './CommandHandler';

export class CommandNotFoundError extends Error {
  constructor(handler: CommandHandler<Command>) {
    super(`The command hasn't been found in the handlers <${handler.constructor.name}> suscribedTo method`);
  }
}
