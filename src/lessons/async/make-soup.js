'use strict';

const TIMEOT = 1000;

const makeSoup = () => {
  console.log(`> Иду за продуктами`);
  const products = [`Капуста`, `Картофель`, `Мясо`];
  setTimeout(() => {
    console.log(`> Нарезаю продукты: ${products.join(`, `)}`);
    setTimeout(() => {
      console.log(`> Продукты нарезаны!`);
      setTimeout(() => {
        console.log(`> Начинаю варить суп из: ${products.join(`, `)}`);
        // eslint-disable-next-line max-nested-callbacks
        setTimeout(() => {
          return Math.random() > 0.5
            ? console.log(`> Суп готов!`)
            : console.log(`> Упс! Сломалась плита.`);
        }, TIMEOT);
      }, TIMEOT);
    }, TIMEOT);
  }, TIMEOT);
};

makeSoup();
