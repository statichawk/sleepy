const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping')
    .setDescription('Replies with pong!'),

	new SlashCommandBuilder().setName('sleepcall')
        .setDescription('Creates a Sleep Call Timer')
        .addIntegerOption(option => option
            .setName('timeout')
            .setDescription("The amount of time until you with to be disconnected (THIS IS A NUMBER ONLY)")
            .setRequired(true))
            .addStringOption(option => option.setName('timescale')
            .setDescription("The time length modifier (THIS IS MINUTES or HOURS")
            .setRequired(true)
            .addChoice('Minute','m')
            .addChoice('Hour','h')
            ),

	new SlashCommandBuilder().setName('sleepcallcancel')
    .setDescription('Deletes a Sleep Call timer'),
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
