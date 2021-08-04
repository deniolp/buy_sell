'use strict';

const fs = require(`fs`).promises;

const printFiles = async (path) => {
  try {
    const files = await fs.readdir(path);
    console.log(files);
  } catch (error) {
    console.log(`Произошла ошибка: ${error}`);
  }
};

printFiles(__dirname);
console.log(`Список файлов: `);
