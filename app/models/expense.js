var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
	name: {type: String, required: true},
    category: {type: String, required: true},
    amount: {type: Number, required: true, get: getPrice, set: setPrice},
    payee: {type: String, required: true},
    mobile: {
        type: Number,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: '{VALUE} is not a valid mobile number!'
        },
        required: true
        
    },
    date: { type: Date, max: Date.now, required: true},
    method: {type: String, required: true},
    invoiceNumber: {type: String, required: true},
    description: String
});

function getPrice(num){
    return (num/100).toFixed(2);    
}

function setPrice(num){
    return num*100;
}

module.exports = mongoose.model("Expense", ExpenseSchema);