'use strict';

// process.argv.forEach((param) => console.log(param));

const [nodePath, appPath, firstParamName, userName, secondParamName, age] = process.argv;

console.log(`--------------`);
console.log(`Привет, ${userName} (параметр ${firstParamName})`);
console.log(`Путь к Node: ${nodePath}`);
console.log(`Путь к текущему сценарию: ${appPath}`);
console.log(`Твой возраст: ${age} (параметр ${secondParamName})`);
