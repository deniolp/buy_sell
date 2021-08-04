'use strict';

const express = require(`express`);

const PORT = 3000;
const PUBLIC_DIR = `src/lessons/middlewares/public`;

const app = express();
app.use(express.static(PUBLIC_DIR));

app.get(`/`, (req, res) => {
  res.send(`<!doctype html>
  <html lang="ru">
    <head>
      <title>Hello, world</title>
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
      <h1>Hello, world!</h1>
    </body>
  `);
});

app.listen(PORT);
