import RouteHandler  from  "../RouterHandler.js"
import { Router, Request, Response } from "express";
import StatusGetController from '../../controllers/status/StatusGetController.js'
import container from "../../dependency-injection/diod/container.js";

export default class StatusGetRouteHandler extends RouteHandler {
  register(router: Router): void {
    const controller = container.get(StatusGetController) as StatusGetController
    router.get('/app/status', (req:Request, res: Response) => {
      return controller.run(req, res);
    })
  }

}