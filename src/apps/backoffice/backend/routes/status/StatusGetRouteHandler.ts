 
import type { IncomingMessage, ServerResponse } from "http";
import { RouteHandler } from "../../router-tree/RouteHandler.js";

export default class StatusGetRouteHandler extends RouteHandler{
  public async handle(req:IncomingMessage,res:ServerResponse): Promise<void> {
    res.writeHead(200);
    res.end()
    
  }

  method(): "get" {
    return "get"
  }

  uri() {
    return  '/app/status';
  }

}