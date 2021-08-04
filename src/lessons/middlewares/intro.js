'use strict';

const express = require(`express`);

const PORT = 3000;

const app = express();
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} -- ${new Date().toLocaleTimeString()}`);
  next();
});

app.use((req, res, next) => {
  if (req.path === `/`) {
    res.send(`Hello!`);
  }
  next();
});

app.use((req, res, next) => {
  if (req.path === `/keks`) {
    res.send(`Hello, Keks!`);
  }
  next();
});

app.listen(PORT);
