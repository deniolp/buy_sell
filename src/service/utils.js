'use strict';

const fs = require(`fs`).promises;

const {getLogger} = require(`./lib/logger`);

const logger = getLogger({
  name: `api-server-utils`,
});

const readContent = async (fileName) => {
  try {
    const content = await fs.readFile(`./data/${fileName}.txt`, `utf8`);
    const contentArray = content.split(`\n`);
    contentArray.pop();
    return contentArray;
  } catch (err) {
    logger.error(`Can't read file ${fileName}.`);
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
    logger.error(`Can't create mock data.`);
    return mockData;
  }
};

/**
 * Перетасовка массива
 * @param {Array} array
 * @return {Array}
 */
const shuffle = (array) => {
  const resultArray = array.slice();
  for (let i = resultArray.length - 1; i > 0; i--) {
    const randomNumber = Math.floor(Math.random() * (i + 1));
    [resultArray[randomNumber], resultArray[i]] = [resultArray[i], resultArray[randomNumber]];
  }
  return resultArray;
};

/**
 * Возвращает случайное число в диапазоне
 * `min` и `max`.
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ensureArray = (value) => Array.isArray(value) ? value : [value];

const getPictureFileName = (number) => number >= 10 ? `item${number}.jpg` : `item0${number}.jpg`;

module.exports = {
  shuffle,
  getRandomNumber,
  ensureArray,
  getPictureFileName,
  makeMockData
};
