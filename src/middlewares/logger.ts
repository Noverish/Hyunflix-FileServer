import { Request, Response } from 'express';
import * as morgan from 'morgan';

import { dateToString } from '@src/utils';
import { TOKEN_PAYLOAD_FIELD, REAL_IP_HEADER } from '@src/config';

morgan.token('remote-addr', (req: Request, res: Response) => {
  if (req.get(REAL_IP_HEADER)) {
    return req.get(REAL_IP_HEADER);
  }

  return req.ip || req.connection.remoteAddress;
});

morgan.token('date', (req: Request, res: Response) => dateToString(new Date()));

morgan.token('user-id', (req: Request, res: Response) => req[TOKEN_PAYLOAD_FIELD]?.userId);

morgan.token('url', (req: Request, res: Response) => decodeURI(req.path));

export default morgan('[:date] <:remote-addr> (:user-id) :method :status :response-time ms ":url"');
