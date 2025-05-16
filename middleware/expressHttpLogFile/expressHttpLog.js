const winston = require('winston');
const expressWinston = require('express-winston');
const config = require("config")
require('winston-mongodb');

const HttpLog = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.MongoDB({
        db: config.get("dbUri")
    })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) { return false; }
});

module.exports = HttpLog;
