'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const categoryAPI = require(`./category`);
const DataService = require(`../data-service/category`);
const {HttpCode} = require(`../../constants`);

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
  `Животные`,
  `Журналы`,
  `Игры`
];

const mockOffers = [
  {
    "categories": [
      `Игры`,
      `Животные`
    ],
    "description": `Это настоящая находка для коллекционера! Кажется, что это хрупкая вещь. Пользовались бережно и только по большим праздникам. При покупке с меня бесплатная доставка в черте города.`,
    "picture": `item07.jpg`,
    "title": `Куплю детские санки`,
    "type": `sale`,
    "sum": 71515,
    "comments": [
      {
        "text": `Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле.`
      }
    ]
  },
  {
    "categories": [
      `Игры`,
      `Журналы`
    ],
    "description": `Таких предложений больше нет! При покупке с меня бесплатная доставка в черте города. Кажется, что это хрупкая вещь. Кому нужен этот новый телефон, если тут такое...`,
    "picture": `item06.jpg`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "type": `offer`,
    "sum": 87442,
    "comments": [
      {
        "text": `Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте?`
      },
      {
        "text": `Оплата наличными или перевод на карту? Совсем немного... Вы что?! В магазине дешевле.`
      },
      {
        "text": `С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле.`
      },
      {
        "text": `Совсем немного... Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво?`
      }
    ]
  },
  {
    "categories": [
      `Игры`,
      `Журналы`,
      `Животные`
    ],
    "description": `Не пытайтесь торговаться. Цену вещам я знаю. Кажется, что это хрупкая вещь. Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки.`,
    "picture": `item02.jpg`,
    "title": `Куплю детские санки`,
    "type": `sale`,
    "sum": 56901,
    "comments": [
      {
        "text": `А сколько игр в комплекте? Совсем немного...`
      },
      {
        "text": `Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "text": `Продаю в связи с переездом. Отрываю от сердца.`
      }
    ]
  }
];

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDB(mockDB, {categories: mockCategories, offers: mockOffers, users: mockUsers});
  categoryAPI(app, new DataService(mockDB));
});

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 3 categories`, () => expect(response.body.length).toBe(3));

  test(`Category titles are "Журналы", "Игры", "Животные"`,
      () => expect(response.body.map((it) => it.title)).toEqual(
          expect.arrayContaining([`Журналы`, `Игры`, `Животные`])
      ));
});
