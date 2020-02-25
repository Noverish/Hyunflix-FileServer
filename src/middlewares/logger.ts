import * as morgan from 'morgan';
import * as moment from 'moment-timezone';

morgan.token('remote-addr', (req, res) => {
  return req.ip || req.connection?.remoteAddress;
});

morgan.token('date', (req, res) => {
  return moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
});

morgan.token('url', (req, res) => {
  return decodeURI(req.originalUrl);
});

// TODO print user id
const consoleFormat = '[:date] <:remote-addr> - :method :status :response-time ms ":url"';

export default morgan(consoleFormat);