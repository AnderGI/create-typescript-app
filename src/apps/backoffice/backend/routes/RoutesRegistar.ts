import { Router } from "express";

export default abstract class RouteRegistrar {
  public abstract registrar(router:Router): void;
}