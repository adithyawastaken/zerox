import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
export default {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unban a user')
		.addUserOption(option => option
			.setName('user')
			.setDescription('The user to unban')
			.setRequired(true))
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

	async execute(interaction: ChatInputCommandInteraction) {
		try {
			const user = interaction.options.getUser('user') ?? 'undefined';
			const embed = new EmbedBuilder()
				.setTitle('User Unbanned')
				.setDescription(`${user} has been unbanned!`)
				.setColor('Aqua')
				.setTimestamp()
			await interaction.guild?.members.unban(user)
			await interaction.reply({ embeds: [embed] })

		}
		catch (err) {
			await interaction.reply({ content: 'An error occured', ephemeral: true })
		}

	},

}