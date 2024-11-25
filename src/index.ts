import { CacheType, Client, Events, Interaction } from "discord.js";
import { config } from "dotenv";

const load_commands = require("./commands/commands");
const questions_emb = require("../questions/prog_emb.json");

config();

const token: string = process.argv[2] ? process.env.DEV_TOKEN || "" : process.env.PROD_TOKEN || "";

const client: Client = new Client({
    presence: {
        status: "online",
    },
    intents: ["DirectMessages", "DirectMessageTyping", "GuildMembers", "GuildMessageTyping", "GuildMessages", "GuildModeration", "GuildPresences", "Guilds", "MessageContent"]
});

const _: any = {
    client,
    commands: [],
    TOKEN: token,
    questions_emb: questions_emb.questions
};

client.on(Events.ClientReady, async () => {

    await load_commands(_);

    console.log("🗽 Lilla Cabot Perry up and running...");
});

client.on(Events.InteractionCreate, (interaction: Interaction<CacheType>): void => {
    if (!interaction.isChatInputCommand()) return;
    if (!(interaction.commandName in _.commands)) return;

    _.commands[interaction.commandName](interaction, _);
});

try {
    client.login(token);
} catch (err: unknown) {
    console.log(err);
};
