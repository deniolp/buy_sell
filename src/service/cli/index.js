'use strict';

const version = require(`./version`);
const generate = require(`./generate`);

const Cli = {
  [version.name]: version,
  [generate.name]: generate,
};

module.exports = {
  Cli
};
