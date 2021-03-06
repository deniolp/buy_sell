'use strict';

const express = require(`express`);

require(`./fill-store`);

const authRouter = require(`./routes/user-router`);
const booksRouter = require(`./routes/books-router`);

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(`/user`, authRouter);
app.use(`/`, booksRouter);

app.listen(PORT);
