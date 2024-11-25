import { Client, ChatInputCommandInteraction } from "discord.js";

export type LillaCommandCallback = (
    interaction: ChatInputCommandInteraction,
    self: Lilla,
) => Promise<void>;

export type Lilla = {
    client: Client,
    TOKEN: string,
    questions_emb: { q: string, r: string }[],
    commands: Map<string, LillaCommandCallback>,
}
