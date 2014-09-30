var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

var generateUid = function() {
	function four() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return four()+four()+four()+four();
}

router.post('/tweet', function(req, res) {
	var db = req.db;
	var tweets = db.get("tweets");
	tweets.insert({
		"author": req.session.currentUser,
		"body": req.body.body,
		"date": req.body.date,
		"uid": generateUid()
	}, function(err, doc) {
		if (err) {
			console.log(err);
			res.send("Tweet didn't go through");
		}
		else {
			res.send("success");
		}
	});
});

router.post("/edit", function(req, res) {
	var db = req.db;
	var tweets = db.get("tweets");

	var d = new Date()

	tweets.update({uid:req.headers._id}, {author: req.session.currentUser, body: req.body.body, date: d}, function(err,doc) {
		if (err) {
			console.log(err);
			res.send("Tweet not updated");
		}
		else {
			res.send("success");
		}
	})
});

router.delete("/delete", function(req, res) {
	var db = req.db;
	var tweets = db.get("tweets");

	tweets.remove({"uid": req.headers._id}, function(err) {
		if (err) {
			console.log(err);
			res.send("Tweet was not deleted successfully");
		}
		else {
			res.send("success");
		}
	});
});



module.exports = router;
