var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'PhoneDoctor HomePage' });
});

router.get('/test',function(req,res){
	res.send('test');
});


router.get('/testdata',function(req,res){
	res.render('testdata',null);
});

var testdata = require('../controllers/testdata');
router.post('/testdata',function(req,res){
	var today = new Date();
	console.log('post test data:' + today);
	testdata.uploadFile(req,res);
});

router.post('/register',function(req,res){
	// do some athentication
	// ...
	console.log('start register');
	var register = require('../controllers/Register/register');
	register(req,res);
});

router.post('/login',function(req,res){
	console.log("accept login request");
	console.log(req.body);
	var login = require('../controllers/Login/login');
	login(req,res);
});

module.exports = router;
