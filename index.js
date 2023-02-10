import Stocks from "./stocks.js";
import getChart from "./jcharthealer.js";
import { handleMenu } from "./menu.js";
import { updateNews } from "./m-news-ui.js";
import { startStream, stopStream } from "./js/stock-stream.js";

const list = document.querySelector("#stock-table");
const count = document.querySelector("#stock-count");
const totalValue = document.querySelector("#stock-value");
const stocks = new Stocks();
let myCharts = [];
let interval = null;
const buttons = document.querySelectorAll("button");

const handleButtonClick = (event) => {
	console.log(event.currentTarget); // the 'button' that was clicked.
	buttons.forEach((butt) => {
		butt.classList.remove("active");
	});
	event.currentTarget.classList.add("active");
	switch (event.currentTarget.dataset.content) {
		case "today":
			getToday(stocks.getAll());
			break;
		case "all":
			getHistorical(stocks.getAll());
			break;
		case "spot":
			getUpdates(stocks.getAll());
			break;
	}
};
buttons.forEach((button) => {
	button.addEventListener("click", handleButtonClick);
});

function getUpdates() {
	const allstocks = stocks.getAll();
	allstocks.forEach((stock) => {
		const myURL = `http://localhost:3003/quote/${stock.ticker}`;
		fetch(myURL)
			.then((response) => response.json())
			.then((data) => {
				stocks.setPrice(stock.ticker, parseFloat(data.price, 10));
				render(stocks.getAll(), stocks.getCount(), stocks.getTotalValue());
				const stockchart = myCharts.filter(
					(chart) => chart.id === stock.ticker
				);
				let myDate = new Date(data.date);
				stockchart[0].chart.addpoint(stock.price, myDate);
				//stockchart.options.data[0].dataPoints.push({ y: stock.price });
				stockchart[0].chart.render();
			});
	});
	let myDate = new Date(Date.now());
	if (myDate.getHours() > 14) {
		clearInterval(interval);
	}
}

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

const getToday = (allstocks) => {
	allstocks.forEach((stock) => {
		const myURL = `http://localhost:3003/today/${stock.ticker}`;
		fetch(myURL)
			.then((response) => response.json())
			.then((data) => {
				let myData = [];
				let lastPrice = 0;
				data.forEach((item) => {
					let myPrice = parseFloat(item.price, 10);
					lastPrice = myPrice;
					let myDate = new Date(item.entrydate);
					myData.push({ x: myDate, y: myPrice });
				});
				stocks.setPrice(stock.ticker, lastPrice);
				stocks.calcValues();
				render(stocks.getAll(), stocks.getCount(), stocks.getTotalValue());
				const stockchart = myCharts.filter(
					(chart) => chart.id === stock.ticker
				);
				console.log(myData);
				stockchart[0].chart.setData(myData);
				stockchart[0].chart.render();
			});
	});
};

const getHistorical = (allstocks) => {
	allstocks.forEach((stock) => {
		const myURL = `http://localhost:3003/history/${stock.ticker}`;
		fetch(myURL)
			.then((response) => response.json())
			.then((data) => {
				let myData = [];
				data.forEach((item) => {
					let myPrice = parseFloat(item.price, 10);
					let myDate = new Date(item.entrydate);
					myData.push({ x: myDate, y: myPrice });
				});
				const stockchart = myCharts.filter(
					(chart) => chart.id === stock.ticker
				);
				console.log(myData);
				stockchart[0].chart.setData(myData);
				stockchart[0].chart.render();
			});
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
document.addEventListener("DOMContentLoaded", function () {
	// Get value of each stock by calculating base vas current
	initCharts(stocks.getAll());
	getToday(stocks.getAll());
	stocks.calcValues();
	render(stocks.getAll(), stocks.getCount(), stocks.getTotalValue());
	let myDate = new Date(Date.now());
	console.log(myDate.getHours());
	if (myDate.getHours() >= 7 || myDate.getHours() <= 14) {
		interval = setInterval(getUpdates, 300000);
	}
	handleMenu();
	updateNews("dummy");
});
