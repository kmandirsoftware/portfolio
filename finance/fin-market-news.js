async function retrieveMarketNews(finnhubClient, tickername, res) {
	// General news
	finnhubClient.marketNews("general", {}, (error, data, response) => {
		res.send(data);
	});
}
module.exports = retrieveMarketNews;
