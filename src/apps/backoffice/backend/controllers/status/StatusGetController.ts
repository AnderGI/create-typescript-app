import type { Request, Response } from "express";
export default class StatusGetController {
  public run(req:Request, res:Response):void{
    res.status(200).send();
    return;
  }
}