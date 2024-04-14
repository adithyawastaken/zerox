import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
export default {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a user')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
		.addUserOption(option => option
			.setName('user')
			.setDescription('user to kick')
			.setRequired(true))
		.addStringOption(option => option
			.setName('reason')
			.setDescription('reason for kicking')
			.setRequired(false)
			.setMaxLength(50)),
	async execute(interaction: ChatInputCommandInteraction) {
		const user = interaction.options.getUser('user') ?? ''
		const reason = interaction.options.getString('reason') ?? 'No reason provided'
		await interaction.guild?.members.kick(user)
		const embed = new EmbedBuilder()
			.setTitle('User Kicked')
			.setDescription(`${user} has been kicked!`)
			.setColor('DarkPurple')
			.addFields(
				{ name : 'Reason', value : reason },
			)
			.setTimestamp()
		await interaction.reply({ embeds : [embed] })
	},

}