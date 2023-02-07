const yahooStockAPI = require("yahoo-stock-api").default;
const insertData = require("./pg-insert");
const retrieveData = require("./pg-retrieve");

const appRouter = (app, fs) => {
	const yahoo = new yahooStockAPI();

	app.get("/quote/:ticker", (req, res) => {
		const tickername = req.params["ticker"];
		yahoo
			.getSymbol({ symbol: tickername })
			.then((data) => {
				console.log(data.response.ask.value);
				let myDate = new Date(data.response.updated);
				insertData(tickername, data.response.ask.value, myDate);
				res.json({ date: myDate, price: data.response.ask.value });
			})
			.catch((error) => {
				console.error(error);
				console.log("Done fetching weather");
			});
	});

	app.get("/history/:ticker", (req, res) => {
		const tickername = req.params["ticker"];
		retrieveData(tickername, res);
	});
};
module.exports = appRouter;
