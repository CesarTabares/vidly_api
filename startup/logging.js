const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "uncaughtExceptions.log" }),
    new winston.transports.Console(),
  ],
});

module.exports = logger;
