export default class Stocks {
	// Do NOT modify the constructor
	constructor() {
		// we don't capture any parameters here
		// we're defining an array of todos with two example todos
		this.stocks = [
			{
				company: "Exxon",
				ticker: "XOM",
				price: 114,
				purchaseprice: 100,
				catagory: "Energy",
				value: 0,
				qty: 5199,
			},
			{
				company: "Qualcom",
				ticker: "QCOM",
				price: 134,
				purchaseprice: 124,
				catagory: "Tech",
				value: 0,
				qty: 10,
			},
			{
				company: "Tesla",
				ticker: "TSLA",
				price: 134,
				purchaseprice: 200,
				catagory: "Tech",
				value: 0,
				qty: 50,
			},
		];
	}

	// TODO: define remaining instance methods
	getAll() {
		return this.stocks;
	}
	getCount() {
		const entries = Object.entries(this.stocks);
		return entries.length;
	}
	add(company, ticker, price, purchaseprice, catagory) {
		const addnew = {
			company: company,
			ticker: ticker,
			price: price,
			purchaseprice: purchaseprice,
			catagory: catagory,
		};
		this.stocks.push(addnew);
	}
	subgetcatagory(cat) {
		return this.stocks.filter((stock) => stock.category === cat);
	}
	getTech() {
		return this.subgetcatagory("tech");
	}
	getTechCount() {
		const workAr = this.getTech();
		const entries = Object.entries(workAr);
		return entries.length;
	}
	getEnergy() {
		return this.subgetcatagory("Energy");
	}
	getEnergyCount() {
		const persAr = this.getEnergy();
		const entries = Object.entries(persAr);
		return entries.length;
	}
	setValue(ticker, value) {
		this.stocks.forEach((stock) => {
			if (stock.ticker === ticker) stock.value = value;
		});
	}
	getTotalValue() {
		const sum = this.stocks.reduce((total, current) => {
			return total + current.value;
		}, 0);
		return sum;
	}

	async fetchNewPrice(url) {
		const newValueResponse = await fetch(url);
		const newValue = await newValueResponse.json();
		return newValue;
	}

	async updateAllPrices() {
		this.stocks.forEach((stock) => {
			const myURL = `http://localhost:3003/quote/${stock.ticker}`;
			this.fetchNewPrice(myURL).then((data) => {
				stock.price = parseInt(data, 10);
			});
		});
	}
}
