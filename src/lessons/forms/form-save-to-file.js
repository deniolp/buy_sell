'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;

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

app.post(`/form`, async (req, res) => {
  const form = req.body;
  const jsonForm = JSON.stringify(form);
  const fileName = `form-${Date.now()}.json`;

  try {
    await fs.writeFile(`src/lessons/forms/savings/${fileName}`, jsonForm);
    res.send(`Ваши данные успешно сохранены в файл ${fileName}`);
  } catch (err) {
    res.send(`Возникла ошибка сохранения: ${err.message}`);
  }
});

app.listen(PORT);
