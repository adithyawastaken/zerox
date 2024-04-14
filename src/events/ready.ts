/* eslint-disable @typescript-eslint/no-explicit-any */
import { Events, ActivityType } from 'discord.js';
import colors from 'colors'
export default {
	name: Events.ClientReady,
	once: true,
	execute(client:any) {

		client.user.setStatus('dnd');
		client.user.setActivity('the beats of sweat', { type: ActivityType.Listening });
		console.log(colors.cyan(`Ready! Logged in as ${client.user.tag}`));
	},
};
