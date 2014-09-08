function uploadFile(req,res){
	console.log(req.files);
	var fs = require('fs');
	var today = new Date();
	console.log(today);
	var month = today.getMonth() + 1;
	var todaystr = "" + today.getFullYear() + "-" + month + "-" + today.getDate();
	var folder = './testdata/' + todaystr;
	if(!fs.existsSync(folder)){
		fs.mkdirSync(folder);	
	}
	var target_path = './testdata/'+ todaystr+"/" + req.files.testdata.originalname;
	console.log(target_path);
	fs.rename(req.files.testdata.path, target_path,function(err){
		res.set({
                     'Content-Type':'text/json;charset=utf-8'
                });
		if(err){
			console.log("rename error");
			 res.send({result:"ERROR"});
		}
		console.log(today);
		console.log('upload ok');
		res.send({result:"OK"});	
	});
	//res.send({result:"OK"});	
}

exports.uploadFile = uploadFile;
