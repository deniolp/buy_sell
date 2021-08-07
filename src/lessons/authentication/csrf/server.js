'use strict';

const cookieParser = require(`cookie-parser`);
const csrf = require(`csurf`);
const express = require(`express`);
const path = require(`path`);

const csrfProtection = csrf({cookie: true});
const parseForm = express.urlencoded({extended: false});

const app = express();

app.use(cookieParser());
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.get(`/form`, csrfProtection, (req, res) => {
  // Генерируем токен и добавляем в форму
  res.render(`form`, {csrf: req.csrfToken()});
});

app.post(`/transfer`, parseForm, csrfProtection, (req, res) => {
  // Если всё прошло успешно, то возвращаем ответ
  res.send(`Успех`);
});

app.listen(3000);
