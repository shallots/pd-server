var mongoose = require('mongoose');
var usermodel = require('./usermodel');
var userCheck = usermodel.userCheck;
mongoose.connect('mongodb://localhost/phonedoctor');


function register(req,response){
	console.log('start register');
	handleRegister(req,response);	
}

function handleResponse(resultcode,response){
        var res = {};
        res.resultcode = resultcode;   
        response.writeHead(200,{"Content-Type":"text/json:charset=utf-8"});
        response.write(JSON.stringify(res));
        response.end();
        console.log("resultcode:"+JSON.stringify(res));
}

function handleRegister(req,response){
	var resultcode = -1;
	console.log("phonenumber:" + req.body.phonenumber + ",password:" + req.body.password);
	var query_doc = {phonenumber:req.body.phonenumber};
	userCheck.count(query_doc, function(err,doc){
		if(err) {
			console.log(err);
			handleResponse(2,response);
			return;
		}
		if(doc == 0){ // this phonenubmer is not registered.OK 
			//save the regiter data
			console.log("new user.");
			var userRegister = usermodel.userRegister;
			newuser = new userRegister(req.body);
			newuser.save(function(err,user){
				if(err) resultcode = 2;
				console.log(user);
				resultcode = 0;	
				handleResponse(resultcode,response);	
			});
		}else{
			console.log("user existed.");
			handleResponse(1,response);
			return 1;
		}

	});
}
module.exports = register;
