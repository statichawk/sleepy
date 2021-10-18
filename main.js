// Require the necessary discord.js classes
const { Client, Intents, VoiceState } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
//create a global map
const map1 = new Map();

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Sleepy is online!');
    //Set the status of the bot
    client.user.setActivity(`Sleeping in ${client.guilds.cache.size} servers. /help`, {type: "PLAYING"});
});

async function disconnectUser(userID, interaction){
    let user = await interaction.guild.members.fetch(userID);
    user.voice.disconnect();
    }

function toMS(number,modifier){
    var ms = 0;
    ms+=number;
    if(modifier=='h'){
        ms=ms*3600000
    }
    else if(modifier == 'm'){
        ms=ms*60000
    }
    console.log('Set to ' + ms + "milliseconds");
    return ms;
}

client.on('interactionCreate', async interaction => {
    client.user.setActivity(`Sleeping in ${client.guilds.cache.size} servers. /help`, {type: "PLAYING"});
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'sleepcall') {
        const userID = interaction.user.id //get userID
        var numbs = interaction.options.getInteger('timeout');
        var chars = interaction.options.getString('timescale')
        var guildID = interaction.guildId;
        console.log('The time chars is: ',chars);
        console.log('The time numbs is: ',numbs);
        ms = toMS(numbs,chars);
        var timer;
        map1.set(userID, timer = setTimeout(disconnectUser.bind(this, userID, interaction), ms));
        console.log('using map!')
		await interaction.reply('OK! You will be disconnected in ' + numbs + chars+ '.');



	} else if (commandName === 'sleepcallcancel') {
		clearTimeout(map1.get(interaction.user.id));
        await interaction.reply('Your sleep call timer has been canceled. (this will only cancel your most recent timer.');
	} else if(commandName === 'help'){
        await interaction.reply('For help, bot invite link, updates and more, please visit the support server! https://discord.gg/x25eGNyQ5Y')
    } else if(commandName === 'commands'){
        await interaction.reply('Acceptable commands are: /sleepcall, /sleepcallcancel, /help, /commands')
    }
});

// Login to Discord with your client's token
client.login(token);
