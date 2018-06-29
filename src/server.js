import express from 'express';
import bodyParser from 'body-parser';
import next from 'next';
import busboy from 'connect-busboy';

import routes from './routes';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const serverPort = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();
  server.use(busboy({ immediate: true }));
  server.use(bodyParser.json());

  server.use('/api', routes);

  server.get('*', (req, res) => handle(req, res));

  server.listen(serverPort, (err) => {
    if (err) throw err;
    console.log(`Server ready on port ${serverPort}`);
  });
});
