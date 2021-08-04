'use strict';

const request = require(`supertest`);
const server = require(`./server`);

describe(`Books API end-points`, () => {
  test(`When get books status code should be 200`, async () => {
    const res = await request(server).get(`/api/books`);
    expect(res.statusCode).toBe(200);
  });

  test(`Should had properties id and title`, async () => {
    const res = await request(server).get(`/api/books/2`);
    expect(res.body).toHaveProperty(`id`);
    expect(res.body).toHaveProperty(`title`);
  });

  test(`Should retrieve book with title 'The Outsider'`, async () => {
    const res = await request(server)
      .post(`/api/books`)
      .send({title: `The Outsider`});

    const id = parseInt(res.body.id, 10);
    const bookResponse = await request(server)
      .get(`/api/books/${id}`);

    expect(bookResponse.body.title).toBe(`The Outsider`);
  });

  test(`Should 400 because name property doesn't exist`, async () => {
    const res = await request(server)
      .post(`/api/books`)
      .send({name: `The Outsider`});
    expect(res.statusCode).toBe(400);
  });
});

