const express = require('express');

const decodePath = require('./middlewares/path');
const logger = require('./middlewares/logger');
const validateToken = require('./middlewares/token');
const checkAuthoriation = require('./middlewares/authorization');
const handle = require('./handle');

const PORT = process.env.PORT || 80;
const ROOT_PATH = process.env.SERVE_PATH || __dirname;

const app = express();

app.use(decodePath);
app.use(logger);

if (process.env.SKIP_AUTHENTICATION !== 'true') {
  app.use(validateToken);
  app.use(checkAuthoriation);
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

module.exports.ROOT_PATH = ROOT_PATH;