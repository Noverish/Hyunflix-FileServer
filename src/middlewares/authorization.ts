export default function (req, res, next) {
  const authorizations: string[] = req['authorizations'];
  const path: string = req.originalUrl;
  
  for (const authorization of authorizations) {
    if (path.startsWith(authorization)) {
      next();
      return;
    }
  }
  
  res.status(403);
  res.end('Forbidden');
}