import type { IncomingMessage, ServerResponse } from "http";
import type { RouteHandler } from "./RouteHandler.js";
import RouterHandlers from "./RouteHandlers.js";

export class RouteNode {
  readonly paths = new Map<string, RouteNode>(); 
  readonly handlers: RouterHandlers  = new RouterHandlers();
  readonly middlewares: ((req:IncomingMessage, res:ServerResponse, next:() => void) => void)[] = [];

  constructor(readonly pathName:string){}

  registerHandler(routeHandler:RouteHandler) {
    this.handlers.register(routeHandler)
  }

  hasSubpathNode(subpathName:string) {
    return this.paths.has(subpathName);
  }

  addSubpathNode(node:RouteNode): void {
    this.paths.set(node.pathName, node);
  }

  getSubpathNode(subpathName:string): RouteNode | undefined {
    return this.paths.get(subpathName)
  }
}