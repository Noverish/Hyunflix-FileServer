import { Request, Response, NextFunction } from 'express';

import { Auth } from '@src/models';
import { AUTH, errMsgs } from '@src/config';

export default function (req: Request, res: Response, next: NextFunction) {
  const { allowedPaths }: Auth = req[AUTH];
  const path: string = req.path;

  for (const allowedPath of allowedPaths) {
    if (path.startsWith(allowedPath)) {
      next();
      return;
    }
  }
  
  res.status(403);
  res.end(errMsgs.forbidden);
}
