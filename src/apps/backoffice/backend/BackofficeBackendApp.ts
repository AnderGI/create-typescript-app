import ExpressHttpServer from './ExpressHttpServer.js';

export default class BackofficeBackendApp {
  constructor(private readonly server: ExpressHttpServer){}

  public async start() {
    await this.server.start();
  }

  public registerRoutes() {
    this.server.registerRoutes()
  }

  public async stop() {
    this.server.stop();
  }


}