var Todo    = require("../models/todos");
var user    = require("../models/user");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

middlewareObj.checkTodoOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Todo.findById(req.params.username, function(err, foundTodo){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                /* if(foundTodo.equals(req.user._id)){
                    next();
                } else {
                    console.log(err);
                    res.redirect("back");
                } */
                console.log("funker" );
                next();
            }
        });
    } else {
        console.log(err);
        res.redirect("back");
    }
}

module.exports = middlewareObj;