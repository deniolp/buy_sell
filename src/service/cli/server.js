'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const createApi = require(`../api`);
const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;

const createApp = async () => {
  const app = express();
  const apiRoutes = await createApi();
  app.use(express.json());

  app.use((req, res) => {
    res.status(HttpCode.NOT_FOUND)
      .send(`Page not found`);
    console.error(`Route not found: ${req.url}`);
  });

  app.use(`/api`, apiRoutes);

  app.use((err, _req, _res, _next) => {
    console.error(`An error occured on processing request: ${err.message}`);
  });

  return app;
};

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const app = await createApp();

    app.listen(port, (err) => {
      if (err) {
        return console.error(chalk.red(`Ошибка при создании сервера`, err));
      }

      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};
