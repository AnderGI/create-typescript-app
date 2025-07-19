import { Router } from "express";

export default interface RouteHandler {
    register(router:Router): void;
}