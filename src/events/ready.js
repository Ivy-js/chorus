/**
 * @param {import('discord.js').Client} client
 */
import 'colors'
export default async function ready(client){
    console.log(`👋 ${client.user.tag} is on!`.green)
}
