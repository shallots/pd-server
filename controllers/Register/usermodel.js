var mongoose = require('mongoose')

var regCheckSchema = new  mongoose.Schema({
	phonenumber:String,
	password:String
});

var registerSchema = new mongoose.Schema({
	phonenumber:String,
	password:String,
	username:String,
	gender:String,
	birthday:String
});

exports.userCheck= mongoose.model('Users',regCheckSchema);
exports.userRegister = mongoose.model('users',registerSchema);
