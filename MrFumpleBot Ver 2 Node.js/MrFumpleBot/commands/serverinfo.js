const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "serverinfo");

  //$serverinfo
  let servericon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
  .setTitle(response.server_info_title)
  .setColor(color.royal_blue)
  .setThumbnail(servericon)
  .addField(response.server_name_title, message.guild.name)
  .addField(response.server_creation_title, message.guild.createdAt)
  .addField(response.server_amount_title, message.guild.memberCount)
  .addField(response.server_joined_title, message.member.joinedAt);

  return message.channel.send(serverembed);
}

module.exports.help = {
  name: "serverinfo",
  aliases: []
}
