var express = require('express')
  , router = express.Router()
  , usersController = require("./users")
  , expenseController = require("./expenses");



router.use(function(req, res, next){
	//do logging	
    console.log("request for ", req.originalUrl + " :: " + req.method);
	next();
})

router.get("/", function(req, res){
	res.json({message: "Welcome to our api"});
})

//TODO code has to refactor
router.use('/api/expense', require('./expenses'))
router.use('/api/user', require('./users'))
router.use("/api/income", require("./income"));

module.exports = router