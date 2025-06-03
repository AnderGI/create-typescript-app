import type { IncomingMessage, ServerResponse } from "http";
import type RouterHandler from "../RouterHandler.js";

export default class StatusGetRouteHandler implements RouterHandler{
  readonly method:string = 'GET';
  readonly path:string = '/status';

  public handle(req:IncomingMessage,res:ServerResponse) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: 'Hello World!',
    }));
  }

  public data() {
    return {
      method: this.method,
      path: this.path
    }
  }

}