'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const routes = require(`../api`);
const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;

const app = express();
app.use(express.json());

app.use(`/api`, routes);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND)
    .send(`Page not found`);
  console.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
  console.error(`An error occured on processing request: ${err.message}`);
});

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.error(chalk.red(`Ошибка при создании сервера`, err));
      }

      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};
