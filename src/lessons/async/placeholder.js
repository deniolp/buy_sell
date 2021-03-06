'use strict';

const https = require(`https`);

const loadData = (url, cb) => {
  https.get(url, (res) => {
    let loadedData = ``;

    res.on(`data`, (chunk) => {
      loadedData += chunk;
    });
    res.on(`end`, () => {
      cb(JSON.parse(loadedData).slice(0, 5));
    });
  });
};

const url = `https://jsonplaceholder.typicode.com/posts`;

loadData(url, (posts) => {
  console.log(posts);
});
