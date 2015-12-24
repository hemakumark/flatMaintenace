//server.js

//Base setup

//Database connection
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/smaartforte", function(err){
	if (err) throw err;
});


var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// configure app to use bodyParser()
// this will let us get the data from POST

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("./app/controllers")); // Load the controllers route file

var port = process.env.PORT || 3030; // Server IP Post


//Start the server
app.listen(port);
console.log("Server started running on port " + port);