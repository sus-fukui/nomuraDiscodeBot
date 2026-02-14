import { Client, GatewayIntentBits, Events } from "discord.js";
import express from "express";
var client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
client.login(process.env.TOKEN);

client.once(Events.ClientReady, (readyClient) => {
  console.log(`サーバーが起動しました!! ${readyClient.user.tag}`);
});
var app = express();
app.get("/", (req, res) => {
  res.send(`ok`);
});
var port = 3000;
app.listen(port, () => {
  console.log(`Good morning!!`);
});
