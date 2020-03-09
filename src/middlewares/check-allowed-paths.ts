import { Request, Response, NextFunction } from 'express';

import { TokenPayload } from '@src/models';
import { TOKEN_PAYLOAD_FIELD, errMsgs } from '@src/config';

export default function (req: Request, res: Response, next: NextFunction) {
  const { allowedPaths }: TokenPayload = req[TOKEN_PAYLOAD_FIELD];

  if (allowedPaths.some((p) => req.path.startsWith(p))) {
    next();
  } else {
    res.status(403);
    res.end(errMsgs.forbidden);
  }
}
