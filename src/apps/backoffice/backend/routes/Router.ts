import type { IncomingMessage, ServerResponse } from "http";
import type RouterHandler from "./RouterHandler.js";
import container from "../dependency-injection/di.js";

export default class Router {
  private readonly routes = new Map<string, RouterHandler>();

  public async init() {
    const handlers = await container.findByLabel('routeRegistrar');
    handlers.forEach(handler => this.addRoutes(handler as unknown as RouterHandler));
  }



  public handle(req:IncomingMessage,res:ServerResponse) {
    const {url} = req
    if(!url) {
    res.writeHead(400);
    res.end()
    return;
    }

    const formattedUrl = new URL(url, `http://localhost`)
    
    const handler = this.routes.get(`${req.method}-${formattedUrl.pathname}`)
    if(!handler){
      res.writeHead(400)
      res.end()
      return;
    }
  
    return handler.handle(req, res);

  }

  public addRoutes(_:RouterHandler) {
    const {method, path} = _.data();
    const key = `${method}-${path}`
    this.routes.set(key, _)
  }
}
