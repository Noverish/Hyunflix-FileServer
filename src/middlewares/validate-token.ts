import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { authSchema } from '@src/models';

import { TOKEN_QUERY_KEY, JWT_PUBLIC_KEY_PATH, AUTH, JWT_ALGORITHM, errMsgs } from '@src/config';

export default function (req: Request, res: Response, next: NextFunction) {
  const token = req.query[TOKEN_QUERY_KEY];
  
  if (!token) {
    res.status(401);
    res.end(errMsgs.authRequired);
    return;
  }

  const cert = fs.readFileSync(JWT_PUBLIC_KEY_PATH);

  jwt.verify(token, cert, { algorithms: [JWT_ALGORITHM] }, (err, payload) => {
    if (err) {
      res.status(401);
      res.end(err.message);
      return;
    }
    
    const { error, value } = authSchema.validate(payload);
    if (error) {
      res.status(401);
      res.end(error.message);
    }

    req[AUTH] = value;
    next();
  });
}
