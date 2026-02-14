import fs from "fs";
import path from "path";
import aisatu from "./commands/aisatu.js"
import { Client, GatewayIntentBits, Events } from "discord.js";
import express from "express";
import UpdateCommands from "./update-commands.js";
UpdateCommands();
var client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.on("error", console.error);
client.on("debug", console.log);
client.on("warn", console.log);

console.log("TOKEN exists:", !!process.env.TOKEN);
client.login(process.env.TOKEN)
  .then(() => console.log("Discordログイン成功"))
  .catch(console.error);

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName == aisatu.data.name) {
        try {
            await aisatu.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'コマンド実行時にエラーになりました。',ephemeral:true});
        }
    } else {
        await interaction.reply(`不明なコマンドが実行されました。`)
    }
});


client.once(Events.ClientReady, (readyClient) => {
  console.log(`サーバーが起動しました!! ${readyClient.user.tag}`);
  console.log(`招待URL:https://discord.com/api/oauth2/authorize?client_id=${process.env.ApplicationID}&permissions=8&scope=applications.commands+bot`)
});
var app = express();
app.get("/", (req, res) => {
  res.send(`ok`);
});
var port = 3000;
app.listen(port, () => {
  console.log(`Good morning!!`);
});
