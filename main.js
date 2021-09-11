// Require the necessary discord.js classes
const { Client, Intents, VoiceState } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Sleepy is online!');
    //Set the status of the bot
    client.user.setActivity("Helping the world stay asleep.", {type: "LISTENING"});
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
    client.user.setActivity("Helping the world stay asleep.", {type: "LISTENING"});
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');



	} else if (commandName === 'sleepcall') {
        const userID = interaction.user.id //get userID
        var numbs = interaction.options.getInteger('timeout');
        var chars = interaction.options.getString('timescale')
        var guildID = interaction.guildId;
        console.log('The time chars is: ',chars);
        console.log('The time numbs is: ',numbs);
        ms = toMS(numbs,chars);
        setTimeout(disconnectUser.bind(this, userID, interaction), ms);
		await interaction.reply('OK! '+ interaction.user.tag + ', you will be disconnected in ' + numbs + chars+ '. Goodnight and sleep well :)');



	} else if (commandName === 'sleepcallcancel') {
		await interaction.reply('User info.');
	}
});

// Login to Discord with your client's token
client.login(token);
