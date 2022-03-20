const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "operation");

//$operation [operationNum]
  let operationNum = args[0].toLowerCase();

  switch(operation)
  {
    case "leave":
      bot.guilds.get("411715542467215362").leave();
      break;
    case "spam":
      break;
    default:
      message.channel.send("bruh");
  }
}

module.exports.help = {
name: "operation",
aliases: []
}
