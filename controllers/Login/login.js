var mongoose = require('mongoose');
var usermodel = require('./usermodel');
var loginCheck = usermodel.loginCheck;
var userInfo = usermodel.userInfo;

mongoose.connect('mongodb://localhost/phonedoctor');

function login(req,res){
	// do something for authentication
	//console.log('start login');
	handleLogin(req,res);
}

function handleLogin(req,res){
	var query_doc = {phonenumber:req.body.phonenumber,password:req.body.password};
	//console.log(query_doc);
	loginCheck.count(query_doc,function(err,doc){
		if(err){
			res.send({status:"error"});
			return;
		}
		if(doc == 0){
			res.send({status:"fail"});
			return;
		}
		// login success, you can return more infomation or that the client will send more request
		var qdoc = {phonenumber:req.body.phonenumber};	
		//console.log(qdoc);	
		userInfo.findOne(qdoc,'phonenumber username gender birthday',function(err,doc){
			//console.log("find:" + req.body.phonenumber);	
			if(err){
				//console.log('query error');
				res.send({status:"server error"});
				return;
			}
			//console.log('result:' + doc + ",name:" + doc.username + ",_id:" + doc._id);
			var docx = {};
			docx.status = 'success';
			docx.username = doc.username;
			docx.phonenumber = doc.phonenumber;
			docx.gender = doc.gender;
			docx.birthday = doc.birthday;
			console.log(docx);
			res.set({
				'Content-Type':'text/json;charset=utf-8'
			});
			res.send(docx);
		});
		//res.send({status:'success'});	
	});
}

module.exports = login;
