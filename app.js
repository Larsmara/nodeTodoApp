var express         = require("express"),
    bodyParser      = require("body-parser"),
    app             = express(),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    User            = require("./models/user"); 


    // ROUTES
    var authRoute = require("./routes/index"), 
        todoRoute = require("./routes/todo");

mongoose.connect("mongodb://localhost:27017/todoList", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+ "/public"));

app.use(require("express-session")({
    secret: "Lars lager de beste appene",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use(authRoute);
app.use("/todo", todoRoute);

app.listen(3000, function(){
    console.log("TodoApp server startet");
});