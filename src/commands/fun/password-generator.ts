import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import generator from 'generate-password'
export default {
	data:{
		...new SlashCommandBuilder()
			.setName('generate-password')
			.setDescription('Generate a strong password')
			.setDMPermission(true)
			.addIntegerOption(option => option
				.setName('length')
				.setDescription('Length of the password')
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(100))
			.addBooleanOption(option => option
				.setName('numbers')
				.setDescription('Add numbers to your password'))
			.addBooleanOption(option => option
				.setName('symbols')
				.setDescription('Add symbols to your password'))
			.addBooleanOption(option => option
				.setName('lowercase')
				.setDescription('Add lowercase letters to your password'))
			.addBooleanOption(option => option
				.setName('uppercase')
				.setDescription('Add uppercase letters to your password'))
			.addBooleanOption(option => option
				.setName('exclude-similar-characters')
				.setDescription('Exclude similar chars, like \'i\' and \'l\'.')),
		contexts: [0, 1, 2],
		integration_types: [0, 1],
	},
	async execute(interaction: ChatInputCommandInteraction) {
		try {
			await interaction.deferReply({ ephemeral:true })
			// Getting the options
			const length = interaction.options.getInteger('length') as number
			const numbers = interaction.options.getBoolean('numbers') ?? false
			const symbols = interaction.options.getBoolean('symbols') ?? false
			const lowercase = interaction.options.getBoolean('lowercase') ?? true
			const uppercase = interaction.options.getBoolean('uppercase') ?? true
			const excludeSimilarCharacters = interaction.options.getBoolean('exclude-similar-characters') ?? false
			// Generating the pasword
			const password = generator.generate({
				length: length,
				numbers: numbers,
				symbols: symbols,
				lowercase: lowercase,
				uppercase: uppercase,
				excludeSimilarCharacters: excludeSimilarCharacters,
				strict: true,
			})
			await interaction.editReply(password)
		}
		catch (err) {
			await interaction.editReply('Sorry.. something went wrong')
		}
	},
}