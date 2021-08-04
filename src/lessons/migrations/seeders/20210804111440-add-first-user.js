'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(`users`, [{
      email: `arteta@gmail.com`,
      password: `12345`,
      phone: `9123456789`,
      name: `Иван Сидоров`,
    }]
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete(`users`, null, {});
  }
};
