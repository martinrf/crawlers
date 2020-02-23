const winston = require('winston');
require('winston-daily-rotate-file');

class Logger {

    constructor(){
        const dirname = process.env.LOG_DIR || 'logs';
        this.fileRotatingTransport = new (winston.transports.DailyRotateFile)({
            filename: 'log-%DATE%.log',
            dirname: dirname,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '30d'
        });
        this.loggingFormat = winston.format.printf(         ({ level, message, timestamp }) =>                    {
            return `${timestamp} ${level.toUpperCase()}: ${message}`;
        });
        this.logger = winston.createLogger({
            format: winston.format.combine(
                winston.format.timestamp(),
                this.loggingFormat
            ),
            transports: [
                this.fileRotatingTransport
            ],
            levels: winston.config.npm.levels,
        });
        if (process.env.NODE_ENV === 'local') {
            this.logger.add(new winston.transports.Console({ format: winston.format.simple() }));
        }
    }
}


module.exports = new Logger();
