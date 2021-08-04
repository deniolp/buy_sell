'use strict';

const {Router} = require(`express`);

const {getAPI} = require(`../api`);

const OFFERS_PER_PAGE = 8;

const mainRouter = new Router();
const api = getAPI();

mainRouter.get(`/`, async (req, res) => {
  let {page = 1} = req.query;
  page = +page;

  const limit = OFFERS_PER_PAGE;
  const offset = (page - 1) * OFFERS_PER_PAGE;

  const [{count, offers}, categories] = await Promise.all([
    api.getOffers({limit, offset, comments: false}),
    api.getCategories(true)
  ]);

  const totalPages = Math.ceil(count / OFFERS_PER_PAGE);
  res.render(`main`, {offers, categories, page, totalPages});
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
