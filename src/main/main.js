const fs = require('fs');


exports.log = function(string, threadID) {
	var date = ('[' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' GMT] ');
	//console.log(threadID);
	var thread;
	switch (threadID){
		case 0: // General
			thread = '[General Thread] ';
		break;
		case 1: // Discord
			thread = '[Discord Thread] ';
		break;
		case 2: // Server
			thread = '[Server Thread] ';
		break;
		case 3: // Client
			thread = '[Client Thread] ';
		break;
		default:
			thread = '[Undefined thread] ';
	};
	var logLine = date + thread + string;
	console.log(logLine);
	
	fs.appendFile('latest.log', logLine + "\r\n", function (err) {if (err) throw err;});
}