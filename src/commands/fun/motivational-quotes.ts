import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
export default {
	data: {
		...new SlashCommandBuilder()
			.setName('motivational-quotes')
			.setDescription('Get a random motivation quote')
			.setDMPermission(true),
		contexts: [0, 1, 2],
		integration_types: [0, 1],
	},
	async execute(interaction:ChatInputCommandInteraction) {
		try {
			await interaction.deferReply()
			const req = await fetch('https://type.fit/api/quotes')
			const res = await req.json()
			await interaction.editReply(`${res[Math.floor(Math.random() * res.length)].text} \n \t \t \t  \t \t \t \t \t \t ━ ${res[Math.floor(Math.random() * res.length)].author}`)
		}
		catch (err) {
			await interaction.editReply('Sorry...something went wrong!')
		}
	},
}