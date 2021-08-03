'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const offersAPI = require(`./offers`);
const DataService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);
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
  `Животные`,
  `Посуда`,
  `Марки`,
  `Разное`,
  `Книги`
];

const mockOffers = [
  {
    "categories": [
      `Марки`,
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
        "text": `Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле.`
      }
    ]
  },
  {
    "categories": [
      `Посуда`,
      `Книги`
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

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  await initDB(mockDB, {categories: mockCategories, offers: mockOffers, users: mockUsers});
  const app = express();
  app.use(express.json());
  offersAPI(app, new DataService(mockDB), new CommentService(mockDB));
  return app;
};

describe(`API returns a list of all offers`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 3 offers`, () => expect(response.body.length).toBe(3));

  test(`First offer's title equals "Куплю детские санки"`, () => expect(response.body[0].title).toBe(`Куплю детские санки`));
});

describe(`API returns an offer with given id`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/offers/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Куплю детские санки"`, () => expect(response.body.title).toBe(`Куплю детские санки`));
});

describe(`API creates an offer if data is valid`, () => {
  const newOffer = {
    categories: [1, 2],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `offer`,
    sum: 100500
  };
  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/offers`)
      .send(newOffer);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Offers count is changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

describe(`API refuses to create an offer if data is invalid`, () => {
  const newOffer = {
    categories: [1, 2],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `offer`,
    sum: 100500
  };
  let app;

  beforeAll(async () => {
    app = await createAPI();
  });

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
    categories: [2],
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `offer`,
    sum: 100500
  };
  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .put(`/offers/2`)
      .send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer is really changed`, () => request(app)
    .get(`/offers/2`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );
});

test(`API returns status code 404 when trying to change non-existent offer`, async () => {
  const app = await createAPI();

  const validOffer = {
    categories: [3],
    title: `Это валидный`,
    description: `объект`,
    picture: `объявления`,
    type: `однако`,
    sum: 404
  };

  return request(app)
    .put(`/offers/30`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, async () => {
  const app = await createAPI();

  const invalidOffer = {
    categories: [1, 2],
    title: `Это невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`
  };

  return request(app)
    .put(`/offers/30`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {
  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/offers/1`);
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`Offer count is 2 now`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(2))
  );
});

test(`API refuses to delete non-existent offer`, async () => {
  const app = await createAPI();

  return request(app)
    .delete(`/offers/30`)
    .expect(HttpCode.NOT_FOUND);
});

// COMMENTS

describe(`API returns a list of comments to given offer`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/offers/2/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 4 comments`, () => expect(response.body.length).toBe(4));

  test(`First comment's text is "Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте?"`,
      () => expect(response.body[0].text).toBe(`Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте?`));
});

describe(`API creates a comment if data is valid`, () => {
  const newComment = {
    userId: 1,
    text: `Валидному комментарию достаточно этого поля`
  };
  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/offers/3/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Comments count is changed`, () => request(app)
    .get(`/offers/3/comments`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, async () => {
  const app = await createAPI();

  return request(app)
    .post(`/offers/30/comments`)
    .send({
      userId: 1,
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, async () => {
  const app = await createAPI();

  return request(app)
    .post(`/offers/2/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes a comment`, () => {
  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/offers/1/comments/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Comments count is 0 now`, async () => {
    const res = await request(app).get(`/offers/1/comments`);
    expect(res.body.length).toBe(0);
  }
  );
});

test(`API refuses to delete non-existent comment`, async () => {
  const app = await createAPI();

  return request(app)
    .delete(`/offers/3/comments/100`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete a comment of non-existent offer`, async () => {
  const app = await createAPI();

  return request(app)
    .delete(`/offers/NOEXIST/comments/1`)
    .expect(HttpCode.NOT_FOUND);
});
