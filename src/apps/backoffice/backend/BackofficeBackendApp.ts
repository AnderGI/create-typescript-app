import HttpServer from './HttpServer.js';

export default class BackofficeBackendApp {

  constructor(private readonly server: HttpServer){}

  public start() {
    this.server.start();
  }

  public stop() {
    this.server.stop();
  }
}
