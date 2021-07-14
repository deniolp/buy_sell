'use strict';

const express = require(`express`);
const request = require(`supertest`);

const category = require(`./category`);
const DataService = require(`../data-service/category`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `A62j9X`,
    "category": [
      `Игры`,
      `Животные`,
      `Посуда`,
      `Книги`
    ],
    "description": `Это настоящая находка для коллекционера! Кажется, что это хрупкая вещь. Пользовались бережно и только по большим праздникам. При покупке с меня бесплатная доставка в черте города.`,
    "picture": `item07.jpg`,
    "title": `Куплю детские санки`,
    "type": `sale`,
    "sum": 71515,
    "comments": [
      {
        "id": `qf5Mj2`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле.`
      }
    ]
  },
  {
    "id": `imDtZx`,
    "category": [
      `Посуда`,
      `Игры`,
      `Книги`
    ],
    "description": `Таких предложений больше нет! При покупке с меня бесплатная доставка в черте города. Кажется, что это хрупкая вещь. Кому нужен этот новый телефон, если тут такое...`,
    "picture": `item06.jpg`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "type": `offer`,
    "sum": 87442,
    "comments": [
      {
        "id": `z16OG1`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте?`
      },
      {
        "id": `ri8_4b`,
        "text": `Оплата наличными или перевод на карту? Совсем немного... Вы что?! В магазине дешевле.`
      },
      {
        "id": `F6MGPV`,
        "text": `С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле.`
      },
      {
        "id": `9PJaW-`,
        "text": `Совсем немного... Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво?`
      }
    ]
  },
  {
    "id": `QUgAUL`,
    "category": [
      `Игры`,
      `Посуда`,
      `Книги`,
      `Разное`
    ],
    "description": `Не пытайтесь торговаться. Цену вещам я знаю. Кажется, что это хрупкая вещь. Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки.`,
    "picture": `item02.jpg`,
    "title": `Куплю детские санки`,
    "type": `sale`,
    "sum": 56901,
    "comments": [
      {
        "id": `Ir9rx7`,
        "text": `А сколько игр в комплекте? Совсем немного...`
      },
      {
        "id": `9uLpGh`,
        "text": `Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `rznciA`,
        "text": `Продаю в связи с переездом. Отрываю от сердца.`
      }
    ]
  }
];

const app = express();
app.use(express.json());
category(app, new DataService(mockData));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 5 categories`, () => expect(response.body.length).toBe(5));

  test(`Category names are "Журналы", "Игры", "Животные"`,
      () => expect(response.body).toEqual(
          expect.arrayContaining([`Игры`, `Животные`, `Посуда`, `Книги`, `Разное`])
      ));
});
