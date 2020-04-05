const mc = require('minecraft-protocol');
const main = require('./main.js');
var server = mc.createServer({
  'online-mode': true,
  encryption: true,
  host: '0.0.0.0',
  port: 25565,
  version: '1.12.2',
  motd: '2b2t proxy'
});
main.log('Server has started.', 2);

server.on('login', function(client) {
	main.log('A player is connecting.', 2);
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
	main.log('Player joined.', 2);
});
});




// var client = mc.createClient({
  // username: "",
  // password: "",
  // host: '2b2t.org',
  // port: 25565,
  // version: "1.12.2"
// });
