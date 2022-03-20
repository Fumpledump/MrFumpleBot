const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const fs = require("fs");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "severlist");

//$serverlist
  let string = '';
  bot.guilds.forEach(guild => {
    string += guild.name + guild.id + '\n';})
  let listEmbed = new Discord.RichEmbed()
    .setColor(color.green)
    .addField("Servers In", string)
    .setTimestamp();

    message.channel.send(listEmbed);
}

module.exports.help = {
name: "serverlist",
aliases: ["listservers", "servers"]
}
