const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const fs = require("fs");
let fumplebucks = require("../fumplebucks.json");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "submit");

  //Whitelist Command
  if (message.guild.id != 411715542467215362 && message.guild.id != 483302549235957773){
    return message.channel.send("`Sorry but you can't use that command in this server...`");
  }
  //$submit [fumplebucks]
  if(!fumplebucks[message.author.id]){
    fumplebucks[message.author.id] = {
      fumplebucks: 0,
      dumplings: 0,
      stash: 0
    };
    return message.channel.send(response.insufficent_fumplebucks);
  }
  let bankId = "439896715781210115";
  let sFumplebucks = fumplebucks[message.author.id].fumplebucks;
  let payment = parseInt(args[0]);
  if(!payment) return message.channel.send(response.missing_payment.format(message.author.username));
  if(payment < 1) return message.channel.send("`You can't pay 0 fumplebucks!!!`");
  if(sFumplebucks < args[0]) return message.channel.send(response.insufficent_fumplebucks);
  if(!fumplebucks[bankId]){
    fumplebucks[bankId] = {
      fumplebucks: 0,
      dumplings: 0,
      stash: 0
  };
}

  fumplebucks[message.author.id].fumplebucks = fumplebucks[message.author.id].fumplebucks - payment;
  fumplebucks[bankId].stash = fumplebucks[bankId].stash + payment;

  let submitEmbed = new Discord.RichEmbed()
  .setAuthor(response.submit_title.format(message.author.username), message.author.avatarURL)
  .addField(response.submit_paid_title.format(message.author.username, payment), response.submit_paid_message.format(fumplebucks[bankId].stash, fumplebucks[message.author.id].fumplebucks))
  .setColor(color.gold)
  .setTimestamp();

  message.channel.send(submitEmbed);

    fs.writeFile("./fumplebucks.json", JSON.stringify(fumplebucks), (err) => {
      if(err) cosole.log(err)
    });
  }

module.exports.help = {
  name: "submit",
  aliases: ["protectionpayment", "tithe"]
}
