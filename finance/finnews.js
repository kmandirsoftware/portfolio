const finnhub = require("finnhub");

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "cfilkahr01qjvrn4v0egcfilkahr01qjvrn4v0f0"; // Replace this
const finnhubClient = new finnhub.DefaultApi();

// General news
finnhubClient.marketNews("general", {}, (error, data, response) => {
	console.log(data);
});
//Quote
finnhubClient.quote("AAPL", (error, data, response) => {
	console.log(data);
});
// Stock dividends
finnhubClient.stockDividends(
	"KO",
	"2019-01-01",
	"2020-06-30",
	(error, data, response) => {
		console.log(data);
	}
);
//Company News
finnhubClient.companyNews(
	"AAPL",
	"2020-01-01",
	"2020-05-01",
	(error, data, response) => {
		if (error) {
			console.error(error);
		} else {
			console.log(data);
		}
	}
);
//Major development
finnhubClient.pressReleases("AAPL", {}, (error, data, response) => {
	console.log(data);
});

// News sentiment
finnhubClient.newsSentiment("AAPL", (error, data, response) => {
	console.log(data);
});
// Insider Transactions
finnhubClient.insiderTransactions("AAPL", (error, data, response) => {
	console.log(data);
});
