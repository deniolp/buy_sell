'use strict';

const {Router} = require(`express`);

const category = require(`./category`);
const search = require(`./search`);
const offer = require(`./offers`);
const getMockData = require(`../lib/get-mock-data`);

const {
  CategoryService,
  SearchService,
  OfferService,
  CommentService,
} = require(`../data-service`);

const createApi = async () => {
  const agregatingRouter = new Router();

  const mockData = await getMockData();

  category(agregatingRouter, new CategoryService(mockData));
  offer(agregatingRouter, new OfferService(mockData), new CommentService());
  search(agregatingRouter, new SearchService(mockData));

  return agregatingRouter;
};

module.exports = createApi;
