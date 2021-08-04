'use strict';

const pino = require(`pino`);
const dateFormat = require(`dateformat`);

const logger = pino({
  name: `base`,
  level: process.env.LOG_LEVEL || `debug`,
  prettyPrint: {
    colorize: true,
    translateTime: dateFormat(new Date(), `dd.m h:MM T`),
    ignore: `pid,hostname`,
  },
});

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
