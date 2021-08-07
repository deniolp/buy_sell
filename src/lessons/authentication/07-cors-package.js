'use strict';

const express = require(`express`);
const cors = require(`cors`);
const app = express();
const port = 3000;

const allowedDomains = [
  `http://www.domainA.com`,
  `http://www.domainB.com`,
  `http://www.domainC.com`
];

app.use(cors({
  origin: (origin, callback) => {
    if (!allowedDomains.includes(origin)) {
      const msg = `Доступ ограничен`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Ваши настройки
app.listen(port, () => console.log(`Server listening on port ${port}!`));
