import { SlashCommandBuilder } from "discord.js";
import { config } from "../config.js";
/** @type {import('discord.js').SlashCommandBuilder} */

export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns Chorus global latency (ws,api,spotify)"); 


/**
 * @param {import('discord.js').ChatInputCommandInteraction} interaction 
 */

export async function execute(interaction) {
    await interaction.reply({embeds: [
        {
            title: `Chorus Global Latency`,
            description: `Discord Latency : \`${interaction.client.ws.ping}ms\``, 
            color: 0xdce775
        }
    ]})
}