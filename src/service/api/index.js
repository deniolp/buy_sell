'use strict';

const {Router} = require(`express`);

const category = require(`./category`);
const search = require(`./search`);
const offer = require(`./offers`);
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);

const {
  CategoryService,
  SearchService,
  OfferService,
  CommentService,
} = require(`../data-service`);

defineModels(sequelize);

const createApi = async () => {
  const agregatingRouter = new Router();

  category(agregatingRouter, new CategoryService(sequelize));
  offer(agregatingRouter, new OfferService(sequelize), new CommentService(sequelize));
  search(agregatingRouter, new SearchService(sequelize));

  return agregatingRouter;
};

module.exports = createApi;
