'use strict';

const sum = (a, b) => {
  const result = a + b;
  return result;
};

const good = sum(2, 6);
const bad = sum(3, `a`);

console.log(good, bad);
