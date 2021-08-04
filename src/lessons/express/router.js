'use strict';

const express = require(`express`);

const companyRouter = require(`./routes/company`);
const newsRouter = require(`./routes/news`);

const DEFAULT_PORT = 3000;

const app = express();
app.use(`/company`, companyRouter);
app.use(`/news`, newsRouter);

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
