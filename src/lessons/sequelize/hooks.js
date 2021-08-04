'use strict';

const {db, sequelize} = require(`./db`);

(async () => {
  await db.Author.create({firstname: `Марио`, lastname: `Пьюзо`});
  await sequelize.close();
})();
