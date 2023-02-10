import StockStream from "./stock-stream-class.js";
let stockStream = null;

const stockButton = document.querySelector("#stock-stream");
stockButton.addEventListener("focus", () => {
    console.log("user focused inside the stock stream");
    stockStream = new StockStream();
    startStream();
});
stockButton.addEventListener("blur", () => {
    console.log("user removed focus from the stock stream");
    stopStream();
    stockStream=null;
});
export function startStream() {
    stockStream.addEvent("XOM");
    stockStream.addListener(myListener);
}

export function stopStream() {
    stockStream.unsubscribe("XOM");
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
            })
                break;
    }
}
