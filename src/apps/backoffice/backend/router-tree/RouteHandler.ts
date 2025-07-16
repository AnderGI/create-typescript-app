import { Router } from "express";

export abstract class RouteHandler {
    abstract register(router:Router): void;
}