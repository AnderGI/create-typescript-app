import ExpressHttpServer from './ExpressHttpServer.js';

export default class BackofficeBackendApp {
  private readonly server: ExpressHttpServer
  constructor(){
    this.server = new ExpressHttpServer()
  }

  public start() {
    this.server.start();
  }

  public stop() {
    this.server.stop();
  }
}
