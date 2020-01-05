import { Request, Response, NextFunction } from 'express';

import { Session } from '@src/models';
import { AUTH_HEADER } from '@src/config';

export default function (req: Request, res: Response, next: NextFunction) {
  const authString: string = (req.headers[AUTH_HEADER] || '').toString();
  
  if (!authString) {
    res.status(401);
    res.json({ msg: 'Unauthorized' });
  } else {
    req['session'] = JSON.parse(authString);
    next();
  }
}

export function checkAllowedPath(req: Request, res: Response, next: NextFunction) {
  const { allowedPaths }: Session = req['session'];
  const path: string = req.originalUrl;
  
  for (const allowedPath of allowedPaths) {
    if (path.startsWith(allowedPath)) {
      next();
      return;
    }
  }
  
  res.status(403);
  res.end('Forbidden');
}
