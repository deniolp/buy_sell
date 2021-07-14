'use strict';

require(`dotenv`).config();

module.exports = {
  APP_URL: process.env.APP_URL || `http://localhost`,
  APP_PORT: process.env.APP_PORT || 8080,
  API_PORT: process.env.API_PORT || 3000,
};
