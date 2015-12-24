var express = require("express");
var router = express.Router();
var dbHelper = require("../helpers/dbHelper")

router.route("/")
.post(dbHelper.create)
.get(dbHelper.getAll)

router.route("/:id")
.put(dbHelper.update)
.delete(dbHelper.delete)
.get(dbHelper.get);

module.exports = router;