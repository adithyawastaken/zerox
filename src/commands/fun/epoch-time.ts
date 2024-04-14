import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
export default {
	data: new SlashCommandBuilder()
		.setName('epoch')
		.setDescription('epoch/developer only')
		.addIntegerOption(option => option
			.setName('year')
			.setDescription('year of the date')
			.setRequired(true))
		.addIntegerOption(option => option
			.setName('month')
			.setDescription('month of the date | 0-11')
			.setRequired(true))
		.addIntegerOption(option => option
			.setName('day')
			.setDescription('day of the date | 1-31')
			.setRequired(true)
			.setMaxValue(31)
			.setMinValue(1))
		.addIntegerOption(option => option
			.setName('hours')
			.setDescription('hours | 0-23')
			.setRequired(true)
			.setMaxValue(24)
			.setMinValue(0))
		.addIntegerOption(option => option
			.setName('minutes')
			.setDescription('minutes | 0-59')
			.setRequired(true)
			.setMinValue(0)
			.setMaxValue(59))
		.addIntegerOption(option => option
			.setName('seconds')
			.setDescription('seconds | 0-59')
			.setRequired(true)
			.setMaxValue(59)
			.setMinValue(0))
		.addStringOption(option => option
			.setName('format')
			.setRequired(true)
			.setDescription('format of date')
			.addChoices(

				{ name : 'short date time', value: 'sdt' },
				{ name: 'long date time', value: 'ldt' },
				{ name: 'short date', value: 'sd' },
				{ name: 'long date', value: 'ld' },
				{ name: 'relative time', value: 'rt' },

			)),

	async execute(interaction: ChatInputCommandInteraction) {

		const userIDs: string[] = ['758555283285999647']

		if (!userIDs.includes(interaction.user.id)) return await interaction.reply('This is a dev only command!')
		// getting necessary things for date
		const year = interaction.options.getInteger('year') ?? 0
		const month = interaction.options.getInteger('month') ?? 0
		const day = interaction.options.getInteger('day') ?? 1
		const hours = interaction.options.getInteger('hours') ?? 0
		const minutes = interaction.options.getInteger('minutes') ?? 0
		const seconds = interaction.options.getInteger('seconds') ?? 0
		// setting date to the date object

		const date = new Date(year, month, day, hours, minutes, seconds)
		const epoch = (date.getTime() / 1000.0).toString()
		const epochFormat = interaction.options.getString('format')

		if (epochFormat == 'sdt') {
			await interaction.reply(`<t: ${epoch}>`)
		}
		else if (epochFormat == 'ldt') {
			await interaction.reply(`<t: ${epoch}:F> `)
		}
		else if (epochFormat == 'sd') {
			await interaction.reply(`<t: ${epoch}:d> `)
		}
		else if (epochFormat == 'ld') {
			await interaction.reply(`<t: ${epoch}:D> `)
		}
		else if (epochFormat == 'rt') {
			await interaction.reply(`<t: ${epoch}:R> `)
		}

	},
}