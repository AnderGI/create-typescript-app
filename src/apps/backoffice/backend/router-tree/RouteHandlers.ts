import type { IncomingMessage, ServerResponse } from "http";
import type { RouteHandler } from "./RouteHandler.js";
 
export default class RouteHandlers {
  readonly handlers = new Map< "get" | "put", RouteHandler> ()

  register(routeHandler:RouteHandler) {
    const method = routeHandler.method()
    if(!this.handlers.has(method)) {
      this.handlers.set(method, routeHandler)
    }
  }

  handleGet(req:IncomingMessage,res:ServerResponse) {
    this.handlers.get('get')?.handle(req, res)
  }
}