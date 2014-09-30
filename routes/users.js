var express = require('express');
var router = express.Router();

var generateUid = function() {
	function four() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return four()+four()+four()+four();
}

router.post('/create', function(req, res) {
	var db = req.db;
	var users = db.get("users");

	users.findOne({email:req.body.email}, function(err, doc) {
		console.log(doc);
		if (doc != null) {
			res.send("Whoops!  That username is already taken.");
		}
		else {
			users.insert({
				"email" : req.body.email,
		        "password" : req.body.password,
		        "username" : req.body.username,
		        "uid" : generateUid()
		    }, function(err, doc) {
		    	if (err) {
		    		res.send("Uh-oh.  Something went wrong.");
		    	}
		    	else {
		    		req.session.currentUser = req.body.email;
		    		res.send("success");
		    	}
		    });
		}
	});
});

router.post('/login', function(req, res) {
	var db = req.db
	var users = db.get('users');

	console.log("Logging in");
	console.log(req.body);

	users.findOne({email:req.body.email, password:req.body.password}, function(err, doc) {
		if (doc != null) {
			req.session.currentUser = req.body.email;
			res.send ("success");
		}
		else {
			res.send("error");
		}
	});
	
})

module.exports = router;
