'use strict';

const express = require(`express`);

const DEFAULT_PORT = 3000;

const app = express();

app.get(`/`, (req, res) => res.send(`Hi, Express!`));

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
