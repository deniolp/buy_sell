/* eslint-disable new-cap */
'use strict';

const {DataTypes} = require(`sequelize`);

module.exports = {
  up: async (queryInterface) => {
    queryInterface.changeColumn(`users`, `name`, {
      type: DataTypes.STRING(200),
    });
  },

  down: async (queryInterface) => {
    queryInterface.changeColumn(`users`, `name`, {
      type: DataTypes.STRING(50),
    });
  }
};
