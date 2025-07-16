import { type  Server } from "http";
import express, { Router } from 'express';
import container from "./dependency-injection/di";
import { RouteHandler } from "./router-tree/RouteHandler";

export default class ExpressHttpServer {
  private readonly express: express.Express;
	private readonly port: string;
  private server:Server;
  private readonly router:express.Router;  
  
  constructor(){
    this.port = '5000';
    this.express = express();
    this.router = Router();
    // ensure all routes are registered before making the server use the router
    this.registerRoutes(this.router).then(() => {
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

  }

