import DomainDecorator from "../../../../../shared/domain/decorator/DomainDecorator.js";
import { Request, Response } from "express";
import status from "http-status";

@DomainDecorator()
export default class StatusGetController {
  public run(req:Request, res:Response):void{
    res.status(status.OK).send();
  }
}