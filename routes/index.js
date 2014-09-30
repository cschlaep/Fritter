var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var db = req.db;
	var tweets = db.get('tweets');
	var d = new Date()
	if (req.session.currentUser != undefined) {
		if (req.session.cookie._expires > d.getTime()) {
			res.render('login', { title: 'Fritter'});
		}
		else {
			tweets.find({},{}, function(e,docs) {
				res.render('home', { user: req.session.currentUser, 'tweetlist': docs });
			});
		}
	}
	else {
		res.render('login', { title: 'Fritter'});
	}
});

router.get('/home', function(req, res) {
	var db = req.db;
	var tweets = db.get('tweets');

	tweets.find({},{}, function(e,docs) {
		if (req.session.currentUser != undefined) {
			res.render('home', { user: req.session.currentUser, 'tweetlist': docs });
		}
		else {
			res.render('login', { title: 'Fritter'});
		}
	});

});

router.get('/logout', function(req, res) {
	req.session.currentUser = undefined;
	res.send("success");
});



module.exports = router;
