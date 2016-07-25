var express 				= require("express"),
	mongoose 				= require("mongoose"),
	passport 				= require("passport"),
	bodyParser 				= require("body-parser"),
	flash    				= require("connect-flash"),
	User					= require("./models/user"),
	localStrategy 			= require("passport-local"),
	passortLocalMongoose 	= require("passport-local-mongoose"),
	app 					= express();
	mqtt 					= require("mqtt");
var	client					= mqtt.connect("ws://test.mosquitto.org:8080/mqtt");
mongoose.connect("mongodb://lanyang:password@ds029705.mlab.com:29705/litmus");
app.use(bodyParser.urlencoded({extended: true}));
// requiring routes
var indexRoutes = require("./routes/index");

//passport configuration
app.use(require("express-session")({
    secret: "Doufu is the cutest cat.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
console.log(__dirname);
app.use(express.static(__dirname));

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(indexRoutes);

app.listen("8080", "127.0.0.1", function(){
	console.log("Welcome!");
});

setInterval(function() {
	var sendData = Math.random() - 0.5;
	console.log("sending " + String(sendData));
	client.publish("LanTopic", String(sendData)); }
	, 1000);