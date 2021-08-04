'use strict';

const express = require(`express`);

const {getLogger} = require(`../lib/logger`);
const router = require(`./routes`);

const PORT = 3000;

const app = express();
const logger = getLogger({
  name: `from-server`
});

app.use((req, res, next) => {
  logger.debug(`Start request to url: ${req.url}`);
  next();
});

app.use(`/`, router);

app.use((req, res) => {
  res.status(404).send(`Not found`);
  logger.error(`End request to ${req.url} with error ${res.statusCode}`);
});

app.listen(PORT, () => {
  logger.info(`server start on ${PORT}`);
})
  .on(`error`, (err) => {
    logger.error(`Server can't start. Error: ${err}`);
  });
