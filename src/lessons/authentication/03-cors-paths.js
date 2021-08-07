'use strict';

const express = require(`express`);
const path = require(`path`);
const app = express();
const port = 3000;

const allowedPaths = [
  `/styles`,
  `/scripts`
];

app.use((req, res, next) => {
  if (allowedPaths.includes(req.path)) {
    res.headers[`Access-Control-Allow-Origin`] = `*`;
  }
  next();
});

app.get(`/styles`, (req, res) => {
  res.sendFile(path.join(__dirname, `styles/style.css`));
});

app.get(`/scripts`, (req, res) => {
  res.sendFile(path.join(__dirname, `scripts/script.js`));
});

app.get(`/private-scripts`, (req, res) => {
  res.sendFile(path.join(__dirname, `scripts/private-script.js`));
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
