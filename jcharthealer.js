export default class getChart {
	// Do NOT modify the constructor
	constructor(title, div) {
		this.id = div;
		this.chart = new CanvasJS.Chart(div, {
			animationEnabled: true,
			theme: "light2",
			zoomEnabled: true,
			title: {
				text: title,
			},
			axisX: {
				title: "timeline",
				gridThickness: 2,
			},
			data: [
				{
					type: "line",
					indexLabelFontSize: 16,
					dataPoints: [],
				},
			],
		});
	}
	get chart() {
		console.log("chart getter");
		return this.chart;
	}
	get id() {
		console.log("id getter");
		return this.id;
	}
	set id(id) {
		console.log("id setter");
		this._id = id;
	}
	set chart(chart) {
		console.log("chart setter");
		this._chart = chart;
	}
	render() {
		this._chart.render();
	}
	addpoint(val, date) {
		let point = `${date.getHours()}:${date.getMinutes()}`;
		console.log(point);
		this._chart.options.data[0].dataPoints.push({ x: date, y: val });
	}
	setData(data) {
		this._chart.options.data[0].dataPoints = data;
	}
}
