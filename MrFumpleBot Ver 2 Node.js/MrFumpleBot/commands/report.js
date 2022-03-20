const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "report");

  //$report [@Mentioned Person] [Report Reason]
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send(response.missing_user);
  let rReason = args.join(" ").slice(22);
  if(!rReason) return message.channel.send(response.missing_reason);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription(response.report_title)
  .setColor(color.red)
  .addField(response.reported_user_title, response.reported_user_message.format(rUser, rUser.id))
  .addField(respond.reported_by_title, respond.reported_by_message.format(message.author, message.author.id))
  .addField(respond.report_reason_title, rReason)
  .addField(respond.reported_in_title, message.channel)
  .addField(respond.report_time_title, message.createdAt);

  let reportsChannel = message.guild.channels.find(c => c.name === botconfig.incident_channel_name)
  if(!reportsChannel) return message.channel.reply(response.missing_incidents);


  message.delete().catch(O_o=>{});
  reportsChannel.send(reportEmbed);

  return message.channel.send(response.report_confirmation);
}

module.exports.help = {
  name: "report",
  aliases: []
}
