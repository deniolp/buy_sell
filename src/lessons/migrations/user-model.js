/* eslint-disable new-cap */
'use strict';
const Sequelize = require(`sequelize`);

const sequelize = new Sequelize(`db_migrations`, `postgres`, ``, {
  host: `localhost`,
  dialect: `postgres`
});

const UserModel = sequelize.define(`User`, {
  email: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: false
  },
  phone: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: true
  },
  name: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: false,
  }
}, {
  tableName: `users`,
  sequelize,
  timestamps: false,
});

// const initDB = async () => {
//   await sequelize.sync({force: true});
//   await UserModel.create({
//     email: `arteta@gmail.com`,
//     password: `12345`,
//     phone: `9123456789`,
//     name: `Иван Сидоров`,
//   });
// };

// initDB();

module.exports = UserModel;
