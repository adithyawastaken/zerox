import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export default {
	data: {
		...new SlashCommandBuilder()
			.setName('cars')
			.setDescription('Get description of any car')
			.addStringOption(option => option
				.setName('model')
				.setDescription('Model of the car')
				.setRequired(true))
			.addStringOption(option => option
				.setName('transmission')
				.setDescription('transmission type')
				.addChoices(
					{ name: 'manual', value: 'manual' },
					{ name: 'automatic', value: 'automatic' },
				),
			),
		contexts: [0, 1, 2],
		integration_types: [0, 1],
	},
	async execute(interaction: ChatInputCommandInteraction) {
		try {
			await interaction.deferReply()
			const car = interaction.options.getString('model')
			const req = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${car}`, {
				method: 'get',
				headers: {
					'x-rapidapi-key':process.env.rapidAPIKEY as string,
					'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com',
				},
			})
			const res = await req.text()
			console.log(res)
		}
		catch (err) {
			console.log(err)
			return await interaction.editReply('Sorry... something went wrong')
		}
	},
}