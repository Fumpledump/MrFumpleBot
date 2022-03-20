const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"))

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "warnlevel");

  //$warnlevel [Mentioned Person]
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply(response.missing_user);

  if(!warns[wUser.id]) warns[wUser.id] = {
  warns: 0
  };

  let warnlevel = warns[wUser.id].warns;

  message.channel.send(`<@${wUser.id}> has ${warnlevel} warnings.`);
}

module.exports.help = {
  name: "warnlevel",
  aliases: []
}
