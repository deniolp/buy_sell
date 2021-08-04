'use strict';

// 9
setImmediate(() => console.log(`setImmediate`));

setTimeout(() => {
  // 5
  console.log(`setTimeout 2`);
  // 6
  Promise.resolve(`promise 0`)
    .then(console.log);
});

setTimeout(() => {
  // 7
  console.log(`setTimeout 1`);
  // 8
  process.nextTick(() => console.log(`nextTick 1`));
});

// 3
Promise.resolve(`promise 1`)
  .then(console.log);

new Promise((resolve) => {
  // 1
  console.log(`promise 2`);
  // 4
  resolve(`promise resolved`);
})
  .then(console.log);

// 2
process.nextTick(() => console.log(`nextTick 2`));
