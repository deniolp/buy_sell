'use strict';

const express = require(`express`);

const userRouter = require(`./user-route`);

const app = express();
app.use(express.json());

const PORT = 3000;

app.use(`/users`, userRouter);
app.listen(PORT, () => console.info(`Server started`));
