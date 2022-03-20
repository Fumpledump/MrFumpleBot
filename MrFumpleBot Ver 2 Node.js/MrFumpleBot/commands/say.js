const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "say");

//$say [Message]
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(response.missing_permissions);
      const sayMessage = args.join(" ");
      if(!sayMessage) return message.channel.send(response.missing_say_message);
      message.delete().catch();
      message.channel.send(sayMessage);
}

module.exports.help = {
  name: "say",
  aliases: []
}
