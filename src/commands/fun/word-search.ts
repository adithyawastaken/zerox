import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
export default {
	data: {
		...new SlashCommandBuilder()
			.setName('word-search')
			.setDescription('Gets the meaning of a word')
			.setDMPermission(true)
			.addStringOption(option => option
				.setName('word')
				.setDescription('The word to search')
				.setRequired(true)
				.setMaxLength(50)
				.setMinLength(1)),
		contexts: [0, 1, 2],
		integration_types: [0, 1],
	},
	async execute(interaction: ChatInputCommandInteraction) {

		const word = interaction.options.getString('word');
		// fetching the reply from dictionary api

		try {
			await interaction.deferReply()
			const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
			const data = await response.json();
			const meaning = data[0].meanings[0].definitions[0].definition;
			await interaction.editReply(`Meaning: ${meaning}`)
		}
		catch {
			await interaction.editReply(`Sorry, I couldn't find the meaning of '${word}'`)
		}

	},
}