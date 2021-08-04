'use strict';

const axios = require(`axios`);

const URL_API = `https://jsonplaceholder.typicode.com/comments?postId=1`;

const getData = (cb) => {
  axios.get(URL_API)
  .then((response) => {
    cb(response.data);
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`);
  });
};

test(`the data is array`, (done) => {
  const cb = (result) => {
    expect(Array.isArray(result)).toBeTruthy();

    done();
  };

  getData(cb);
});

test(`all array's items have postId and it is equal 1`, (done) => {
  const cb = (result) => {
    for (const item of result) {
      expect(item.postId).toBeTruthy();
      expect(item.postId).toBe(1);
    }

    done();
  };

  getData(cb);
});
