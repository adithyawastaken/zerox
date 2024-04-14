import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
export default {
	data: {
		...new SlashCommandBuilder()
			.setName('facts')
			.setDescription('Get a random fact')
			.setDMPermission(true),
		contexts: [0, 1, 2],
		integration_types: [0, 1],
	},
	async execute(interaction: ChatInputCommandInteraction) {
		try {
			await interaction.deferReply()
			const req = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
			const res = await req.json()
			await interaction.editReply(res.text)
		}
		catch (err) {
			await interaction.editReply('Something went wrong...')
		}
	},
}