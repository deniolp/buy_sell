'use strict';

const {Router} = require(`express`);

const {getLogger} = require(`./../lib/logger`);

const router = new Router();
const logger = getLogger({
  name: `from-routes`
});

router.get(`/`, (req, res) => {
  logger.info(`End request to ${req.url} with status code ${res.statusCode}`);
  res.send(`Hello!`);
});

router.get(`/about`, (req, res) => {
  logger.info(`End request to ${req.url} with status code ${res.statusCode}`);
  res.send(`About Node.js lessons`);
});

module.exports = router;
