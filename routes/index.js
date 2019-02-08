var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user");



// AUTHENTICATION
// Show register form
router.get("/register",function(req,res){
    res.render("register", {title:'Registrer deg!'});
});

// Handle sign up logic
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            console.log(user.username);
            res.redirect("/todo");
        });
    });
});

// Show login form
router.get("/login",function(req,res){
    res.render("login", {title:'Login'});
});

// Handle login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/todo",
        failureRedirect: "/login"
    }) ,function(req,res){
});
// Logout logic
router.get("/logout", function(req,res){
    req.logOut();
    res.redirect("/todo");
});

router.get("/about", function(req,res){
    res.render("about", {title:'About me'});
});

// ROOT ROUTE
router.get("/",function(req,res){
    res.render("landing", {title:'Homepage'});
});


module.exports = router;