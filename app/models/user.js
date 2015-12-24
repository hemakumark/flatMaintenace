var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {type: String, required: true},
    flat: {type: String, required: true},
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
    phone: { type: Number, validate: {
        validator: function(v){
            return /\d{10}/.test(v);   
        }}, 
        required: true}
});

module.exports = mongoose.model("User", UserSchema);