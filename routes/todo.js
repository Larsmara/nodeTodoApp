var express = require("express");
var router = express.Router();
var Todo = require("../models/todos");
var User = require("../models/user");
var middleware = require("../middleware");

// Show all todos!
router.get("/", middleware.isLoggedIn,function(req,res){
        Todo.find({}, function(err,todos){
             if(err){
                console.loog(err);
            } else {
                if(req.isAuthenticated()){
                    Todo.findById()
                } else {
                    console.log("Ikke autentisert");
                }
            } 
        });
});

// NY TODO
router.post("/", middleware.isLoggedIn, middleware.checkTodoOwnership, function(req,res){
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


/* res.render("todo/index", {todos: todos});
console.log(todos); */