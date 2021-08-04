'use strict';

const readline = require(`readline`);
const chalk = require(`chalk`);
const utils = require(`../../../src/service/utils`);

const welcomeText = `
          Добро пожаловать в игру
              «Угадай число»
                |\\---/|
                | o_o |
                 \\_^_/
Привет, я Кекс. Мне нравится загадывать числа.
Всё честно: вы назовёте максимальное число, а я
загадаю случайное число в диапазоне от нуля до предложенного вами числа.
Попробуйте его угадать. Количество попыток не ограничено.`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const showWinMessage = (secretNumber) => {
  console.log(chalk.magenta(`
  |\\---/|
  | o_o | Ура! Вы угадали число.
   \\_^_/  Я действительно загадал ${secretNumber}.
  `));

  rl.close();
};

const checkAnswer = (secretNumber) => {
  rl.question(chalk.blueBright(`Ваш ответ: `), (inputNumber) => {
    const userAnswer = Number.parseInt(inputNumber, 10);

    if (userAnswer === secretNumber) {
      return showWinMessage(secretNumber);
    }

    console.log(chalk.redBright(`Промазал. Попробуй ещё.`));
    return checkAnswer(secretNumber);
  });
};

const startGame = () => {
  console.log(chalk.green(welcomeText));

  rl.question(chalk.bgYellow(`Максимальное число: `), (maxNumber) => {
    const myNumber = utils.getRandomNumber(0, Number.parseInt(maxNumber, 10));

    checkAnswer(myNumber);
  });
};

startGame();
