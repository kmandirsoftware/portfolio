import Stocks from "./stocks.js";
import getChart from "./jcharthealer.js";

const list = document.querySelector("#stock-table");
const count = document.querySelector("#stock-count");
const totalValue = document.querySelector("#stock-value");
let myCharts = [];

const initCharts = (allstocks) => {
	allstocks.forEach((stock) => {
		const positions = document.querySelector("#chartContainer");
		positions.insertAdjacentHTML(
			"beforeend",
			`<div id=${stock.ticker} style="height: 370px; width: 100%" ></div>`
		);
		let title = `${stock.company} Daily Chart`;
		let newchart = {
			id: stock.ticker,
			chart: new getChart(title, stock.ticker),
		};
		newchart.chart.render();
		myCharts.push(newchart);
	});
};

const render = (items, itemsCount, tValue) => {
	totalValue.textContent = `(${tValue})`;
	count.textContent = `(${itemsCount})`;
	list.innerHTML = items
		.map(
			(stock) =>
				`<tr><td>${stock.ticker}</td><td>${stock.company}</td><td>${stock.price}</td><td>${stock.purchaseprice}</td><td>${stock.value}</td><td>${stock.catagory}</td></tr>`
		)
		.join("");
	list.insertAdjacentHTML(
		"afterbegin",
		`<tr><th>Ticker</th><th>Company</th><th>Price</th><th>Purchase Price</th><th>Gain/Loss</th><th>Catagory</th></tr>`
	);
};
document.addEventListener("DOMContentLoaded", function (event) {
	console.log(event);
	const stocks = new Stocks();
	// Get value of each stock by calculating base vas current
	const getValues = () => {
		const allstocks = stocks.getAll();
		allstocks.forEach((stock) => {
			const val = stock.qty * (stock.price - stock.purchaseprice);
			stocks.setValue(stock.ticker, val);
		});
	};
	initCharts(stocks.getAll());
	function getUpdates() {
		const allstocks = stocks.getAll();
		allstocks.forEach((stock) => {
			const myURL = `http://localhost:3003/quote/${stock.ticker}`;
			fetch(myURL)
				.then((response) => response.json())
				.then((data) => {
					stock.price = parseFloat(data.price, 10);
					let myDate = new Date(data.date);
					let val = stock.qty * (stock.price - stock.purchaseprice);
					const strip = val.toFixed(2);
					val = parseFloat(strip, 2);
					stocks.setValue(stock.ticker, val);
					render(stocks.getAll(), stocks.getCount(), stocks.getTotalValue());
					const stockchart = myCharts.filter(
						(chart) => chart.id === stock.ticker
					);
					stockchart[0].chart.addpoint(stock.price, myDate);
					//stockchart.options.data[0].dataPoints.push({ y: stock.price });
					stockchart[0].chart.render();
				});
		});
	}
	getValues();
	render(stocks.getAll(), stocks.getCount(), stocks.getTotalValue());
	getUpdates();
	let interval = setInterval(getUpdates, 300000);
	console.log(interval);
});
