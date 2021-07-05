'use strict';

const {Router} = require(`express`);

const offersRouter = new Router();

offersRouter.get(`/add`, (req, res) => {
  res.render(`new-offer`, {});
});
offersRouter.get(`/:id`, (req, res) => {
  res.render(`offer`, {});
});
offersRouter.get(`/category/:id`, (req, res) => {
  res.render(`category`, {});
});
offersRouter.get(`/edit/:id`, (req, res) => {
  res.render(`offer-edit`, {});
});

module.exports = offersRouter;
