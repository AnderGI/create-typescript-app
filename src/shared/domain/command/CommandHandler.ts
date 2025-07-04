import Command from "./Command";

export default interface CommandHandler<T extends Command>{
  handle(_:T):Promise<void>;
}