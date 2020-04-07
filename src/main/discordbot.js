const fs = require('fs');
const Discord = require('discord.js');
var mcinfo = require('mcinfo');


var main = require('./main.js');
var minecraft = require('./minecraft.js');


const bot = new Discord.Client();




main.log("Initializing...", 1);

var embeds = JSON.parse(fs.readFileSync('src/main/embeds.json', 'utf8'));
//var accounts = JSON.parse(fs.readFileSync('src/main/accounts.secret.json', 'utf8'));
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
if (config.debugMode) main.log("All .json are parsed", 1);

main.log("Connecting...", 1);
bot.login(config.discordParameters.discordToken);


bot.on("ready", function () {
	main.log("Bot connected.", 1);
	bot.user.setActivity('Unavailable');
});

main.log("Ready.", 1);

bot.on("message", message => {
	if (message.content[0] === config.discordParameters.prefix) {
		main.log(message.author.tag + " issued " + message.content + ".", 1);
		
		if(message.content == config.discordParameters.prefix + "help") {
			message.channel.send(embeds.help)//.catch(error => { throw error}));
		}
		
		if(message.content.indexOf("settings")) {
			var commandParameters = message.content.split(' ');
			if(commandParameters[1] == "prefix"){
				
				
				
				
			}
		}
		
		if (message.content == config.discordParameters.prefix + "stop") {
			bot.destroy();
			main.log("Disconnecting.", 1);
			process.exit()
		}
		
		if (message.content == config.discordParameters.prefix + "addaccount") {
			message.author.send(embeds.addaccount.step1)
				.then(sentMessage => sentMessage.delete({ timeout: 60000 }))
				.catch(error => {
				// handle error
			});
		}
		
		if(message.content == config.discordParameters.prefix + "status") {
			var minecraftData = minecraft.getMinecraftData();
			message.channel.send({
			  "embed": {
				"title": "'s status",
				"description": "_ _",
				"color": 1884018,
				"footer": {
				  "text": "BlackGems"
				},
				"fields": [
				  {
					"name": minecraftData.creatingTimestamp,
					"value": "Enqueued"
				  },
				  {
					"name": minecraftData.positionInQueue,
					"value": "Position in queue",
					"inline": true
				  },
				  {
					"name": minecraftData.ETA,
					"value": "ETA",
					"inline": true
				  }
				]
			  }
			});
		}
	}
});

/*
			mcinfo.isValid(playerUsername, function(valid) {
			if(valid) {
				main.log(playerUsername + ' is valid', 1);
				var mcinfo = require('mcinfo');
				mcinfo.getMinecraftProfile(playerUsername, function(profile) {
					main.log(profile.id, 1);
				});
			} else {
				console.log('User notch is not valid!');
			}
			});
*/