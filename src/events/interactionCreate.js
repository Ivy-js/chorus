import "colors";
import { config } from "../config.js";
/**
 * @param {import('discord.js').ChatInputCommandInteraction} interaction
 * @param {Map<string,any>} commands
 */

export default async function interactionCreate(interaction, commands) {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.log(error);
    await interaction.reply({
      ephemeral: true,
      embeds: [
        {
          description: `C'est un peu gênant, mais j'ai rencontré un problème. Essayez de re-exécuter la commande, si le problème persiste, faites un signalement directement sur le [discord](<${config.supportURL}>)`,
          color: 0xeb606b,
        },
      ],
    });
  }
}
