import { Client, GatewayIntentBits, Events } from "discord.js";
import express from "express";
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
