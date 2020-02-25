export const PORT = process.env.PORT || 80;
export const ROOT_PATH = process.env.SERVE_PATH || __dirname;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';

export const AUTH = 'auth';
export const TOKEN_QUERY_KEY = 'token';
export const errMsgs = {
  authRequired: 'Authentication Required',
  forbidden: 'Forbidden',
};
