'use strict';

const makePizza = (title, cb) => {
  console.log(`Заказ на приготовление пиццы «${title}» получен. Начинаем готовить…`);
  setTimeout(cb, 3000);
};

const readBook = () => {
  console.log(`Читаю книгу…`);
};

const eatPizza = (drink) => {
  console.log(`Ура! Пицца готова, пора подкрепиться и выпить ${drink}.`);
};

makePizza(`Pepperoni`, eatPizza.bind(null, `Coca-Cola`));
readBook();
