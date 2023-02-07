import Stocks from "./stocks.js";

	const stocks = new Stocks();
	// Get value of each stock by calculating base vas current
	const getValues = () => {
	const allstocks = stocks.getAll();
	allstocks.forEach((stock) => {
			const myURL = `http://localhost:3003/history/${stock.ticker}`;
		fetch(myURL)
			.then(response => respson.json())
			.then(data => {
				console.log(data)
			})
	})
