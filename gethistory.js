const yahooStockAPI = require("yahoo-stock-api").default;

const appRouter = (app, fs) => {
	const yahoo = new yahooStockAPI();

	app.get("/quote/:ticker", (req, res) => {
		const tickername = req.params["ticker"];
		yahoo.getSymbol({ symbol: tickername }).then((data) => {
			console.log(data.response.ask.value);
			res.json(data.response.ask.value);
		});
	});
};
module.exports = appRouter;
