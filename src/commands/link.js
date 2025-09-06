import { SlashCommandBuilder } from "discord.js";
import { config } from "../config.js";
import { db } from "../db.js";

/**
 * @type {import('discord.js').SlashCommandBuilder}
 */

export const data = new SlashCommandBuilder()
    .setName("link")
    .setDescription("Link your Spotify account to Chorus")


/**
 * @param {import('discord.js').ChatInputCommandInteraction} interaction
 */

export async function execute(interaction) {
    const spotifyLink = `https://accounts.spotify.com/authorize?client_id=${config.spotifyClientId}&response_type=code&redirect_uri=${encodeURIComponent(config.spotifyRedirectUri)}&scope=user-read-recently-played`; 


    await interaction.reply({
        ephemeral:true, 
        embeds : [
            {
                title: "Liaison de compte", 
                description: `Pour relier ton compte Chorus à Spotify, clique ici : [Liaison de votre compte](<${spotifyLink}>)`, 
                color: 0xdce775 
            }
        ]
    })
    const discordId = interaction.user.id;

    try { 
        await db.query(
            `INSERT INTO users(discord_id, spotify_id, refresh_token, guild_id)
             VALUES($1, $2, $3, $4)
             ON CONFLICT (discord_id) DO NOTHING`,
             [discordId, "SPOTIFY_ID_STUB", 'REFRESH_TOKEN_STUB', interaction.guildId]
        )
        console.log(`➡️ User ${interaction.user.username} as been registered to the DB (stub)`)
    } catch (e) {
        console.log(e)
    }
}