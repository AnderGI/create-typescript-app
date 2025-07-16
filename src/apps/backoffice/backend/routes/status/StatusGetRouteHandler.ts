import RouteHandler  from  "../../router-tree/RouterHandler.js"
import { Router, Request, Response } from "express";
import StatusGetController from '../../controllers/status/StatusGetController.js'

export default class StatusGetRouteHandler extends RouteHandler {
  register(router: Router): void {
    const controller = new StatusGetController()
    router.get('/app/status', (req:Request, res: Response) => {
      return controller.run(req, res);
    })
  }

}