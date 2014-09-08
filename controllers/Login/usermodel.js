var mongoose = require('mongoose');

var loginCheckSchema = new mongoose.Schema({
	phonenumber:String,
	password:String
});

var userInfoSchema = new mongoose.Schema({
	phonenumber:String,
	password:String,
	username:String,
	gender:String,
	birthday:String
});

exports.loginCheck = mongoose.model('users',loginCheckSchema);
exports.userInfo = mongoose.model('Users',userInfoSchema);
