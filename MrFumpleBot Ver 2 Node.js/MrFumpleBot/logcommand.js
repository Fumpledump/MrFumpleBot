const Discord = require("discord.js");
const response = require("./responses.json");
const botconfig = require("./botconfig.json");

var logcommand = function(msg, commandname)
{
  let logChannel = msg.guild.channels.find(c => c.name === botconfig.command_log_channel_name);
  if(!logChannel) return;
  logChannel.send(response.log_command.format(commandname, msg.author.username, msg.createdAt));
  console.log(response.console_log_command.format(commandname, msg.author.username, msg.createdAt));
}

module.exports = logcommand;
