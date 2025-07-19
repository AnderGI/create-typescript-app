import { Router } from 'express';
import RouteHandler from './RouterHandler'

export default class RouteHandlers {
  constructor (private readonly routeHAndlers:RouteHandler[]){}

  registerRoutes(router:Router) {
    this.routeHAndlers.forEach(_ => {
      _.register(router)
    })
  }
}