import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from 'fs/promises';
import { join } from 'path';
import colors from 'colors';
import dotenv from 'dotenv';


dotenv.config();

const token = process.env['token'] as string;
const clientID = process.env['clientId'] as string;

const commands: unknown[] = [];
const foldersPath = join(__dirname, 'commands');

async function main() {
	try {
		const commandFolders = await fs.readdir(foldersPath);
		for (const folder of commandFolders) {
			const commandsPath = join(foldersPath, folder);
			const commandFiles = (await fs.readdir(commandsPath)).filter(file => file.endsWith('.js'));
			for (const file of commandFiles) {
				const filePath = join(commandsPath, file);
				console.log(filePath)
				const command = await require(filePath);
				if ('data' in command.default && 'execute' in command.default) {
					commands.push(command.default.data);
				} 
				else {
					console.log(colors.red(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`));
				}
			}
		}

		const rest = new REST({ version: '9' }).setToken(token);
		await rest.put(Routes.applicationCommands(clientID), { body: commands });

		console.log(colors.magenta.bold('Successfully reloaded application (/) commands.'));
	} 
	catch (error) {
		console.error(colors.red(`Error: ${error}`));
	}
}

main();
