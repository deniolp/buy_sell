'use strict';

const {Router} = require(`express`);

const getMockData = require(`../lib/get-mock-data`);
const {HttpCode} = require(`../../constants`);

const offersRouter = new Router();

offersRouter.get(`/`, async (req, res) => {
  try {
    const mocks = await getMockData();
    res.json(mocks);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

module.exports = offersRouter;
