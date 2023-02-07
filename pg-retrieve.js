const { pool } = require("./pg-helper");

async function retrieveData(ticker, response) {
  try {
    const res = await pool.query(
      `SELECT * FROM daily where ticker='${ticker}'`
    );
    var json = JSON.stringify(res.rows);
    response.send(json);
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}
module.exports = retrieveData;
