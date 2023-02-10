var express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
var app = express();
const path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./")));
/* default route
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname,'/index.html'));
	    console.log("main entry");
    });
*/
const routes = require("./yhelper.js")(app, fs);
const finroutes = require("./finance/fin-route.js")(app, fs);
var server = app.listen(3003, function () {
	console.log("We have started our server on port 3003");
});
