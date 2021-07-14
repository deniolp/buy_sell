'use strict';

const express = require(`express`);
const request = require(`supertest`);

const offersAPI = require(`./offers`);
const OfferService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);
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

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  offersAPI(app, new OfferService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all offers`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 3 offers`, () => expect(response.body.length).toBe(3));

  test(`First offer's id equals "A62j9X"`, () => expect(response.body[0].id).toBe(`A62j9X`));
});

describe(`API returns an offer with given id`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/A62j9X`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Куплю детские санки"`, () => expect(response.body.title).toBe(`Куплю детские санки`));
});

describe(`API creates an offer if data is valid`, () => {
  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `offer`,
    sum: 100500
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers`)
      .send(newOffer);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offers count is changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

describe(`API refuses to create an offer if data is invalid`, () => {
  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `offer`,
    sum: 100500
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent offer`, () => {
  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `offer`,
    sum: 100500
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/offers/A62j9X`)
      .send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed offer`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offer is really changed`, () => request(app)
    .get(`/offers/A62j9X`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );
});

test(`API returns status code 404 when trying to change non-existent offer`, () => {
  const app = createAPI();

  const validOffer = {
    category: `Это`,
    title: `валидный`,
    description: `объект`,
    picture: `объявления`,
    type: `однако`,
    sum: 404
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, () => {
  const app = createAPI();

  const invalidOffer = {
    category: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/A62j9X`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`A62j9X`));

  test(`Offer count is 3 now`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(3))
  );

});

test(`API refuses to delete non-existent offer`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/offers/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});
