import HttpServer from './HttpServer.js';

export default class BackofficeBackendApp {
  private readonly server: HttpServer
  constructor(){
    this.server = new HttpServer()
  }

  public start() {
    this.server.start();
  }

  public stop() {
    this.server.stop();
  }
}
