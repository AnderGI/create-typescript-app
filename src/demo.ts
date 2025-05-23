  import { createServer, IncomingMessage, ServerResponse } from 'http';

  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hola desde Node');
  });

  server.listen(5000, 'localhost', () => {
    console.log('hola')
  })