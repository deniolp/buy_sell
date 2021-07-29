'use strict';

const fs = require(`fs`).promises;

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const Aliase = require(`../models/aliase`);
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

    try {
      const {Category, Offer, User} = defineModels(sequelize);
      const result = await sequelize.sync({force: true});
      logger.info(`Successfully created ${result.config.database} database`);

      const categoryModels = await Category.bulkCreate(
          categories.map((item) => ({
            title: item,
            picture: `picture.png`,
          }))
      );

      const categoryIdByName = categoryModels.reduce((acc, next) => ({
        [next.title]: next.id,
        ...acc
      }), {});

      const userModels = await User.bulkCreate(users, {include: [Aliase.OFFERS, Aliase.COMMENTS]});

      const userIdByEmail = userModels.reduce((acc, next) => ({
        [next.email]: next.id,
        ...acc
      }), {});

      offers.forEach((offer) => {
        offer.userId = userIdByEmail[offer.user];
        offer.comments.forEach((comment) => {
          comment.userId = userIdByEmail[comment.user];
        });
      });

      const offerPromises = offers.map(async (offer) => {
        const offerModel = await Offer.create(offer, {include: [Aliase.COMMENTS]});
        await offerModel.addCategories(
            offer.categories.map(
                (title) => categoryIdByName[title]
            )
        );
      });

      await Promise.all(offerPromises);

      logger.info(`Successfully filled ${result.config.database} database`);
      sequelize.close();
    } catch (error) {
      logger.error(error);
    }
  }
};
