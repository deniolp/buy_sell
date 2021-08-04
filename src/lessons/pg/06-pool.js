'use strict';

const {Pool} = require(`pg`);

const pool = new Pool({
  host: `localhost`,
  port: 5432,
  database: `phonebook`,
  user: `academy`,
  password: `12345`,
});

(async () => {
  const client = await pool.connect();
  const sql = `SELECT * FROM accounts`;
  const {rows} = await client.query(sql);
  client.release();

  console.table(rows);

  pool.end();
})();
