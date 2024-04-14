import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
export default {
	data: {
		...new SlashCommandBuilder()
			.setName('repeat')
			.setDescription('Repeats the word/sentence')
			.addStringOption(option => option
				.setName('word')
				.setDescription('word/sentence to repeat')
				.setMaxLength(40)
				.setRequired(true)).toJSON(),
		contexts: [0, 1, 2],
		integration_types: [0, 1],
	},
	async execute(interaction: ChatInputCommandInteraction) {
		const word = interaction.options.getString('word') as string
		await interaction.reply(word)
	},
}