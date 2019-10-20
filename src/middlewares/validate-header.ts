import { Request, Response, NextFunction } from 'express';

import { Auth } from '@src/models';

const AUTH_HEADER = 'x-hyunsub-auth';

export default function (req: Request, res: Response, next: NextFunction) {
  const authString: string = (req.headers[AUTH_HEADER] || '').toString();
  
  if (!authString) {
    res.status(401);
    res.json({ msg: 'Unauthorized' });
  } else {
    req['auth'] = JSON.parse(authString);
    next();
  }
}

export function checkAllowedPath(req: Request, res: Response, next: NextFunction) {
  const auth: Auth = req['auth'];
  const allowedPaths: string[] = auth.allowedPaths;
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
