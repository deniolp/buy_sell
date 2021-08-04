'use strict';

const Sequelize = require(`sequelize`);

(async () => {
  const sequelize = new Sequelize(`library`, `academy`, `123456`, {
    host: `localhost`,
    dialect: `postgres`,
  });

  const Reader = require(`./models/reader`)(sequelize);

  const id = 1;
  const entry = await Reader.findByPk(id);
  entry.birthDate = new Date(`1990-02-03`);
  entry.lastname = `Sidorov`;
  await entry.save();

  sequelize.close();
})();
