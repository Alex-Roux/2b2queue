const fs = require('fs');
const Discord = require('discord.js');
const main = require('./main.js');

const bot = new Discord.Client();


fs.writeFile('latest.log', 'latest.log\r\n', (err) => {
	if (err) throw err;
	if (config.debugMode)log('Data cleared.', 1);
});


log("Initializing...", 1);

var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
if (config.debugMode) log("config.json parsed", 1);

bot.login(config.discordParameters.discordToken);


bot.on("ready", function () {
	log("Bot connected.", 1);
	bot.user.setActivity('Unavailable');
})


function log(string, formalized) {;
	var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
	if(formalized) date = ('[' + date + ' GMT]    [Bot thread] ');
	var logLine = date + string;
	console.log(logLine);
	
	fs.appendFile('latest.log', logLine + "\r\n", function (err) {if (err) throw err;});
}


bot.on("message", message => {
	if (message.content[0] == config.discordParameters.prefix) {
		
		if(message.content == config.discordParameters.prefix + "help") {
			log(message.author.tag + " issued help.", 1);
			message.channel.send({
				"embed": {
					"title": "mc-queue help display",
					"description": "mc-queue is a discord bot.\r\nThe prefix is " + config.discordParameters.prefix + ".",
					"footer": {
						"text": "Developped by jenn#1040. - Not available on Github yet."
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
			});
		}
		
		if(message.content.indexOf("settings")) {
			var commandParameters = message.content.split(' ');
			if(commandParameters[1] == "prefix"){
				
				
				
				
			}
		}
		
		if (message.content == config.discordParameters.prefix + "stop") {
			client.destroy();
			log("Disconnecting.", 1);
			process.exit()
		}
	}
});