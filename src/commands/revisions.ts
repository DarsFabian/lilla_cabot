import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, TextChannel, MessageCollector, Message } from "discord.js";

const command: SlashCommandBuilder = new SlashCommandBuilder()
    .setName("revisions")
    .setDescription("Commence tes revisions!");

const next: ButtonBuilder = new ButtonBuilder()
    .setCustomId("Next")
    .setLabel("Next Question")
    .setStyle(ButtonStyle.Success);

const cancel: ButtonBuilder = new ButtonBuilder()
    .setCustomId("Cancel")
    .setLabel("Cancel")
    .setStyle(ButtonStyle.Danger);

const buttons: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(next, cancel);

module.exports = {
    data: command,
    async callback(interaction: ChatInputCommandInteraction, _: any): Promise<void> {
        const question_index = Math.floor(Math.random() * _.questions_emb.length);
        const question: any = _.questions_emb[question_index];

        const channel: TextChannel = await _.client.channels.fetch(interaction.channelId) as TextChannel;
        const collector: MessageCollector = channel.createMessageCollector(
            {
                filter: (message: Message): boolean => { return message.author.id == interaction.user.id; },
                time: 60_000,
                max: 1
            }
        );

        collector.on("end", async (): Promise<void> => {
            interaction.followUp({
                content: question.r,
                components: [buttons]
            });
        });

        interaction.reply({
            content: question.q
        });
    }
};