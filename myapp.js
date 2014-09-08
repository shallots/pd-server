var http = require('http');
var myApp = require('./app');

http.createServer(myApp).listen(myApp.get('port'),function(){
	console.log('Express server listening on port ' + myApp.get('port'));
});

