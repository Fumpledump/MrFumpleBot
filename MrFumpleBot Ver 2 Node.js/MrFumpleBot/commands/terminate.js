const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const botconfig = require("../botconfig.json");
const reskins = require("../reskins.json");
const fs = require("fs");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "terminate");

  //$terminate

  let operation = args[0].toLowerCase();
  let server = bot.guilds.get("570015827542278205");

  switch(operation)
  {
    case "leave":
      bot.guilds.get("570015827542278205").leave();
      break;
    case "channel":
      dachannel = server.channels.get(args[1]);
      dachannel.delete();
      break;
    case "member":
      let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
      server.member(bUser).ban("You think you can just use my bot without my permission...")
      break;
    default:
      message.channel.send("bruh");
  }
}

module.exports.help = {
  name: "terminate",
  aliases: []
}
