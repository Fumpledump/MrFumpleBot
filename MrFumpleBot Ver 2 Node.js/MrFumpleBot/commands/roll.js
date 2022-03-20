const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "roll");

//$roll
let amount = parseInt(args[0]);
if (!amount) return message.channel.send(response.missing_input);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

return message.channel.send(getRandomInt(1, amount + 1))

}

module.exports.help = {
name: "roll",
aliases: []
}
