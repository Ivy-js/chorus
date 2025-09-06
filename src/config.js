import "dotenv/config"; 

/**
 * 
 * @typedef {Object} config
 * @property {string} discordToken
 * @property {string} discordClientId 
 * @property {string} guildId 
 * @property {string} spotifyClientId  
 * @property {string} spotifyClientSecret 
 * @property {string} spotifyRedirectUri 
 * @property {string} databaseUrl
 * @property {string} nodeEnv
 * @property {string} supportURL
 * @property {number} port
 */


/** @type {config} */

export const config = {
    discordToken: process.env.DISCORD_TOKEN ?? "", 
    discordClientId: process.env.DISCORD_CLIENT_ID ?? "", 
    guildId: process.env.DISCORD_GUILD_ID ?? "", 
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID ?? "", 
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "", 
    spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI ?? "", 
    databaseUrl: process.env.DATABASE_URL ?? "", 
    nodeEnv: process.env.NODE_ENV ?? "development", 
    port: Number(process.env.PORT ?? 3000),
    supportURL: process.env.SUPPORT_URL ?? "https://discord.com/"
};