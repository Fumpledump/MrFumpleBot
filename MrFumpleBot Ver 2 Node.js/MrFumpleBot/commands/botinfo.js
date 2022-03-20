const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "botinfo")

  //$botinfo
  let boticon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
    .setTitle(response.bot_info_title)
    .setDescription(response.bot_info)
    .setColor(color.royal_blue)
    .setThumbnail(boticon)
    .addField(response.bot_name_title, bot.user.username)
    .addField(response.bot_created_at_title, bot.user.createdAt);

  return message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo",
  aliases: []
}
