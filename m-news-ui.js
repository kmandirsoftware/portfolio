const renderMarketNews = (items, itemsCount, tValue) => {
	const list = document.querySelector("#news-table");
	//	totalValue.textContent = `(${tValue})`;
	//	count.textContent = `(${itemsCount})`;
	list.insertAdjacentHTML(
		"beforeend",
		`<tr><th>Date</th><th>Headline</th><th>Image</th><th>Summary</th><th>URL</th></tr>`
	);
	items.forEach((item) => {
		let myDate = new Date(0);
		myDate.setUTCSeconds(item.datetime);
		list.insertAdjacentHTML(
			"beforeend",
			`<tr><td>${myDate}</td><td>${item.headline}</td><td><img src="${item.image}" width="200" height="200"></td><td>${item.summary}</td><td><a href="${item.url}" target="_blank" rel="noreferrer noopener">Website</a></td>></tr>`
		);
	});
};

export const updateNews = (ticker) => {
	const myURL = `http://localhost:3003/fin/market-news/${ticker}`;
	fetch(myURL)
		.then((response) => response.json())
		.then((data) => {
			renderMarketNews(data, 0, 0);
		});
};
