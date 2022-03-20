const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "telegraph");

//$telegraph [Message]
  if(!args[0]) return message.channel.send(response.missing_telegraph);
  let tMsg = args.slice(0).join(" ");

  let cdseconds = 60;

  let telegraphEmbed = new Discord.RichEmbed()
  .setAuthor(response.telegraph_author.format(message.author.username), message.author.avatarURL)
  .setThumbnail(message.author.avatarURL)
  .addField(response.telegraph_title, tMsg)
  .addField("Telegraphed From:", message.guild.name)
  .setColor(color.orange)
  .setTimestamp();
  bot.guilds.get("483302549235957773").channels.get("541414906356957194").send(telegraphEmbed);
  return message.channel.send("`Telegraph Sent`");
}

module.exports.help = {
name: "telegraph",
aliases: ["broadcast"]
}
