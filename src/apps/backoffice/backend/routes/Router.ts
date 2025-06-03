import type { IncomingMessage, ServerResponse } from "http";
import type RouterHandler from "./RouterHandler.js";

export default class Router {
  private readonly routes = new Map<string, RouterHandler>();

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
  
  public addRoutes(routeHanlders:RouterHandler[]) {
    routeHanlders.forEach(_ => {
      const {method, path} = _.data();
      const key = `${method}-${path}`
      this.routes.set(key, _)
    })
  }
}
