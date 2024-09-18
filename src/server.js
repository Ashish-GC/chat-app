'use server'

import { createServer } from 'node:http';
import next from 'next';
import { socketHandler } from './services/server-socket/socketHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.NEXT_PORT || 8000;

const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_NEXT_URL || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
    // Handle the request with Next.js
    handler(req, res);
  });

  socketHandler(httpServer);

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
