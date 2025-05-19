  const winston = require('winston');
  require('winston-mongodb');
  const config = require('config');

  const { createLogger, format, transports } = require('winston');
  const { combine, timestamp, label, printf, prettyPrint, colorize, json} = format;

  const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

  const logger = createLogger({
      format: combine( 
      label({ label: 'ITTERM' }),
      timestamp(),
      myFormat,
      // json()
    ),
      transports: [
          new transports.Console({level: "silly"}),
          new transports.File({filename:"logs/error.log", level: "error"}),
          new transports.File({filename:"logs/combine.log", level: "info"}),
          new transports.MongoDB({
              db: config.get("dbUri"),
              collection: 'log'
          })
          
  ],
  exceptionHandlers: [new transports.File({filename:"logs/exceptions.log"})],
  rejectionHandlers: [
      new transports.File({ filename: 'logs/rejections.log' })
    ]
  })

  logger.exitOnError =false;


  module.exports = logger;