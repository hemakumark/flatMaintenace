var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var IncomeSchema = new Schema({
	name: {type: String, required: true},
    category: {type: String, required: true},
    amount: {type: Number, required: true, get: getPrice, set: setPrice},
    flatno: {type: String, required: true},
    date: { type: Date, max: Date.now, required: true},
    method: {type: String, required: true},    
    description: String
});

function getPrice(num){
    return (num/100).toFixed(2);    
}

function setPrice(num){
    return num*100;
}

module.exports = mongoose.model("Income", IncomeSchema);