module.exports = function (req, res, next) {
  const authorizations = req['authorizations'];
  const path = req.originalUrl;
  
  for (const authorization of authorizations) {
    if (path.startsWith(authorization)) {
      next();
      return;
    }
  }
  
  res.status(403);
  res.end('Forbidden');
}