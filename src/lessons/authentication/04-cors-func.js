'use strict';

const express = require(`express`);
const path = require(`path`);
const app = express();
const port = 3000;

const setAccessControlHeader = (res) => {
  res.headers[`Access-Control-Allow-Origin`] = `*`;
};

app.get(`/styles`, (req, res) => {
  setAccessControlHeader(res);
  res.sendFile(path.join(__dirname, `styles/style.css`));
});

app.get(`/scripts`, (req, res) => {
  setAccessControlHeader(res);
  res.sendFile(path.join(__dirname, `scripts/script.js`));
});

app.get(`/private-scripts`, (req, res) => {
  res.sendFile(path.join(__dirname, `scripts/private-script.js`));
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
