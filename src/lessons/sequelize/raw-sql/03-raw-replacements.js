'use strict';

const {sequelize} = require(`../db`);

(async () => {
  const sql = `SELECT * FROM "Books" WHERE "Books".title = :title`;
  const title = `Черновик`;

  const type = sequelize.QueryTypes.SELECT;
  let replacements = {title};
  const books = await sequelize.query(sql, {type, replacements});

  const sql2 = `SELECT * FROM "Books" WHERE "Books".title = ?`;
  const title2 = `Лабиринт отражений`;

  replacements = [title2];
  const books2 = await sequelize.query(sql2, {type, replacements});

  sequelize.close();

  console.log(books);
  console.log(books2);
})();
