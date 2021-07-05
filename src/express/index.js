'use strict';

const express = require(`express`);
const path = require(`path`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;

const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const offersRoutes = require(`./routes/offers-routes`);

const app = express();
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);
app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);


app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
