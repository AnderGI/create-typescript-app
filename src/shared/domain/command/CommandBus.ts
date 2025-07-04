import Command from "./Command";

export  default interface CommandBus {
  dispatch(_:Command): Promise<void>;
}