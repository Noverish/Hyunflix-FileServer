const morgan = require('morgan');
const moment = require('moment-timezone');

morgan.token('remote-addr', (req, res) => {
  const ip = req.ip || req._remoteAddress || (req.connection && req.connection.remoteAddress) || undefined;
  if(ip && typeof ip === 'string' && ip.split(':').length === 4) {
    return ip.split(':')[3];
  } else {
    return ip;
  }
});

morgan.token('date', (req, res) => {
  return moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
});

morgan.token('user-id', (req, res) => {
  return (req['userId']) ? req['userId'] : undefined;
});

morgan.token('url', (req, res) => {
  return decodeURI(req.originalUrl);
});

const consoleFormat = '[:date] <:remote-addr> :user-id - :method :status :response-time ms ":url"';

export default morgan(consoleFormat);