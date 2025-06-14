import type { IncomingMessage, ServerResponse } from "http";
import type RouterHandler from "../RouterHandler.js";

export default class StatusGetRouteHandler implements RouterHandler{
  readonly method:string = 'GET';
  readonly path:string = '/status';

  public handle(req:IncomingMessage,res:ServerResponse) {
    res.writeHead(200);
    res.end()
  }

  public data() {
    return {
      method: this.method,
      path: this.path
    }
  }

}