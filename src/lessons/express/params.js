'use strict';

const express = require(`express`);

const port = 3000;
const companies = [
  `HTML Academy`,
  `Microsoft`,
  `Google`,
];

const app = express();
app.use(express.json());

app.get(`/`, (req, _res) => {
  console.log(req.query);
});

app.get(`/company/:id`, (req, res) => {
  const companyId = Number.parseInt(req.params.id, 10);

  if (!companies[companyId]) {
    return res.status(404).end(`Not found`);
  }

  return res.status(200).send(companies[companyId]);
});

app.post(`/company`, (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(port);
