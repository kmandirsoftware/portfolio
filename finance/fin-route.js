const finnhub = require("finnhub");
const retrieveMarketNews = require("./fin-market-news");

const finRouter = (app, fs) => {
	const api_key = finnhub.ApiClient.instance.authentications["api_key"];
	api_key.apiKey = "cfilkahr01qjvrn4v0egcfilkahr01qjvrn4v0f0"; // Replace this
	const finnhubClient = new finnhub.DefaultApi();

	app.get("/fin/market-news/:ticker", (req, res) => {
		const tickername = req.params["ticker"];
		retrieveMarketNews(finnhubClient, tickername, res);
	});
};
module.exports = finRouter;
