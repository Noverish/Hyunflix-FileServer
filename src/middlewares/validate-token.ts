import * as request from 'request';

import { AUTH_URL } from '@src/config';

export default function (req, res, next) {
  if(req.url.split('?')[0].endsWith('.vtt')) {
    req['authorizations'] = ['/'];
    req['userId'] = 0;
    next();
  };
  
  const newHeaders = {};
  if(req.headers['authorization']) {
    newHeaders['authorization'] = req.headers['authorization'];
  }
  if(req.headers['cookie']) {
    newHeaders['cookie'] = req.headers['cookie'];
  }
  
  const options = {
    method: 'GET',
    url: AUTH_URL,
      headers: {
        'authorization': req.headers['authorization'],
        'cookie': req.headers['cookie'],
      },
  };
  
  request(options, (err, response, body) => {
    if(err) {
      next(err);
      return;
    }
    
    if (response.statusCode === 204) {
      req['authorizations'] = response.headers['x-hyunsub-authorizations'].split(', ');
      req['userId'] = response.headers['x-hyunsub-userid'];
      next();
    } else if (response.statusCode === 401) {
      res.status(401);
      res.end('Unauthorized');
    } else {
      res.status(500);
      res.end('Server Error');
    }
  });
}
