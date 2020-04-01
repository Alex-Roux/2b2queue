const fs = require('fs');
const mc = require('minecraft-protocol');
const main = require('./main.js');
var server = mc.createServer({
  'online-mode': true,   // optional
  encryption: true,      // optional
  host: '0.0.0.0',       // optional
  port: 25565,           // optional
  version: '1.12.2',
  motd: '2b2t proxy'
});


log('Server has started.', 1);


function log(string, formalized) {;
	var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
	if(formalized) date = ('[' + date + ' GMT] [Server thread] ');
	var logLine = date + string;
	console.log(logLine);
	
	fs.appendFile('latest.log', logLine + "\r\n", function (err) {if (err) throw err;});
}


server.on('login', function(client) {
  client.write('login', {
    entityId: client.id,
    levelType: 'default',
    gameMode: 0,
    dimension: 0,
    difficulty: 0,
    maxPlayers: server.maxPlayers,
    reducedDebugInfo: false
  });
  
  client.write('position', {
    x: 0,
    y: 1.62,
    z: 0,
    yaw: 0,
    pitch: 0,
    flags: 0x00
  });
  var msg = {
    translate: 'chat.type.announcement',
    "with": [
      'Server',
      'Hello, world!'
    ]
  };
  client.write("chat", { message: JSON.stringify(msg), position: 0 });
  log('Player joined.', 1);
});



