import type { Router, Request, Response } from "express";
import RouteRegistrar from "../RoutesRegistar.js";
import container from "../../dependency-injection/diod.config.js";
import StatusGetController from "../../controllers/status/StatusGetController.js";

export default class StatusGetRouteRegistar extends RouteRegistrar{
  public registrar(router: Router): void {
    const controller = container.get(StatusGetController) as StatusGetController
    router.get('/status', (req:Request, res:Response) => {
      controller.run(req, res);
    })
  }
}