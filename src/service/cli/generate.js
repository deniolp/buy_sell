'use strict';

const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);

const utils = require(`./../utils`);
const {getLogger} = require(`../lib/logger`);
const {
  MAX_DATA_COUNT,
  ExitCode,
  TXT_FILES_DIR,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  OfferType,
  SumRestrict,
  PictureRestrict
} = require(`./../../constants`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const getPictureFileName = (number) => `item${number.toString().padStart(2, 0)}.jpg`;

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: utils.shuffle(comments)
      .slice(0, utils.getRandomNumber(1, 3))
      .join(` `),
  }))
);

const generateOffers = (count, mockData) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    category: utils.shuffle(mockData.categories).slice(0, utils.getRandomNumber(1, mockData.categories.length - 1)),
    description: utils.shuffle(mockData.sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(utils.getRandomNumber(PictureRestrict.min, PictureRestrict.max)),
    title: mockData.titles[utils.getRandomNumber(0, mockData.titles.length - 1)],
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: utils.getRandomNumber(SumRestrict.MIN, SumRestrict.MAX),
    comments: generateComments(utils.getRandomNumber(1, MAX_COMMENTS), mockData.comments)
  }))
);

const logger = getLogger({name: `generate`});

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    if (count >= MAX_DATA_COUNT) {
      logger.error(`Не больше 1000 объявлений`);
      process.exit(ExitCode.error);
    }
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const files = await fs.readdir(TXT_FILES_DIR);
    const mockData = await utils.makeMockData(files);
    const content = JSON.stringify(generateOffers(countOffer, mockData), null, 2);

    try {
      await fs.writeFile(FILE_NAME, content);
      logger.info(`Operation success. File created.`);
    } catch (error) {
      logger.error(`Can't write data to file...`);
      process.exit(ExitCode.error);
    }
  }
};
