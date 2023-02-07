const { Pool } = require("pg");

const pool = new Pool({
  user: "webuser",
  database: "stocks",
  password: "happytimes",
  port: 5432,
  host: "localhost",
});

module.exports = { pool };
