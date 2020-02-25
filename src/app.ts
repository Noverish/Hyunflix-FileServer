import * as express from 'express';

import { PORT, ROOT_PATH } from '@src/config';
import { logger, validateToken, checkAllowedPaths } from '@src/middlewares';
import handle from '@src/handle';

const app = express();

app.use(logger);
app.use(validateToken);
app.use(checkAllowedPaths);

app.get('/', handle);
app.get('/:path*', handle);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500);
  res.json(err);
});

app.listen(PORT, () => {
  console.log(`* File Server Started at ${PORT}!`);
  console.log(`* File Server Serve at ${ROOT_PATH}!`);
});
