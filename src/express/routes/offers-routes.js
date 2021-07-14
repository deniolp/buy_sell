'use strict';

const {Router} = require(`express`);

const {getAPI} = require(`../api`);

const offersRouter = new Router();
const api = getAPI();

offersRouter.get(`/add`, (req, res) => {
  res.render(`new-offer`, {});
});
offersRouter.get(`/:id`, (req, res) => {
  res.render(`offer`, {});
});
offersRouter.get(`/category/:id`, (req, res) => {
  res.render(`category`, {});
});
offersRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [offer, categories] = await Promise.all([
    api.getOffer(id),
    api.getCategories()
  ]);
  res.render(`offer-edit`, {offer, categories});
});

module.exports = offersRouter;
