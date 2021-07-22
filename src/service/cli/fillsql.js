'use strict';

const fs = require(`fs`).promises;

const {getLogger} = require(`../lib/logger`);
const {getRandomNumber, shuffle, getPictureFileName, makeMockData} = require(`../utils`);
const {TXT_FILES_DIR, OfferType, SumRestrict, PictureRestrict} = require(`../../constants`);

const logger = getLogger({
  name: `api-server-sql`,
});

const FILE_NAME = `fill-db.sql`;
const DEFAULT_COUNT = 5;

const selectType = () => {
  return Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)];
};

const createCategories = (categories) => {
  let result = ``;
  let id = 1;
  for (const category of categories) {
    result = result + `(${id}, '${category}', 'picture.png'),\n`;
    id++;
  }
  return result.trim().slice(0, -1) + `;`;
};

const createOffers = (data, amount) => {
  let result = ``;
  for (let index = 1; index <= amount; index++) {
    result = result + `(${index}, '${selectType()}', '${data.titles[getRandomNumber(0, data.titles.length - 1)]}', '${shuffle(data.sentences).slice(0, getRandomNumber(1, 5)).join(` `)}', '${getRandomNumber(SumRestrict.min, SumRestrict.max)}', '${getPictureFileName(getRandomNumber(PictureRestrict.min, PictureRestrict.max))}', ${getRandomNumber(1, 2)}),\n`;
  }
  return result.trim().slice(0, -1) + `;`;
};

const createComments = (comments, amount) => {
  let result = ``;
  let id = 1;
  for (const comment of comments) {
    result = result + `(${id}, '${comment}', ${getRandomNumber(1, 2)}, ${getRandomNumber(1, amount)}),\n`;
    id++;
  }
  return result.trim().slice(0, -1) + `;`;
};

const createOffersAndCategoriesRelations = (amount, categoriesQty) => {
  let result = ``;
  let id = 1;
  let set;
  for (let i = 0; i < categoriesQty; i++) {
    const offersByCategoryQty = getRandomNumber(1, amount);
    set = new Set();
    for (let k = 0; k < offersByCategoryQty; k++) {
      set.add(`(${getRandomNumber(1, amount)}, ${id}),\n`);
    }
    result = result + [...set].join(``);
    id++;
  }
  return result.trim().slice(0, -1) + `;`;
};

const makeFillSql = (amount, mockData) => {
  return `INSERT INTO users VALUES
(1, 'Иван', 'Иванов', 'arteta@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'image.jpg'),
(2, 'Сергей', 'Сидоров', 'barguzin@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'image2.jpg');
INSERT INTO categories VALUES
${createCategories(mockData.categories)}
INSERT INTO offers VALUES
${createOffers(mockData, amount)}
INSERT INTO comments VALUES
${createComments(mockData.comments, amount)}
INSERT INTO offers_categories VALUES
${createOffersAndCategoriesRelations(amount, mockData.categories.length)}
`;
};

module.exports = {
  name: `--fillsql`,
  async run(args) {
    const [qty] = args;
    const amount = Number.parseInt(qty, 10) || DEFAULT_COUNT;
    const files = await fs.readdir(TXT_FILES_DIR);
    const mockData = await makeMockData(files);
    const content = makeFillSql(amount, mockData);
    try {
      await fs.writeFile(FILE_NAME, content);
      logger.info(`Operation success. File created.`);
    } catch (err) {
      logger.error(`Can't write data to file...`);
    }
  }
};
