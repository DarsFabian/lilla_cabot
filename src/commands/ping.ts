import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

const command = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong");

module.exports = {
    data: command,
    async callback(interaction: ChatInputCommandInteraction): Promise<void> {

        const ping: number = Date.now() - interaction.createdAt.getTime();

        interaction.reply(`Current ping is ${ping}ms`);
    }
};
