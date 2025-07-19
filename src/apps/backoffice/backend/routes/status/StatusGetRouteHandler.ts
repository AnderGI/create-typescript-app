import RouteHandler  from  "./../RouterHandler.js"
import { Router, Request, Response } from "express";
import StatusGetController from './../../controllers/status/StatusGetController.js'

export default class StatusGetRouteHandler implements RouteHandler {
  constructor(private readonly controller: StatusGetController) {}

  register(router: Router): void {
    router.get('/app/status', (req:Request, res: Response) => {
      return this.controller.run(req, res);
    })
  }

}