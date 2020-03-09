import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

import {
  TOKEN_QUERY_KEY, TOKEN_KEY_PATH, TOKEN_PAYLOAD_FIELD, TOKEN_ALGORITHM, errMsgs,
} from '@src/config';
import { TokenPayload } from '@src/models';

const publicKey = fs.readFileSync(TOKEN_KEY_PATH);

export default function (req: Request, res: Response, next: NextFunction) {
  const token = req.query[TOKEN_QUERY_KEY];

  if (!token) {
    res.status(401);
    res.end(errMsgs.authRequired);
    return;
  }

  jwt.verify(token, publicKey, { algorithms: [TOKEN_ALGORITHM] }, (err, payload) => {
    if (err) {
      res.status(401);
      res.end(err.message);
      return;
    }

    req[TOKEN_PAYLOAD_FIELD] = payload as TokenPayload;
    next();
  });
}
