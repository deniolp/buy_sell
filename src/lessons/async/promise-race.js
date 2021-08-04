'use strict';

const TIMEOUT = 1000;

const makeThing = (number) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(`Это действие №${number}`);
    }, TIMEOUT);
  });
};

const firstThing = makeThing(1);
const secondThing = makeThing(2);
const thirdThing = makeThing(3);

Promise.race([
  secondThing,
  firstThing,
  thirdThing
])
  .then((value) => console.log(value));
