export const PORT = process.env.PORT || 80;
export const ROOT_PATH = process.env.SERVE_PATH || __dirname;

export const REAL_IP_HEADER = 'X-Real-IP';
export const TOKEN_KEY_PATH = 'keys/public.pem';
export const TOKEN_ALGORITHM = 'RS256';
export const TOKEN_PAYLOAD_FIELD = 'token-payload';
export const TOKEN_QUERY_KEY = 'token';
export const errMsgs = {
  authRequired: 'Authentication Required',
  forbidden: 'Forbidden',
};
