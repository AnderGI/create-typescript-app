import { type  Server } from "http";
import express, { Router, Request, Response, NextFunction } from 'express';
import container from "./dependency-injection/di";
import { RouteHandler } from "./router-tree/RouteHandler";
import ZaladoAPIGuideBasedRouteValidator from "./routes/ZaladoAPIGuideBasedRouteValidator";

export default class ExpressHttpServer {
  private readonly express: express.Express;
	private readonly port: string;
  private server:Server;
  private readonly router:express.Router;  
  private readonly validator:ZaladoAPIGuideBasedRouteValidator;

  constructor(){
    this.port = '5000';
    this.express = express();
    this.router = Router();
    this.validator = new ZaladoAPIGuideBasedRouteValidator()
    // ensure all routes are registered before making the server use the router
    this.registerRoutes(this.router).then(() => {
      this.express.use(this.validateRouteStructureMiddleware)
      this.express.use(this.router)
    })
    this.express.disable('x-powered-by')
  }
    
  async start(): Promise<void>  {
        return new Promise((resolve, reject) => {
          this.server = this.express.listen(this.port, (err) => {
            if(err) {
               reject(err)
            }
            console.log(`Server listening at http://localhost:${this.port}`)
            console.log('  Press CTRL-C to stop\n');
				    resolve();
          })
        })
  }
    
  async stop(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.server) {
				this.server.close(error => {
					if (error) {
						reject(error);

						return;
					}

					resolve();
				});
			}

			resolve();
		});
	}
  
  private async registerRoutes(router:Router) {
    const routeHandlers = await container.findByLabel('routeHandler') as unknown as RouteHandler[]
    routeHandlers.forEach(_ => {
      _.register(router)
    })
  }

  private validateRouteStructureMiddleware(validator:ZaladoAPIGuideBasedRouteValidator, req: Request, res: Response, next: NextFunction) {
  try {
    validator.validatePathRoute(req.path);
    next();
  } catch (error) {
    res.status(400).json({
      error: 'InvalidRoute',
      message: (error as Error).message,
      path: req.path,
    });
  }
}

  }

