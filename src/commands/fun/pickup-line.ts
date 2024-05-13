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
			const req = await fetch('https://rizzapi.vercel.app/random')
			const res = await req.json()
			const pickupLine = res.text
			return await interaction.editReply(pickupLine)
		}
		catch (err) {
			console.log(err)
			return await interaction.editReply('Sorry... something went wrong!')
		}
	},
}