const { pool } = require("./pg-helper");

async function insertData(ticker, price, entrydate) {
  try {
    const res = await pool.query(
      "INSERT INTO daily(ticker, price, entrydate) VALUES ($1, $2, $3)",
      [ticker, price, entrydate]
    );
    console.log(`Added a stock with the name ${ticker}`);
    console.log(ticker, price, entrydate);
  } catch (error) {
    console.error(error);
  }
}

module.exports = insertData;
