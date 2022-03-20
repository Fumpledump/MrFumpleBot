const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "ban");

  //$ban [@Mentioned Person] [Ban Reason]
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!bUser) return message.channel.reply(response.missing_user);
  let bReason = args.join(" ").slice(22);
  if (!bReason) bReason = "No reason was given.";
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(response.missing_permissions)
  if (bUser.hasPermission("BAN_MEMBERS")) return message.channel.send(response.unbanable);

  let banEmbed = new Discord.RichEmbed()
    .setDescription(response.ban_title)
    .setColor(color.crimson)
    .addField(response.banned_user_title, response.banned_user_message.format(bUser, bUser.id))
    .addField(response.banned_by_title, response.banned_by_message.format(message.author.id, message.author.id))
    .addField(response.ban_reason_title, bReason)
    .addField(response.banned_in_title, message.channel)
    .addField(response.ban_time_title, message.createdAt);

  let banChannel = message.guild.channels.find(c => c.name === botconfig.incident_channel_name);
  if (!banChannel) return message.channel.reply(response.missing_incidents);

  message.guild.member(bUser).ban(bReason);
  banChannel.send(banEmbed);

  return message.channel.send(response.ban_confirmation);
}

module.exports.help = {
  name: "ban",
  aliases: []
}
