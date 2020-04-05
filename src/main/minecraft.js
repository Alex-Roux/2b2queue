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
	
var client = mc.createClient({
	username: "",
	password: "",
	host: '2b2t.org',
	port: 25565,
	version: "1.12.2"
});
minecraftData.inQueue = true;
minecraftData.creatingTimestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[1];
main.log('Client generated.',  3);



client.on("packet", (data, meta) => {	
	if (meta.name === "playerlist_header") {
		var headerMessage = JSON.parse(data.header);
		minecraftData.positionInQueue = headerMessage.text.split("\n")[5].substring(25);
		minecraftData.ETA = headerMessage.text.split("\n")[6].substring(27);
		main.log('Position in queue: ' + minecraftData.positionInQueue + ' | ETA : ' + minecraftData.ETA, 3);
		//console.log(minecraftData);
	}
	// if (meta.name === "chat") {
		// main.log('Raw message : ' + data.message, 3);
		
		// if(data.message.text === "2b2t is full"){
			// inQueue = true;
			// main.log('ok', 3);
		// }
		
		// if(inQueue) main.log('pos : ' + data.message['extra'][1]['text'], 3);
	// }
	// main.log(data.message, 3);
});




// var client = mc.createClient({
  // username: "",
  // password: "",
  // host: '2b2t.org',
  // port: 25565,
  // version: "1.12.2"
// });
