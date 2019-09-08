const { parse, join } = require('path');
const fs = require('fs');

const smi2vtt = require('./smi2vtt');
const srt2vtt = require('./srt2vtt');

function handle(path, req, res, next) {
  const { ROOT_PATH } = require('../');

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

module.exports = handle;