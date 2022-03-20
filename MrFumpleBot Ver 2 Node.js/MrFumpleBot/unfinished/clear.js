const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "clear");

//$clear [Amount]
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(response.missing_permissions);
  if(!args[0]) return message.channel.send(response.missing_clear_amount);
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(response.clear_message.format(args[0])).then(msg => msg.delete(2000));
});


}

module.exports.help = {
  name: "clear",
  aliases: ["purge"]
}
