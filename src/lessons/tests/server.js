'use strict';

const express = require(`express`);

const apiRoutes = require(`./routes`);

const app = express();

app.use(express.json());

app.use(`/api`, apiRoutes);

app.use((req, res) => res.status(404).send({ok: false}));

module.exports = app;
