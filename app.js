var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// landing page
app.get("/", function(req, res){
	res.render("landing");
});
// show login page
app.get("/login", function(req, res){
	res.render("login")
});
// login logic
app.post("/login", function(req, res){
	res.redirect("/");
})
// show register page
app.get("/register", function(req, res){
	res.render("register")
});
// register logic
app.post("/register", function(req, res){
	res.redirect("/");
})

app.listen("8080", "127.0.0.1", function(){
	console.log("Welcome!");
});