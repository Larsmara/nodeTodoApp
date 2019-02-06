var express = require("express");
var router = express.Router();
var Todo = require("../models/todos");
var User = require("../models/user");
var middleware = require("../middleware");

// Show all todos!
<<<<<<< HEAD
router.get("/", middleware.isLoggedIn,function(req,res){
    Todo.find({'author.username': req.user.username}, function(err,todos){
        if(err){
            console.log(err);
        } else {
            res.render("todo/index");
=======
router.get("/", middleware.isLoggedIn ,function(req,res){
    Todo.find({}, function(err,todos){
        if(err){
            console.loog(err);
        } else {
            res.render("todo/index", {todos: todos});
            console.log(todos);
>>>>>>> parent of c9cdebb... user authentication
        }
    });
});

// NY TODO
router.post("/", middleware.isLoggedIn, function(req,res){
    console.log("Lagt til item");
    var name = req.body.item;
    var author = {id: req.user._id, username: req.user.username};
    var newItem = {name: name, author: author};

    Todo.create(newItem, function(err, Todo){
        if(err){
            console.log(err);
        } else {
            console.log("Item lagt til: " + Todo);
            res.redirect("/todo");
        }
    });
});
module.exports = router;
<<<<<<< HEAD
=======


>>>>>>> parent of c9cdebb... user authentication
