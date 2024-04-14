import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
export default {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Gets the avatar of a user')
		.addUserOption(option => option
			.setName('user')
			.setDescription('the user')
			.setRequired(true)),
	async execute(interaction: ChatInputCommandInteraction) {
		// displays the avatar on interaction
		const user = interaction.options.getUser('user');
		if (user == null) return await interaction.reply('User cannot be found')
		await interaction.reply(user.displayAvatarURL());
	},
}