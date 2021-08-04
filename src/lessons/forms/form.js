'use strict';

const express = require(`express`);

const PORT = 3000;

const app = express();
app.use(express.urlencoded({extended: false}));
app.set(`views`, `src/lessons/pug/templates`);
app.set(`view engine`, `pug`);

app.get(`/form`, (req, res) => {
  res.render(`form`, {
    title: `Форма`,
    header: `Express и формы`,
  });
});

app.post(`/form`, (req, _res) => {
  console.log(req.body);
});

app.listen(PORT);
