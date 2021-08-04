'use strict';

const axios = require(`axios`);

const URL_API = `https://jsonplaceholder.typicode.com/comments?postId=1`;

const getData = async (url) => {
  try {
    const result = await axios.get(url);
    return result.data;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return Promise.reject(new Error(`error`));
  }
};

test(`the data is array`, async () => {
  const data = await getData(URL_API);
  expect(Array.isArray(data)).toBeTruthy();
});

test(`all array's items have postId and it is equal 1`, async () => {
  const data = await getData(URL_API);
  for (const item of data) {
    expect(item.postId).toBeTruthy();
    expect(item.postId).toBe(1);
  }
});

test(`the data is array -- second way`, async () => {
  await expect(getData(URL_API)).resolves.toBeArray();
});

test(`the data is not array`, async () => {
  await expect(getData(`hgg`)).rejects.toThrow(`error`);
});
