var express = require("express");
var router = express.Router();
var Todo = require("../models/todos");
var User = require("../models/user");
var middleware = require("../middleware");

// Show all todos!
router.get("/", middleware.isLoggedIn ,function(req,res){
    Todo.find({'author.username': req.user.username}, function(err,todos){
        if(err){
            console.loog(err);
        } else {
            res.render("todo/index", {currentUser: req.user,todos: todos, title:'Todo'});
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

/* // GET TODOS
router.get("/:id", function(req,res){
    Todo.findById(req.params.id).exec(function(err, foundTodo){
        if(err){
            console.log(err);
        } else {
            res.send({todos: foundTodo.name});
        }
    });
}); */

// DELETE TODO
router.delete("/:id", function(req,res){

    let query = {_id:req.params.id}

    Todo.findByIdAndRemove(req.params.id, query, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/todo");
        }
    });
});


module.exports = router;
