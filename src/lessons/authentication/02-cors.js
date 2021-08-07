'use strict';

const express = require(`express`);
const path = require(`path`);
const app = express();
const port = 3000;
const allowedDomains = [
  `http://www.domainA.com`,
  `http://www.domainB.com`,
  `http://www.domainC.com`
];

app.use((req, res, next) => {
  if (allowedDomains.includes(req.headers[`Origin`])) {
    res.headers[`Access-Control-Allow-Origin`] = `*`;
  }
  next();
});

app.get(`/styles`, (req, res) => {
  res.sendFile(path.join(__dirname, `styles/style.css`));
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
