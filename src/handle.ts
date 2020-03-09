import * as handler from 'serve-handler';
import * as url from 'url';
import { extname } from 'path';

import { ROOT_PATH } from '@src/config';
import vtt from './vtt';

export default function handle(req, res, next) {
  const path = decodeURI(url.parse(req.url).pathname);
  const ext = extname(path);

  if (ext === '.vtt') {
    return vtt(path, req, res, next);
  }

  return handler(req, res, {
    public: ROOT_PATH,
    headers: [
      {
        source: '**/*.@(smi|srt|vtt)',
        headers: [{
          key: 'Content-Type',
          value: 'text/plain',
        }],
      },
    ],
  });
}
