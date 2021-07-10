'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const utils = require(`./../utils`);
const {
  MAX_DATA_COUNT,
  ExitCode,
  TXT_FILES_DIR,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
} = require(`./../../constants`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const getPictureFileName = (number) => `item${number.toString().padStart(2, 0)}.jpg`;

const readContent = async (fileName) => {
  try {
    const content = await fs.readFile(`./data/${fileName}.txt`, `utf8`);
    const contentArray = content.split(`\n`);
    contentArray.pop();
    return contentArray;
  } catch (err) {
    console.error(chalk.red(`Can't read file ${fileName}.`));
    return [];
  }
};

const makeMockData = async (files) => {
  let mockData = {};
  try {
    for (const file of files) {
      const fileName = file.split(`.`)[0];
      const data = await readContent(fileName);
      mockData[fileName] = data;
    }
    return mockData;
  } catch (error) {
    console.error(chalk.red(`Can't create mock data.`));
    return mockData;
  }
};

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
    picture: getPictureFileName(utils.getRandomNumber(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: mockData.titles[utils.getRandomNumber(0, mockData.titles.length - 1)],
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: utils.getRandomNumber(SumRestrict.MIN, SumRestrict.MAX),
    comments: generateComments(utils.getRandomNumber(1, MAX_COMMENTS), mockData.comments)
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    if (count >= MAX_DATA_COUNT) {
      console.log(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.error);
    }
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const files = await fs.readdir(TXT_FILES_DIR);
    const mockData = await makeMockData(files);
    const content = JSON.stringify(generateOffers(countOffer, mockData), null, 2);

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (error) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  }
};
