'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);
const {HttpCode} = require(`../../constants`);
const initDB = require(`../lib/init-db`);

const mockUsers = [
  {
    firstName: `Иван`,
    lastName: `Иванов`,
    email: `arteta@gmail.com`,
    password: `qwertyss`,
    avatar: `image.jpg`,
  },
  {
    firstName: `Сергей`,
    lastName: `Сидоров`,
    email: `barguzin@gmail.com`,
    password: `qwertyss`,
    avatar: `image2.jpg`,
  }
];

const mockCategories = [
  `Книги`,
  `Цветы`,
  `Животные`,
  `Разное`
];

const mockOffers = [
  {
    "categories": [
      `Книги`,
      `Разное`
    ],
    "description": `Пользовались бережно и только по большим праздникам. Кажется, что это хрупкая вещь. Не пытайтесь торговаться. Цену вещам я знаю. Мой дед не мог её сломать.`,
    "picture": `item13.jpg`,
    "title": `Продам советскую посуду. Почти не разбита`,
    "type": `offer`,
    "sum": 56540,
    "comments": [
      {
        "text": `Оплата наличными или перевод на карту?`
      },
      {
        "text": `Неплохо, но дорого.`
      },
      {
        "text": `Оплата наличными или перевод на карту? Почему в таком ужасном состоянии?`
      }
    ]
  },
  {
    "categories": [
      `Цветы`,
      `Животные`,
    ],
    "description": `Не пытайтесь торговаться. Цену вещам я знаю. Мой дед не мог её сломать. Таких предложений больше нет! Кажется, что это хрупкая вещь.`,
    "picture": `item07.jpg`,
    "title": `Куплю антиквариат`,
    "type": `sale`,
    "sum": 7788,
    "comments": [
      {
        "text": `Продаю в связи с переездом. Отрываю от сердца. Совсем немного...`
      },
      {
        "text": `Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте?`
      },
      {
        "text": `А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца.`
      }
    ]
  },
  {
    "categories": [
      `Разное`
    ],
    "description": `Пользовались бережно и только по большим праздникам. Кажется, что это хрупкая вещь. Товар в отличном состоянии. Продаю с болью в сердце...`,
    "picture": `item14.jpg`,
    "title": `Куплю породистого кота`,
    "type": `offer`,
    "sum": 12926,
    "comments": [
      {
        "text": `Вы что?! В магазине дешевле.`
      },
      {
        "text": `Почему в таком ужасном состоянии? С чем связана продажа? Почему так дешёво? А сколько игр в комплекте?`
      },
      {
        "text": `Почему в таком ужасном состоянии?`
      },
      {
        "text": `Почему в таком ужасном состоянии? Неплохо, но дорого. Оплата наличными или перевод на карту?`
      }
    ]
  }
];

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDB(mockDB, {categories: mockCategories, offers: mockOffers, users: mockUsers});
  search(app, new DataService(mockDB));
});

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

  test(`Offer has correct title`, () => expect(response.body[0].title).toBe(`Продам советскую посуду. Почти не разбита`));
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
