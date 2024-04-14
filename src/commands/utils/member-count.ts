import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
export default {
	data: new SlashCommandBuilder()
		.setName('member-count')
		.setDescription('Replies with the current member count')
		.setDMPermission(false),
	async execute(interaction:ChatInputCommandInteraction) {
		await interaction.guild?.members.fetch().then(async (fetchedMembers) => {
			// remove all the bots from this fetched members
			const totalMembers = fetchedMembers = fetchedMembers.filter((member) => !member.user.bot);
			const embed = new EmbedBuilder()
				.setColor('Blue')
				.setTitle('Members')
				.setDescription(totalMembers.size.toString())
				.setTimestamp()
				.setFooter({ text: 'Zerox' });
			await interaction.reply({ embeds: [embed] });
		});

	},
}