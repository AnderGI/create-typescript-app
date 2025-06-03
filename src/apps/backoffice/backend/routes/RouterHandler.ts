import type { IncomingMessage, ServerResponse } from "http";

export default interface RouterHandler {
  handle(req:IncomingMessage,res:ServerResponse): void;
  data(): {method:string, path:string};
}