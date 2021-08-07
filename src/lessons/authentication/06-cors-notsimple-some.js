'use strict';

const express = require(`express`);
const app = express();
const port = 3000;

const allowedDomains = [
  `http://www.domainA.com`,
  `http://www.domainB.com`,
  `http://www.domainC.com`
];

const allowedMethods = [
  `DELETE`,
  `PUT`,
  `COPY`
];

app.use((req, res, next) => {
  if (allowedDomains.includes(req.headers[`Origin`])) {
    res.headers[`Access-Control-Allow-Origin`] = `*`;
  }
  next();
});

app.options(`/`, (req, res) => {
  res.headers[`Access-Control-Allow-Method`] = allowedMethods.join(`,`);
  res.sendStatus(200);
});

app.delete(`/user`, (_req, _res) => {
  // Выполняем запрос
});

app.put(`/user`, (_req, _res) => {
  // Выполняем запрос
});

app.copy(`/user`, (_req, _res) => {
  // Выполняем запрос
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
