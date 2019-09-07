const http = require('http');
const handler = require('serve-handler');
const { extname, parse, join } = require('path');
const fs = require('fs');

const smi2vtt = require('./smi2vtt');
const srt2vtt = require('./srt2vtt');

const PORT = process.env.PORT || 80;
const ROOT_PATH = process.env.SERVE_PATH || '/archive';

const server = http.createServer((req, res) => {
  const path = decodeURI(req.url);
  const ext = extname(path);
  
  if (ext === '.vtt') {
    const parsed = parse(path);
    const smiPath = join(ROOT_PATH, parsed.dir, `${parsed.name}.smi`);
    const srtPath = join(ROOT_PATH, parsed.dir, `${parsed.name}.srt`);
  
    if (fs.existsSync(smiPath)) {
      res.setHeader('Content-Type', 'text/vtt; charset=utf-8');
      res.statusCode = 200;
      res.end(smi2vtt(smiPath));
      return;
    } else if (fs.existsSync(srtPath)) {
      res.setHeader('Content-Type', 'text/vtt; charset=utf-8');
      res.statusCode = 200;
      res.end(srt2vtt(srtPath));
      return;
    }
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
});

server.listen(PORT, () => {
  console.log(`* File Server Started at ${PORT}!`);
  console.log(`* File Server Serve at ${ROOT_PATH}!`);
})