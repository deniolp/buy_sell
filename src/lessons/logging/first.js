'use strict';

const express = require(`express`);

const PORT = 3000;

const app = express();

app.use((req, res, next) => {
  console.log(`Start request to url: ${req.url}`);
  next();
});

app.get(`/`, (req, res) => {
  res.send(`Hello!`);
  console.log(`End request with status code ${res.statusCode}`);
});

app.use((req, res) => {
  res.status(400).send(`Not found`);
  console.error(`End request with error ${res.statusCode}`);
});

app.listen(PORT, () => {
  console.log(`server start on ${PORT}`);
})
  .on(`error`, (err) => {
    console.error(`Server can't start. Error: ${err}`);
  });
