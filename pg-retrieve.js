const { pool } = require("./pg-helper");

async function retrieveData(ticker, response) {
  try {
    const res = await pool.query(
      `SELECT * FROM daily where ticker='${ticker}' order by entrydate`
    );
    var json = JSON.stringify(res.rows);
    response.send(json);
  } catch (error) {
    console.error(error);
  }
}
async function retrieveDateData(ticker, response, date) {
  try {
    const res = await pool.query(
      `SELECT * FROM daily where ticker='${ticker}' and entrydate >= '${date}' order by entrydate`
    );
    var json = JSON.stringify(res.rows);
    response.send(json);
  } catch (error) {
    console.error(error);
  }
}
module.exports = { retrieveData, retrieveDateData };
