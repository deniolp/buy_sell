/* eslint-disable new-cap */
'use strict';

const Sequelize = require(`sequelize`);

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(`users`, {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
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
        allowNull: true
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(`users`);
  }
};
