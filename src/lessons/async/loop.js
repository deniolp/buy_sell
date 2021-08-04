'use strict';

const fs = require(`fs`);

const TIMEOUT = 1000;

// 1
console.log(`Привет мир!`);

// 9
setTimeout(() => console.log(`Привет, из setTimeout`), TIMEOUT);

// 6
setTimeout(() => console.log(`Привет из setTimeout (0)`), 0);

// 7
setImmediate(() => console.log(`Привет из setImmediate`));

// 4
process.nextTick(() => console.log(`Привет, из nextTick`));

// 2
fs.readFileSync(__filename);
console.log(`Контент прочитан синхронно.`);

// 8
fs.readFile(__filename, () => console.log(`Контент прочитан асинхронно.`));

// 5
new Promise((resolve) => resolve(`Привет, из промиса`))
  .then(console.log);

// 3
console.log(`Конец`);
