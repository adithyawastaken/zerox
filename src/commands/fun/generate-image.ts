import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import Replicate from 'replicate';
import dotenv from 'dotenv';

dotenv.config();

export default {
	data: { 
		...new SlashCommandBuilder()
			.setName('generate-image')
			.setDescription('Generate an image with your imagination')
			.setDMPermission(true)
			.addStringOption(option => option
				.setName('prompt')
				.setRequired(true)
				.setDescription('Enter the text here')
				.setMinLength(1)
				.setMaxLength(100)),
		contexts: [0, 1, 2],
		integration_types: [0, 1],
	},
	async execute(interaction: ChatInputCommandInteraction) {
		try {
			await interaction.deferReply();

			// Image generation
			const prompt = interaction.options.getString('prompt');
			const token = process.env.replicate_token as string;
			const replicate = new Replicate({
				auth: token,
			});
			const model = 'stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf';
			const input = { prompt: prompt };
			const output = await replicate.run(model, { input }) as string[];

			// Embed
			const embed = new EmbedBuilder()
				.setColor('DarkOrange')
				.setTitle('Generated Image')
				.setURL(output[0])
				.setTimestamp()
				.setFooter({ text: 'Zerox' })
				.setImage(output[0])
				.setAuthor({ name: 'Zerox', iconURL: 'https://i.pinimg.com/originals/6d/3c/0f/6d3c0fb5a4452797008680a2089e3360.jpg' })
				.setDescription(prompt);

			await interaction.editReply({ embeds: [embed] });
		}
		catch (err) {
			console.error(err);
			await interaction.editReply('Sorry..something went wrong');
		}
	},
};
