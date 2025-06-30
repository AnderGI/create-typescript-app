import type { IncomingMessage, ServerResponse } from "http";
import RouteTree from "./RouteTree.js";
import ZaladoAPIGuideBasedRouteValidator from "./ZaladoAPIGuideBasedRouteValidator.js";
import { RouteNode } from "./RouteNode.js";
import container from "../dependency-injection/di.js";
import type { RouteHandler } from "./RouteHandler.js";

export default class AppRoutes {
 private readonly routeTree: RouteTree;
 private readonly pathValidator: ZaladoAPIGuideBasedRouteValidator = new ZaladoAPIGuideBasedRouteValidator()
 private readonly root = new RouteNode('app')
  constructor (){
    this.routeTree = new RouteTree(this.root, this.pathValidator);
  }

  async register() {
    const routeHandlers = await container.findByLabel('routeHandler') as unknown as RouteHandler[]
    routeHandlers.forEach(_ => {
      if(_.method() === "get") {
        this.routeTree.get(_.uri(), _)
      }
    })


  }

  printTree(root:RouteNode, indent: string) {
    console.log(indent, root.pathName)
    for(const subnode of root.subnodes) {
      this.printTree(subnode, indent + ' ')
    }

  }

  handle(req:IncomingMessage, res:ServerResponse) {
    this.routeTree.handle(req.url!, req, res)
  }

}