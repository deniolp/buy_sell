'use strict';

const express = require(`express`);

const PORT = 3000;

const app = express();

app.get(`/:id`, (req, res, next) => {
  const id = +req.params.id;

  if (id === 100) {
    res.send(`You are lucky!`);
  } else {
    next();
  }
});

app.get(`/:id`, (req, res) => {
  const {id} = req.params;

  res.send(`Your id: ${id}`);
});

app.listen(PORT);
