const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "kick");

  //$kick [@Mentioned Person] [Kick Reason]
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.reply(response.missing_user);
  let kReason = args.join(" ").slice(22);
  if(!kReason) return message.channel.send(response.missing_reason);
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(response.missing_permissions)
  if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send(response.unkickable);

  let kickEmbed = new Discord.RichEmbed()
  .setDescription(response.kick_title)
  .setColor(color.crimson)
  .addField(response.kicked_user_title, response.kicked_user_message.format(kUser, kUser.id))
  .addField(response.kicked_by_title, response.kicked_by_message.format(message.author.id, message.author.id))
  .addField(response.kick_reason_title, kReason)
  .addField(response.kicked_in_title, message.channel)
  .addField(response.kick_time_title, message.createdAt);

  let kickChannel = message.guild.channels.find(c => c.name === botconfig.incident_channel_name);
  if(!kickChannel) return message.channel.reply(response.missing_incidents);


  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);

  return message.channel.send(response.kick_confirmation);
}

module.exports.help = {
  name: "kick",
  aliases: []
}
