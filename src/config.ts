export const PORT = process.env.PORT || 80;
export const ROOT_PATH = process.env.SERVE_PATH || __dirname;

export const JWT_PUBLIC_KEY_PATH = 'public.pem';
export const JWT_ALGORITHM = 'RS256'
export const AUTH = 'auth';
export const TOKEN_QUERY_KEY = 'token';
export const errMsgs = {
  authRequired: 'Authentication Required',
  forbidden: 'Forbidden',
};
