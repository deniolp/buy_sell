'use strict';

const fs = require(`fs`).promises;

const sequelize = require(`../lib/sequelize`);
const initDatabase = require(`../lib/init-db`);
const {getLogger} = require(`../lib/logger`);
const utils = require(`../utils`);
const {
  MAX_DATA_COUNT,
  ExitCode,
  TXT_FILES_DIR,
  MAX_COMMENTS,
  OfferType,
  SumRestrict,
  PictureRestrict
} = require(`./../../constants`);

const users = [
  {
    firstName: `Иван`,
    lastName: `Иванов`,
    email: `arteta@gmail.com`,
    password: `qwertyss`,
    avatar: `image.jpg`,
  },
  {
    firstName: `Сергей`,
    lastName: `Сидоров`,
    email: `barguzin@gmail.com`,
    password: `qwertyss`,
    avatar: `image2.jpg`,
  }
];
const DEFAULT_COUNT = 1;

const logger = getLogger({name: `filldb`});

const getPictureFileName = (number) => `item${number.toString().padStart(2, 0)}.jpg`;

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    text: utils.shuffle(comments)
      .slice(0, utils.getRandomNumber(1, 3))
      .join(` `),
    user: users[utils.getRandomNumber(0, users.length - 1)].email,
  }))
);

const generateOffers = (count, mockData) => (
  Array(count).fill({}).map(() => ({
    categories: utils.shuffle(mockData.categories).slice(0, utils.getRandomNumber(1, mockData.categories.length - 1)),
    description: utils.shuffle(mockData.sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(utils.getRandomNumber(PictureRestrict.min, PictureRestrict.max)),
    title: mockData.titles[utils.getRandomNumber(0, mockData.titles.length - 1)],
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: utils.getRandomNumber(SumRestrict.min, SumRestrict.max),
    comments: generateComments(utils.getRandomNumber(1, MAX_COMMENTS), mockData.comments),
    user: users[utils.getRandomNumber(0, users.length - 1)].email,
  }))
);

module.exports = {
  name: `--filldb`,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

    const [count] = args;
    if (count >= MAX_DATA_COUNT) {
      logger.error(`Не больше 1000 объявлений`);
      process.exit(ExitCode.error);
    }
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const files = await fs.readdir(TXT_FILES_DIR);
    const mockData = await utils.makeMockData(files);
    const categories = await utils.readContent(`categories`);
    const offers = generateOffers(countOffer, mockData);

    return initDatabase(sequelize, {offers, categories, users});
  }
};
