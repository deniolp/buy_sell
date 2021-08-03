'use strict';

const express = require(`express`);

const createApi = require(`../api`);
const {getLogger} = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);
const {HttpCode, ExitCode} = require(`../../constants`);
const {API_PORT} = require(`../../../config`);

const DEFAULT_PORT = API_PORT;

const logger = getLogger({name: `api`});

const createApp = async () => {
  const app = express();
  const apiRoutes = await createApi();
  app.use(express.json());

  app.use((req, res, next) => {
    logger.debug(`Request on route ${req.url}`);
    res.on(`finish`, () => {
      logger.info(`Response status code ${res.statusCode}`);
    });
    next();
  });

  app.use(`/api`, apiRoutes);

  app.use((req, res) => {
    res.status(HttpCode.NOT_FOUND)
      .send(`Page not found`);
    logger.error(`Route not found: ${req.url}`);
  });

  app.use((err, _req, _res, _next) => {
    logger.error(`An error occured on processing request: ${err.message}`);
  });

  return app;
};

module.exports = {
  name: `--server`,
  async run(args) {
    try {
      await sequelize.authenticate();
      logger.info(`Trying to connect to database...`);
    } catch (error) {
      logger.error(`An error occured: ${error.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const app = await createApp();

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occurred on server creation: ${err.message}`);
        }

        return logger.info(`Listening to connections on ${port}`);
      });
    } catch (error) {
      logger.error(`An error occurred: ${error.message}`);
      process.exit(ExitCode.error);
    }
  }
};
