import { Request, Response } from "express";
import status from "http-status";

export default class StatusGetController {
  public run(req:Request, res:Response):void{
    res.status(status.OK).send();
  }
}