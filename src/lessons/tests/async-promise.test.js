'use strict';

const axios = require(`axios`);

const URL_API = `https://jsonplaceholder.typicode.com/comments?postId=1`;

const getData = (url) => {
  return axios.get(url)
  .then((response) => response.data)
  .catch((err) => {
    console.log(`Error: ${err.message}`);
    return Promise.reject(`error`);
  });
};

test(`the data is array`, () => {
  return getData(URL_API).then((result) => {
    expect(Array.isArray(result)).toBeTruthy();
  });
});

test(`all array's items have postId and it is equal 1`, () => {
  return getData(URL_API).then((result) => {
    for (const item of result) {
      expect(item.postId).toBeTruthy();
      expect(item.postId).toBe(1);
    }
  });
});


// Можно с помощью resolves
test(`the data is array -- second way`, () => {
  return expect(getData(URL_API)).resolves.toBeArray();
});

// Проверить на reject можно с помощью rejects
test(`the data is not array`, () => {
  return expect(getData(`jsol`)).rejects.toMatch(`error`);
});
