import { Router } from "express";

export default abstract class RouteHandler {
    abstract register(router:Router): void;
}