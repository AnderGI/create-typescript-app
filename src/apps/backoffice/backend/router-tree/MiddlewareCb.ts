import type { IncomingMessage, ServerResponse } from "http"

export type MiddlewareCb = (req:IncomingMessage, res:ServerResponse, next:() => void) => void;
