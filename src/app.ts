import * as express from 'express';
import * as cors from 'cors';

import { PORT, ROOT_PATH, SKIP_AUTHENTICATION } from '@src/config';
import logger from './middlewares/logger';
import validateToken from './middlewares/validate-token';
import checkAuthorization from './middlewares/authorization';
import handle from './handle';

const app = express();

app.use(logger);
app.use(cors());

if (!SKIP_AUTHENTICATION) {
  app.use(validateToken);
  app.use(checkAuthorization);
} else {
  console.log('* Skip Authentication!');
}

app.get('/', (req, res, next) => {
  return handle(req, res, next);
})

app.get('/:path*', (req, res, next) => {
  return handle(req, res, next);
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500);
  res.json(err);
})

app.listen(PORT, () => {
  console.log(`* File Server Started at ${PORT}!`);
  console.log(`* File Server Serve at ${ROOT_PATH}!`);
})
