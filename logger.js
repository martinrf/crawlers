const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, printf, json } = format;
require('winston-daily-rotate-file');

const dirname = process.env.LOG_DIR || 'logs';

let fileRotatingTransport = new (transports.DailyRotateFile)({
  filename: 'log-%DATE%.log',
  dirname: dirname,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '30d'
});

const loggingFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level.toUpperCase()}: ${message}`;
});

let logger = createLogger({
  format: combine(
    timestamp(),
    loggingFormat
  ),
  transports: [
    fileRotatingTransport
  ],
  levels: config.npm.levels,
});

if (process.env.NODE_ENV === 'local') {
  logger.add(new transports.Console({ format: format.simple() }));
}

module.exports = { logger };
