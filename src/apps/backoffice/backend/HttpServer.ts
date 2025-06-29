import {createServer, type  Server } from "http";
import  AppRoutes from "./router-tree/AppRoutes.js";

export default class HttpServer {
  private readonly server:Server;
  private readonly desiredPort:number = 3000;
  private readonly dinamyPortAllocation:number = 0;
  private readonly router:AppRoutes;
  
  constructor(){
        this.server = createServer();
        this.router = new AppRoutes()
  }
    
    async start() {
        this.server.listen(this.desiredPort);
        this.router.register()
        this.server.on('request', (req, res) => {
          try {
            this.router.handle(req, res);
          } catch {
            res.writeHead(404)
            res.end()
          }
        });
    
    
        this.server.on('listening', () => {
          const addr = this.server.address();
          const port = typeof addr === 'object' && addr ? addr.port : this.desiredPort;
          console.log(`HTTP server listening at http://localhost:${port}`);
        });
    
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.server.on('error', (err: any) => {
          if (err.code === 'EADDRINUSE') {
            console.warn(`Puerto 3000 en uso, usando puerto aleatorio...`);
            this.server.listen(this.dinamyPortAllocation);
          } else {
            console.error('Error en el servidor:', err);
          }
        }); 
      }
    
      async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
          if (this.server) {
            this.server.close((error:Error | undefined) => {
              if (error) {
                reject(error);
                return;
              }
    
              resolve();
            });
          } else {
            resolve(); 
          }
        });
      }
  }

