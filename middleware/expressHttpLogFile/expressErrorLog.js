const winston = require('winston');
const expressWinston = require('express-winston');

const ErrorLog = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({filename: "logs/requestErrorLogger.log"})
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
});

module.exports = ErrorLog;
