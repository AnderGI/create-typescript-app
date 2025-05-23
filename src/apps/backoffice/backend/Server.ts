import express from 'express'
import http from 'http'
import type { Nullable } from './Nullable.js';

export class Server {
	private readonly express: express.Express;
	private readonly port: string;
	private httpServer?: http.Server;

	constructor(port: string) {
		this.port = port;
		this.express = express();
	}

	async listen(): Promise<void> {
		return new Promise(resolve => {
			const env = this.express.get('env') as string;
			this.httpServer = this.express.listen(this.port, () => {
				console.log(
					`  Mock Backend App is running at http://localhost:${this.port} in ${env} mode`
				);
				console.log('  Press CTRL-C to stop\n');
				resolve();
			});
		});
	}

	getHTTPServer(): Nullable<http.Server> {
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
