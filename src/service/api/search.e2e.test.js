'use strict';

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `ToUQpJ`,
    "categories": [
      `Книги`
    ],
    "description": `Пользовались бережно и только по большим праздникам. Кажется, что это хрупкая вещь. Не пытайтесь торговаться. Цену вещам я знаю. Мой дед не мог её сломать.`,
    "picture": `item13.jpg`,
    "title": `Продам советскую посуду. Почти не разбита`,
    "type": `offer`,
    "sum": 56540,
    "comments": [
      {
        "id": `7nb8Ht`,
        "text": `Оплата наличными или перевод на карту?`
      },
      {
        "id": `xfUsFI`,
        "text": `Неплохо, но дорого.`
      },
      {
        "id": `fYSG_h`,
        "text": `Оплата наличными или перевод на карту? Почему в таком ужасном состоянии?`
      }
    ]
  },
  {
    "id": `VvUFj4`,
    "categories": [
      `Игры`,
      `Посуда`,
      `Книги`,
      `Журналы`
    ],
    "description": `Не пытайтесь торговаться. Цену вещам я знаю. Мой дед не мог её сломать. Таких предложений больше нет! Кажется, что это хрупкая вещь.`,
    "picture": `item07.jpg`,
    "title": `Куплю антиквариат`,
    "type": `sale`,
    "sum": 7788,
    "comments": [
      {
        "id": `Fl1Mh2`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Совсем немного...`
      },
      {
        "id": `PWJwO7`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте?`
      },
      {
        "id": `ijypsW`,
        "text": `А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца.`
      }
    ]
  },
  {
    "id": `Jv27n1`,
    "categories": [
      `Журналы`,
      `Разное`,
      `Посуда`,
      `Книги`,
      `Игры`
    ],
    "description": `Пользовались бережно и только по большим праздникам. Кажется, что это хрупкая вещь. Товар в отличном состоянии. Продаю с болью в сердце...`,
    "picture": `item14.jpg`,
    "title": `Куплю породистого кота`,
    "type": `offer`,
    "sum": 12926,
    "comments": [
      {
        "id": `Ema1kp`,
        "text": `Вы что?! В магазине дешевле.`
      },
      {
        "id": `EBnzQU`,
        "text": `Почему в таком ужасном состоянии? С чем связана продажа? Почему так дешёво? А сколько игр в комплекте?`
      },
      {
        "id": `lCauQ1`,
        "text": `Почему в таком ужасном состоянии?`
      },
      {
        "id": `WeXaN-`,
        "text": `Почему в таком ужасном состоянии? Неплохо, но дорого. Оплата наличными или перевод на карту?`
      }
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns offer based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Продам`
      });
  });

  test(`status code is 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`output have to contain array with search results`, () => expect(Array.isArray(response.body)).toBeTruthy());

  test(`1 offer found`, () => expect(response.body.length).toBe(1));

  test(`each item of search results should have title property`, () => {
    for (const item of response.body) {
      expect(item).toHaveProperty(`title`);
    }
  });

  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`ToUQpJ`));
});

test(`API returns code 404 if nothing is found`,
    () => request(app)
      .get(`/search`)
      .query({
        query: `Продам свою душу`
      })
      .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
      .get(`/search`)
      .expect(HttpCode.BAD_REQUEST)
);
