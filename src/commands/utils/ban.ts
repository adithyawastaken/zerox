import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
export default {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user')
		.addUserOption(option => option
			.setName('user')
			.setDescription('The user to ban')
			.setRequired(true))
		.addStringOption(option => option
			.setName('reason')
			.setDescription('The reason for the ban')
			.setRequired(false)
			.setMaxLength(100)
			.setMinLength(1))
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

	async execute(interaction: ChatInputCommandInteraction) {
		const user = interaction.options.getUser('user') ?? 'undefined';
		const reason = interaction.options.getString('reason') ?? 'No reason provided';
		await interaction.guild?.members.ban(user);
		const embed = new EmbedBuilder()
			.setTitle('User Banned')
			.setDescription(`${user} has been banned!`)
			.setColor('Aqua')
			.addFields(
				{ name: 'Reason', value: reason },
			)
			.setTimestamp()
		await interaction.reply({ embeds: [embed] });
	},
}