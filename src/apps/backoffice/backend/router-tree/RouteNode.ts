import type { IncomingMessage, ServerResponse } from "http";
import type { RouteHandler } from "./RouteHandler.js";
import RouterHandlers from "./RouteHandlers.js";

export class RouteNode {
  readonly subnodes: RouteNode[] = [];
  readonly handlers: RouterHandlers = new RouterHandlers();

  constructor(readonly pathName: string) {}

  registerHandler(routeHandler: RouteHandler) {
    this.handlers.register(routeHandler);
  }

  hasSubpathNode(subpathName: string): boolean {
    return this.subnodes.some(
      (node) => node.pathName === this.normalizePath(subpathName)
    );
  }

  addSubpathNode(node: RouteNode): void {
    if (!this.hasSubpathNode(node.pathName)) {
      this.subnodes.push(node);
    }
  }

  getSubpathNode(subpathName: string): RouteNode | undefined {
    return this.subnodes.find(
      (node) => node.pathName === this.normalizePath(subpathName)
    );
  }

  handleGet(req: IncomingMessage, res: ServerResponse): void {
    this.handlers.handleGet(req, res);
  }

  private normalizePath(pathName: string): string {
    return pathName.startsWith("/") ? pathName.slice(1) : pathName;
  }
}
