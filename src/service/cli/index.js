'use strict';

const version = require(`./version`);
const generate = require(`./generate`);
const help = require(`./help`);
const server = require(`./server`);
const fillsql = require(`./fillsql`);
const filldb = require(`./filldb`);

const Cli = {
  [version.name]: version,
  [generate.name]: generate,
  [help.name]: help,
  [server.name]: server,
  [fillsql.name]: fillsql,
  [filldb.name]: filldb,
};

module.exports = {
  Cli
};
