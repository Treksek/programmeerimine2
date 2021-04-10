const mysql = require('mysql2');
const util = require('util');
const { db } = require('./config');

const pool = mysql.createPool({
  host: db.host,
  user: db.user,
  password: db.password,
  });

  pool.query(
    `CREATE SCHEMA IF NOT EXISTS ${db.database}`, () => {
      pool.query(`USE ${db.database}`, () => {
      });
    },
  );

pool.query = util.promisify(pool.query);

module.exports = pool;