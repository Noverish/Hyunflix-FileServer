const handler = require('serve-handler');
const url = require("url");
const { extname } = require('path');

const vtt = require('./vtt');

function handle(req, res, next) {
  const { ROOT_PATH } = require('./');
  const path = decodeURI(url.parse(req.url).pathname);
  const ext = extname(path);
  
  if (ext === '.vtt') {
    return vtt(path, req, res, next);
  }
  
  return handler(req, res, {
    "public": ROOT_PATH,
    "headers": [
      {
        "source" : "**/*.@(smi|srt|vtt)",
        "headers" : [{
          "key" : "Content-Type",
          "value" : "text/plain"
        }],
      },
    ]
  });
}

module.exports = handle;