import { readdirSync } from "fs";
import { REST, Routes } from "discord.js";

module.exports = async (_: any): Promise<void> => {
    const commands: string[] = [];
    let command_files: string[] = readdirSync("./src/commands");

    command_files = command_files.map((file: string) => file.split(".")[0]);
    command_files.splice(command_files.findIndex((name: string) => name == "commands"), 1);
    command_files.forEach((module: string) => {
        const command = require(`${__dirname}/${module}`);
        commands.push(command.data.toJSON());
        _.commands[module] = command.callback;
    });

    const rest_client: REST = new REST().setToken(_.TOKEN);

    try {
        const data: any = await rest_client.put(
            Routes.applicationGuildCommands(_.client.user.id, "1309275524652073080"),
            { body: commands }
        );

        await rest_client.put(
            Routes.applicationCommands(_.client.user.id),
            { body: commands }
        );

        console.log(`Successfully reloaded ${data.length} guild and application (/) commands.`);
    } catch (err: unknown) {
        console.log(err);
    }
};