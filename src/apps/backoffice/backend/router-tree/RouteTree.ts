import type { IncomingMessage, ServerResponse } from "http";
import { RouteNode } from "./RouteNode.js";
import type ZaladoAPIGuideBasedRouteValidator from "./ZaladoAPIGuideBasedRouteValidator.js";
import { RouteHandler } from "./RouteHandler.js";

export default class RouteTree {
  constructor(readonly rootNode: RouteNode, readonly pathValidator: ZaladoAPIGuideBasedRouteValidator){}

  handle(pathName:string, req:IncomingMessage, res:ServerResponse) {
    this.pathValidator.validatePathRoute(pathName)
    const subroutePaths = pathName.split('/').filter((_) => {
      if(_) return _
    })    
    const node = this.getNode(this.rootNode, subroutePaths)
    node.handlers.handleGet(req, res)
  }

  get(pathName:string, handler:RouteHandler) {
    this.createNodePath(pathName)

    this.pathValidator.validatePathRoute(pathName)
    const subroutePaths = pathName.split('/').filter((_) => {
      if(_) return _
    })

    const node = this.getNode(this.rootNode, subroutePaths)

    node.registerHandler(handler)
  }

  createNodePath(pathName:string):void{
    this.pathValidator.validatePathRoute(pathName)
    const subroutePaths = pathName.split('/').filter((_) => {
      if(_) return _
    })
    
    const copy1 = [...subroutePaths]
    if(this.rootNode.pathName !== subroutePaths[0]) throw new Error('Root node must be the same')
    this.createNodePathFromRootRecursive(this.rootNode, copy1);
  }



  private createNodePathFromRootRecursive(root: RouteNode, subroutePaths: string[]): void {
    if (subroutePaths.length === 0) return;

    const [first, ...rest] = subroutePaths;


    if (first === root.pathName) {
      this.createNodePathFromRootRecursive(root, rest);
      return;
    }

    let child: RouteNode;

    if (!root.hasSubpathNode(first)) {
      child = new RouteNode(first);
      root.addSubpathNode(child);
    } else {
      child = root.getSubpathNode(first)!;
    }

    this.createNodePathFromRootRecursive(child, rest);
  }

  getNode(root:RouteNode, subroutePaths: string[]): RouteNode {
    if(subroutePaths.length === 0) return root;
    const [first, ...rest] = subroutePaths;
    if(root.pathName === first) {
      return this.getNode(root, rest)
    }

    const node = root.getSubpathNode(first)

    if (!node) {
      throw new Error(`Path segment "${first}" not found from node "${root.pathName}"`);
    }
    
    return this.getNode(node, rest)

  }

}