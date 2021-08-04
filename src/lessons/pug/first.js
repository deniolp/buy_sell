'use strict';

const express = require(`express`);

const PORT = 3000;

const app = express();
app.set(`views`, `src/lessons/pug/templates`);
app.set(`view engine`, `pug`);

app.get(`/`, (req, res) => {
  const pageContent = {
    title: `Главная страница`,
    header: `Шаблонизатор в действии`,
    description: `Страница сформирована при помощи шаблонизатора Pug`
  };

  res.render(`index`, pageContent);
});

app.get(`/emails`, (req, res) => {
  const pageContent = {
    title: `Emails list`,
    header: `Контакты`,
    emails: [
      `test@mail.ru`,
      `keks@htmlacademy.ru`,
    ],
  };

  res.render(`emails`, pageContent);
});

app.get(`/page`, (req, res) => {
  res.render(`page`, {title: `Пример заголовка страницы`});
});

app.listen(PORT);
