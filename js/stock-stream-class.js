export default class StockStream {
  #socket = null;
  constructor(){
     this.#socket = new WebSocket(
          "wss://ws.finnhub.io?token=cfilkahr01qjvrn4v0egcfilkahr01qjvrn4v0f0"
          );
    this.#socket.onerror = function(error) {
      console.log(`[${error}]`);
    };

  }
  addEvent(ticker){
    this.internaladdEvent(this.#socket,ticker);
  }

  addListener(callback){
      this.#socket.addEventListener("message", function (event) {
        console.log("Message from server ", event.data);
        callback(JSON.parse(event.data));
      });
  }
  unsubscribe(ticker) {
      this.#socket.send(JSON.stringify({ type: "unsubscribe", symbol: ticker }));
  }
  internaladdEvent(mySocket,ticker){
      mySocket.addEventListener("open", function (event) {
        mySocket.send(JSON.stringify({'type': 'subscribe', 'symbol': ticker }));
      })
  }
  close(){
    this.#socket.close(1000, "Work Complete");
  }

}

