const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const fs = require("fs");
const color = require("../colors.json");
let fumplebucks = require("../fumplebucks.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "deposit");

  //Whitelist Command
  if (message.guild.id != 411715542467215362 && message.guild.id != 483302549235957773) {
    return message.channel.send("`Sorry but you can't use that command in this server...`");
  }
  //$deposit [Fumplebucks]
  if (!fumplebucks[message.author.id]) {
    fumplebucks[message.author.id] = {
      fumplebucks: 0,
      dumplings: 0,
      stash: 0
    };
    return message.channel.send(response.insufficent_fumplebucks);
  }

  let dAmount = parseInt(args[0]);
  if (!dAmount) return message.channel.send(response.missing_deposit);
  if (dAmount < 1) return message.channel.send(response.deposit_amount_too_small);
  if (fumplebucks[message.author.id].fumplebucks < dAmount) return message.channel.send(response.insufficent_fumplebucks);

  fumplebucks[message.author.id] = {
    fumplebucks: fumplebucks[message.author.id].fumplebucks - parseInt(args[0]),
    stash: fumplebucks[message.author.id].stash + parseInt(args[0]),
  };

  let depositEmbed = new Discord.RichEmbed()
    .setAuthor(response.deposit_author.format(message.author.username), message.author.avatarURL)
    .addField(response.deposit_title.format(message.author.username, dAmount), response.deposit_message.format(fumplebucks[message.author.id].fumplebucks, fumplebucks[message.author.id].stash))
    .setColor(color.royal_blue)
    .setTimestamp();

  message.channel.send(depositEmbed);

  fs.writeFile("./fumplebucks.json", JSON.stringify(fumplebucks), (err) => {
    if (err) cosole.log(err)
  });
}

module.exports.help = {
  name: "deposit",
  aliases: []
}
