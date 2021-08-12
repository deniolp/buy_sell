'use strict';

const express = require(`express`);
const expressSession = require(`express-session`);
const path = require(`path`);

const router = require(`./routes/app-router`);

const PORT = 4000;
const SECRET = `hryak87inde!`;

const app = express();

app.set(`views`, path.resolve(__dirname, `views`));
app.set(`view engine`, `pug`);

app.use(expressSession({
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  name: `session_id`,
}));

app.use(express.urlencoded({extended: false}));
app.use(`/`, router);

app.listen(PORT);
