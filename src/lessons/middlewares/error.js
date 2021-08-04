'use strict';

const express = require(`express`);

const PORT = 3000;

const app = express();

app.get(`/`, (_req, _res) => {
  throw new Error(`Oops`);
});

app.get(`/:id`, (req, res) => {
  const {id} = req.params;

  res.send(`Your id: ${id}`);
});

app.use((err, req, res, _next) => {
  res.status(500).send(`Oops, something went wrong!`);
});

app.listen(PORT);
