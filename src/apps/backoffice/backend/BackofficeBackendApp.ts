import express, { json, Router } from 'express'
import http from 'http'
import container from './dependency-injection/diod.config.js';
import type RouteRegistrar from './routes/RoutesRegistar.js';


export class BackofficeBackendApp {
	private readonly port: string = '5000';
	private readonly express: express.Express;
	private httpServer?: http.Server;
	private readonly router: express.Router;
	
	 constructor() {
		this.express = express()
		this.router = Router()
		this.express.use(json())
		this.express.use(this.router)
		this.httpServer = http.createServer(this.express)
		this.registerRoutes();
	}

	private registerRoutes() {
		const routeRegistrarIds = container.findTaggedServiceIdentifiers('routeRegistrar');
		routeRegistrarIds.forEach(id => {
			const registrar = container.get(id) as RouteRegistrar;
			registrar.registrar(this.router);
		});
	}

	async start(): Promise<void> {
		this.httpServer?.listen(this.port, () => {
			console.log(`Server listening at http://localhost:${this.port}`)
		})
	}

	getServer() {
			return this.httpServer;
	}

	async stop(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.httpServer) {
				this.httpServer.close(error => {
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

}
