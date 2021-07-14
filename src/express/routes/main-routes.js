'use strict';

const {Router} = require(`express`);

const {getAPI} = require(`../api`);

const mainRouter = new Router();
const api = getAPI();

mainRouter.get(`/`, async (req, res) => {
  const offers = await api.getOffers();
  res.render(`main`, {offers});
});
mainRouter.get(`/register`, (req, res) => {
  res.render(`register`, {});
});
mainRouter.get(`/login`, (req, res) => {
  res.render(`login`, {});
});
mainRouter.get(`/search`, (req, res) => {
  res.render(`search-result`, {});
});

module.exports = mainRouter;
