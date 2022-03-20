const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "hello");

  //$hello
  let result = Math.floor((Math.random() * response.hello_replies.length));

  return message.channel.send(response.hello_replies[result]);
}

module.exports.help = {
  name: "hello",
  aliases: ["hi", "hey", "yo", "howdy", "hiya", "sup", "salutations", "greetings"]
}
