/* eslint-disable no-unexpected-multiline */
import { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, TextChannel, EmbedBuilder } from 'discord.js';
import { setTimeout as wait } from 'node:timers/promises'
export default {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Purge messages in a channel')
		.addIntegerOption(option => option
			.setName('amount')
			.setDescription('Amount of messages to delete')
			.setRequired(true)
			.setMaxValue(100)
			.setMinValue(1))
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction: ChatInputCommandInteraction) {
		// Amount of messages
		const amount = interaction.options.getInteger('amount')
		// deleting messages
		if (amount !== null) await (interaction.channel as TextChannel).bulkDelete(amount);
		const embed = new EmbedBuilder()
			.setColor('#ed11c8')
			.setDescription(`Purged ${amount} messages ✅`)
			.setTimestamp()
			.setAuthor({ name: 'Zerox' })
		await interaction.reply({ embeds: [embed] })
		await wait(2000)
		interaction.deleteReply()
	},
}