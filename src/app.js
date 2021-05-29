import express from 'express';
import 'dotenv/config';

import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(
      express.json({
        verify: (req, res, buf) => {
          try {
            JSON.parse(buf);
          } catch (e) {
            res.status(400).json({ error: `Json Syntax Error: ${e.message}` });
          }
        },
      })
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
