import fs from "fs";
import path from "path";
import {
  Client,
  GatewayIntentBits,
  Collection,
  REST,
  Routes,
} from "discord.js";
import { config } from "./config.js";
import "colors";
const client = new Client({ intents: 3276799 });

// =========
// Loader
// =========

client.commands = new Collection();
const commandsPath = path.resolve("./src/commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const commandsData = [];
for (const file of commandFiles) {
  const command = await import(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
  commandsData.push(command.data.toJSON());
}

// =========
// Deployment
// =========

const rest = new REST({ version: "10" }).setToken(config.discordToken);
(async () => {
  try {
    console.log("💨 Registering commands...");
    if (config.guildId) {
      await rest.put(
        Routes.applicationGuildCommands(config.discordClientId, config.guildId),
        { body: commandsData }
      );
      console.log("✔️ Commands registered on dev guild");
    } else {
      await rest.put(Routes.applicationCommands(config.discordClientId), {
        body: commandsData,
      });
      console.log("✔️ Global commands registered!");
    }
  } catch (e) {
    console.log(e.red);
  }
  // =========
  // Load Events
  // =========
  const eventsPath = path.resolve("./src/events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const eventModule = await import(path.join(eventsPath, file));
    const eventName = path.parse(file).name;

    if (eventName === "ready") {
      client.on("ready", () => eventModule.default(client));
    } else if (eventName === "interactionCreate"){
      client.on('interactionCreate', interaction => eventModule.default(interaction, client.commands))
    }

  }
})();
// =========
client.login(config.discordToken)