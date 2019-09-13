export const PORT = process.env.PORT || 80;
export const ROOT_PATH = process.env.SERVE_PATH || __dirname;
export const SKIP_AUTHENTICATION = process.env.SKIP_AUTHENTICATION === 'true';
export const AUTH_URL = process.env.AUTH_URL || 'http://home.hyunsub.kim:8700';