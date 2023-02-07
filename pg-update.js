const { pool } = require("./pg-helper");

async function modifyData() {
  const [id, entrydate] = process.argv.slice(2);
  try {
    const res = await pool.query(
      "UPDATE portfolio SET entrydate = $1 WHERE id = $2",
      [entrydate, id]
    );
    console.log(`Updated the entrydate to ${entrydate}`);
  } catch (error) {
    console.error(error);
  }
}

modifyData();
