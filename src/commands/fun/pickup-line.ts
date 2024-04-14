import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
export default {
	data: {
		...new SlashCommandBuilder()
			.setName('pickup-line')
			.setDescription('Generate a random pickupline')
			.setDMPermission(true),
		contexts: [0, 1, 2],
		integration_types: [0, 1],
	},
	async execute(interaction: ChatInputCommandInteraction) {
		try {
			await interaction.deferReply()
			const req = await fetch('https://vinuxd.vercel.app/api/pickup')
			const res = await req.json()
			await interaction.editReply(res.pickup)
		}
		catch (err) {
			await interaction.editReply('Sorry... something went wrong!')
		}
	},
}