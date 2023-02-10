import StockStream from "./stock-stream-class.js";
import getChart from "./jcharthealer.js";
let stockStream = null;
let streamCharts = [];

const stopStreamingButton = document.querySelector("#stop-streaming");
stopStreamingButton.addEventListener("click", event => {
    stopStream();
    stockStream = null;
		event.currentTarget.classList.remove("active");
    startStreamingButton.classList.add("active");
})
const startStreamingButton = document.querySelector("#start-streaming");
startStreamingButton.addEventListener("click", event => {
    stockStream = new StockStream();
    startStream();
		event.currentTarget.classList.remove("active");
    stopStreamingButton.classList.add("active");
})

function startStream() {
    streamCharts.forEach((item) => {
        stockStream.addEvent(item.id);
    })
    stockStream.addListener(myListener);
}

function stopStream() {
    streamCharts.forEach((item) => {
        stockStream.unsubscribe(item.id);
    })
    stockStream.close();
}

function myListener(data) {
    switch(data.type){
        case "ping":
            console.log(data.type);
            break;
        case "trade":
            data.data.forEach((item) =>{
                console.log(item);
				        const stockchart = streamCharts.filter(
				        	(chart) => chart.id === item.s
			          );
                if(stockchart){
				            let myDate = new Date(0);
                    myDate.setUTCSeconds(item.t);
				            stockchart[0].chart.addpoint(item.p, myDate);
                }
            })
            streamCharts.forEach((item) => {
                item.chart.render();
            })
            break;
    }
}
export const initStreamCharts = (allstocks) => {
	allstocks.forEach((stock) => {
		const positions = document.querySelector("#StreamContainer");
		positions.insertAdjacentHTML(
			"beforeend",
			`<div id=${stock.ticker}-stream style="height: 370px; width: 100%" ></div>`
		);
		let title = `${stock.company} Live Chart`;
		let newchart = {
			id: `${stock.ticker}`,
			chart: new getChart(title, `${stock.ticker}-stream`),
		};
		newchart.chart.render();
		streamCharts.push(newchart);
	});
};

