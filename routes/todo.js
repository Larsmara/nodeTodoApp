var express = require("express");
var router = express.Router();
var todo = require("../models/todo");

router.get("/", function(req,res){
    res.render("todo/index");
});

module.exports = router;