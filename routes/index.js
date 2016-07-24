var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware");


// landing page
router.get("/", function(req, res){
	res.render("landing");
});

// show login page
router.get("/login", function(req, res){
	res.render("login")
});
// login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    }), function(req, res){
});
// show register page
router.get("/register", function(req, res){
	res.render("register")
});
// register logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome! " + user.username);
			res.redirect("/");
		});
	})
})
//Logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out.");
    res.redirect("/");
})

module.exports = router;