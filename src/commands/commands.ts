import { readdirSync } from "fs";
import { REST, Routes } from "discord.js";
import { Lilla } from "../../types/lilla";

module.exports = async (lilla: Lilla): Promise<void> => {
    const commands: string[] = [];
    let command_files: string[] = readdirSync("./src/commands");

    command_files = command_files.map((file: string) => file.split(".")[0]);
    command_files.splice(command_files.findIndex((name: string) => name == "commands"), 1);
    command_files.forEach((module: string) => {
        const command = require(`${__dirname}/${module}`);
        commands.push(command.data.toJSON());
        lilla.commands.set(module, command.callback);
    });

    const rest_client: REST = new REST().setToken(lilla.TOKEN);

    try {
        await rest_client.put(
            Routes.applicationGuildCommands(lilla.client.user.id, "1309275524652073080"),
            { body: commands }
        );

        await rest_client.put(
            Routes.applicationCommands(lilla.client.user.id),
            { body: commands }
        );

        console.log(`Successfully reloaded ${command_files.length} guild and application (/) commands.`);
    } catch (err: unknown) {
        console.log(err);
    }
};
