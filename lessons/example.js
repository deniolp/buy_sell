'use strict';

const utils = require(`./utils`);

const alphabet = [`А`, `B`, `C`, `D`, `E`, `F`, `G`];

console.log(`Тасование массива:`);
console.log(utils.shuffle(alphabet));

console.log(`Получение случайного числа от 1 до 10`);
console.log(utils.getRandomNumber(1, 10));
