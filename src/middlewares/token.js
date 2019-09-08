const request = require('request');

const AUTH_URL = process.env.AUTH_URL || 'localhost';

function validateToken(req, res, next) {
  const cookie = req.headers['cookie'];
  
  const options = {
    method: 'GET',
    url: `http://${AUTH_URL}`,
    headers: { cookie }
  };
  
  request(options, (err, response, body) => {
    if(err) {
      next(err);
      return;
    }
    
    if (response.statusCode === 200) {
      req['authorizations'] = JSON.parse(response.body)['authorizations'];
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

module.exports = validateToken;