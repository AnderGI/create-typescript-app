import type { IncomingMessage, ServerResponse } from "http";

export abstract class RouteHandler {
    abstract uri(): string;
    abstract method(): "get" | "put";
    abstract handle(req:IncomingMessage, res:ServerResponse): void;
}