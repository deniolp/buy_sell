'use strict';

const Sequelize = require(`sequelize`);

(async () => {
  const sequelize = new Sequelize(`library`, `academy`, `123456`, {
    host: `localhost`,
    dialect: `postgres`,
  });

  const Reader = require(`./models/reader`)(sequelize);

  const newReaders = [
    {
      id: 6,
      firstname: `Ralph`,
      lastname: `Roberts`,
      birthDate: new Date(`1947-08-29`)
    },
    {
      id: 7,
      firstname: `Jon`,
      lastname: `Bon Jovi`,
      birthDate: new Date(`1962-03-02`)
    },
  ];

  try {
    await Reader.bulkCreate(newReaders);
  } catch (error) {
    console.log(error);
  }

  sequelize.close();
})();
