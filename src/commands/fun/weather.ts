import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export default {
	data: {
		...new SlashCommandBuilder()
			.setName('weather')
			.setDescription('Gives you the weather of a city')
			.setDMPermission(true)
			.addStringOption(option => option
				.setName('city')
				.setDescription('The city you want the weather of')

				.setRequired(true)),
		contexts: [0, 1, 2],
		integration_types: [0, 1],
	},
	async execute(interaction: ChatInputCommandInteraction) {
		const city = interaction.options.getString('city');
		try {
			await interaction.deferReply()
			const apiKey = process.env.weatherAPIKEY
			const req = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
			const res = await req.json()
			const weatherEmbed = new EmbedBuilder()
				.setTitle(`Weather in ${city}`)
				.setColor('Blue')
				.setAuthor({ name: 'Weather', iconURL: 'https://repository-images.githubusercontent.com/178304119/d02f1880-6ad0-11e9-8269-b80a26e6710e' })
				// set the temperature and weather
				.setDescription(`${res.weather[0].main} | ${Math.floor(Number(res.main.temp - 273.15))}°C`)
				.setTimestamp()
				.setFooter({ text: 'Zerox' })

			// Settings the appropriate images for the coresponding weather
			if (res.weather[0].main === 'Rain') {
				weatherEmbed.setThumbnail('https://www.freepnglogos.com/uploads/rain-png/transparent-download-green-cloud-with-rain-clipart-png-23.png')
			}
			else if (res.weather[0].main === 'Clouds') {
				weatherEmbed.setThumbnail('https://www.pngmart.com/files/22/Blue-Cloud-PNG.png')
			}
			else if (res.weather[0].main === 'Sunny') {
				weatherEmbed.setThumbnail('https://images.pngnice.com/download/2007/Sun-PNG-Transparent-Image.png')
			}
			else if (res.weather[0].main === 'Thunderstorm') {
				weatherEmbed.setThumbnail('https://cdn-icons-png.flaticon.com/512/6828/6828836.png')
			}
			else if (res.weather[0].main === 'Snow') {
				weatherEmbed.setThumbnail('https://cdn.pixabay.com/photo/2014/12/05/13/51/snowflake-558013_640.png')
			}
			else if (res.weather[0].main == 'Haze') {
				weatherEmbed.setThumbnail('https://webstockreview.net/images/clipart-cloud-vector-8.png')
			}
			else if (res.weather[0].main == 'Mist') {
				weatherEmbed.setThumbnail('https://webstockreview.net/images/clipart-cloud-vector-8.png')
			}
			await interaction.editReply({ embeds: [weatherEmbed] })
		}
		catch (err) {
			await interaction.editReply(`Sorry couldn't find the city ${city}`)
		}
	},
}