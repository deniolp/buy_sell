'use strict';

const {Router} = require(`express`);

const {getAPI} = require(`../api`);

const mainRouter = new Router();
const api = getAPI();

mainRouter.get(`/`, async (req, res) => {
  const offers = await api.getOffers({comments: false});
  res.render(`main`, {offers});
});
mainRouter.get(`/register`, (req, res) => {
  res.render(`register`, {});
});
mainRouter.get(`/login`, (req, res) => {
  res.render(`login`, {});
});
mainRouter.get(`/search`, async (req, res) => {
  try {
    const query = req.query.query;
    const results = await api.search(query);

    res.render(`search-result`, {
      results
    });
  } catch (error) {
    res.render(`search-result`, {
      results: []
    });
  }
});

module.exports = mainRouter;
