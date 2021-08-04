'use strict';

const pino = require(`pino`);
const express = require(`express`);
const dateFormat = require(`dateformat`);

const PORT = 3000;

const app = express();

const logger = pino({
  name: `from-express`,
  level: process.env.LOG_LEVEL || `debug`,
  prettyPrint: {
    colorize: true,
    translateTime: dateFormat(new Date(), `dd.m h:MM T`),
    ignore: `pid,hostname`,
  },
});

app.use((req, res, next) => {
  logger.debug(`Start request to url: ${req.url}`);
  next();
});

app.get(`/`, (req, res) => {
  logger.info(`End request to ${req.url} with status code ${res.statusCode}`);
  res.send(`Hello!`);
});

app.use((req, res) => {
  res.status(400).send(`Not found`);
  logger.error(`End request to ${req.url} with error ${res.statusCode}`);
});

app.listen(PORT, () => {
  logger.info(`server start on ${PORT}`);
})
  .on(`error`, (err) => {
    logger.error(`Server can't start. Error: ${err}`);
  });
