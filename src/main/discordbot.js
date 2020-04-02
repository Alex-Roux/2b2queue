const fs = require('fs');
const Discord = require('discord.js');
const mcinfo = require('mcinfo');

var main = require('./main.js');


const bot = new Discord.Client();




main.log("Initializing...", 1);

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
if (config.debugMode) main.log("config.json parsed", 1);

bot.login(config.discordParameters.discordToken);


bot.on("ready", function () {
	main.log("Bot connected.", 1);
	bot.user.setActivity('Unavailable');
});

main.log("Ready.", 1);

bot.on("message", message => {
	if (message.content[0] == config.discordParameters.prefix) {
		
		if(message.content == config.discordParameters.prefix + "help") {
			main.log(message.author.tag + " issued help.", 1);
			message.channel.send({
				"embed": {
					"title": "mc-queue help display",
					"description": "mc-queue is a discord bot.\r\nThe prefix is " + config.discordParameters.prefix + ".",
					"footer": {
						"text": "Developped by jenn#1040. - Available on Github."
					},
					"fields":
					[
						{
							"name": "help",
							"value": "do you really need to know that ?"
						},
						{
							"name": "settings",
							"value": "Changes configuration"
							},
						{
							"name": "stop",
							"value": "DISABLED - Stops the bot."
						}
					]
				}
			}.catch(error => { throw error}));
		}
		
		if(message.content.indexOf("settings")) {
			var commandParameters = message.content.split(' ');
			if(commandParameters[1] == "prefix"){
				
				
				
				
			}
		}
		
		if (message.content == config.discordParameters.prefix + "stop") {
			client.destroy();
			main.log("Disconnecting.", 1);
			process.exit()
		}
		if (message.content == config.discordParameters.prefix + "addaccount") {
			
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