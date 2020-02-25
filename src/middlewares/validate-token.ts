import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { authSchema } from '@src/models';

import { TOKEN_QUERY_KEY, JWT_SECRET_KEY, AUTH, errMsgs } from '@src/config';

export default function (req: Request, res: Response, next: NextFunction) {
  const token = req.query[TOKEN_QUERY_KEY];
  
  if (!token) {
    res.status(401);
    res.end(errMsgs.authRequired);
    return;
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
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
