'use strict';

const {Client} = require(`pg`);

const connectionString = `postgres://academy:123456@localhost/phonebook`;
const client = new Client(connectionString);

(async () => {
  await client.connect();
  const sql = `SELECT * FROM accounts`;
  const {rows} = await client.query(sql);
  console.table(rows);
  client.end();
})();
