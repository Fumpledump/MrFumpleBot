const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "duel");

//$duel [@Mentioned User]

}

module.exports.help = {
  name: "duel",
  aliases: []
}
