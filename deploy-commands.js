const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [

	new SlashCommandBuilder().setName('sleepcall')
        .setDescription('Creates a Sleep Timer')
        .addIntegerOption(option => option
            .setName('time')
            .setDescription("The length of time until disconnect (Number Only)")
            .setRequired(true))
            .addStringOption(option => option.setName('scale')
            .setDescription("Either Hours or Minutes")
            .setRequired(true)
            .addChoice('Minute','m')
            .addChoice('Hour','h')
            ),
    
    new SlashCommandBuilder().setName('currenttimers')
    .setDescription('Lists any sleep timers you have going'),

	new SlashCommandBuilder().setName('sleepcallcancel')
    .setDescription('Cancels All Your Sleep Timers'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );
        

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();
