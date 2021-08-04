/* eslint-disable new-cap */
'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(
        `ALTER TABLE users RENAME COLUMN phone TO phone_old;` +
        `ALTER TABLE users ADD phone VARCHAR(14);` +
        `UPDATE users SET phone = CONCAT('+7', phone_old) WHERE LENGTH(phone_old) = 10;`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(
        `ALTER TABLE users DROP COLUMN phone;` +
      `ALTER TABLE users RENAME COLUMN phone_old TO phone;`
    );
  }
};
