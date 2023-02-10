export const handleMenu = () => {
	const buttons = document.querySelectorAll(".tab");
	const content = document.querySelectorAll(".tab-content");
	buttons.forEach((button) => {
		button.addEventListener("click", (event) => {
			console.log(event.currentTarget);
			buttons.forEach((tab) => {
				tab.classList.remove("active");
			});
			content.forEach((cont) => {
				cont.classList.remove("show");
			});
			event.currentTarget.classList.add("active");
			console.log(event.currentTarget.dataset.content);
			const myData = document.querySelector(
				event.currentTarget.dataset.content
			);
			myData.classList.add("show");
		});
	});
};
