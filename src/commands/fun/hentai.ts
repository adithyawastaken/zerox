import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import Hmtai from 'hmtai'
export default {
	data:{
		...new SlashCommandBuilder()
			.setName('hentai')
			.setDescription('Generate hentai')
			.setDMPermission(true)
			.addStringOption(option => option
				.setName('type')
				.setDescription('hentai type')
				.setRequired(true)
				.addChoices(
					{ name: 'anal', value: 'anal' },
					{ name: 'ass', value: 'ass' },
					{ name: 'bdsm', value: 'bdsm' },
					{ name: 'cum', value: 'cum' },
					{ name: 'creampie', value: 'creampie' },
					{ name: 'random', value: 'random' },
					{ name: 'masturbation', value: 'masturbation' },
					{ name: 'pantsu', value: 'pantsu' },
					{ name: 'blowjob', value: 'blowjob' },
					{ name: 'boobjob', value: 'boobjob' },
					{ name: 'boobs', value: 'boobs' },
					{ name: 'thighs', value: 'thighs' },
					{ name: 'pussy', value: 'pussy' },
					{ name: 'uniform', value: 'uniform' },
					{ name: 'gif', value: 'gif' },
					{ name: 'slap', value: 'slap' },
				)),
		contexts: [0, 1, 2],
		integration_types: [0, 1],
	},
	async execute(interaction:ChatInputCommandInteraction) {
		try {
			await interaction.deferReply()
			const ID = ['1135848642780069959', '734357825161265223', '536596970236805143', '1063462476844380160', '769851017172746251', '952534533612400730', '933566329359839312', '758555283285999647', '827962935812948038', '1174258301672898600']
			const hmtai = new Hmtai()
			const userID = interaction.user.id as string
			const type = interaction.options.getString('type') as string
			if (!ID.includes(userID)) return await interaction.editReply('Sorry you cant use this command kiddo')

			if (type == 'anal') {
				await interaction.editReply(`|| ${await hmtai.nsfw.anal()} ||`)
			}
			else if (type == 'ass') {
				await interaction.editReply(`|| ${await hmtai.nsfw.ass()} ||`)
			}
			else if (type == 'bdsm') {
				await interaction.editReply(`|| ${await hmtai.nsfw.bdsm()} ||`)
			}
			else if (type == 'cum') {
				await interaction.editReply(`|| ${await hmtai.nsfw.cum()} ||`)
			}
			else if (type == 'random') {
				await interaction.editReply(`|| ${await hmtai.nsfw.hentai()} ||`)
			}
			else if (type == 'masturbation') {
				await interaction.editReply(`|| ${await hmtai.nsfw.masturbation()} ||`)
			}
			else if (type == 'pantsu') {
				await interaction.editReply(`|| ${await hmtai.nsfw.pantsu()} ||`)
			}
			else if (type == 'blowjob') {
				await interaction.editReply(`|| ${await hmtai.nsfw.blowjob()} ||`)
			}
			else if (type == 'boobjob') {
				await interaction.editReply(`|| ${await hmtai.nsfw.boobjob()} ||`)
			}
			else if (type == 'boobs') {
				await interaction.editReply(`|| ${await hmtai.nsfw.boobs()} ||`)
			}
			else if (type == 'thighs') {
				await interaction.editReply(`|| ${await hmtai.nsfw.thighs()} ||`)
			}
			else if (type == 'pussy') {
				await interaction.editReply(`|| ${await hmtai.nsfw.pussy()} ||`)
			}
			else if (type == 'uniform') {
				await interaction.editReply(`|| ${await hmtai.nsfw.uniform()} ||`)
			}
			else if (type == 'gif') {
				await interaction.editReply(`|| ${await hmtai.nsfw.gif()} ||`)
			}
			else if (type == 'creampie') {
				await interaction.editReply(`|| ${await hmtai.nsfw.creampie()} ||`)
			}
			else if (type == 'slap') {
				const req = await fetch('https://api.fluxpoint.dev/nsfw/gif/{imageType}')
				const res = await req.json()
				const file = res.file

				await interaction.editReply(`||${file}||`)
			}
		}
		catch (err) {
			await interaction.editReply('Sorry...something went wrong!')
		}

	},
}
