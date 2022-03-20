const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const fs = require("fs");
let fumplebucks = require("../fumplebucks.json");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "pay");

  //Whitelist Command
  if (message.guild.id != 411715542467215362 && message.guild.id != 483302549235957773) {
    return message.channel.send("`Sorry but you can't use that command in this server...`");
  }
  //$pay [@Mentioned Person] [Payment]
  if (!fumplebucks[message.author.id]) {
    fumplebucks[message.author.id] = {
      fumplebucks: 0,
      dumplings: 0,
      stash: 0
    };
    return message.channel.send(response.insufficent_fumplebucks);
  }

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!pUser) return message.channel.send(response.missing_user);

  if (message.author.id == pUser.user.id) return message.channel.send(response.same_user);

  if (!fumplebucks[pUser.id]) {
    fumplebucks[pUser.id] = {
      fumplebucks: 0,
      dumplings: 0,
      stash: 0
    };
  }

  let pFumplebucks = fumplebucks[pUser.id].fumplebucks;
  let sFumplebucks = fumplebucks[message.author.id].fumplebucks;

  let pStash = fumplebucks[pUser.id].stash;
  let sStash = fumplebucks[message.author.id].stash;

  let payment = parseInt(args[1]);
  if (!payment) return message.channel.send(response.missing_payment);
  if (payment < 1) return message.channel.send(response.payment_amount_too_small.format(message.author.username));
  if (sFumplebucks < payment) return message.channel.send(response.insufficent_fumplebucks);

  fumplebucks[message.author.id] = {
    fumplebucks: parseInt(sFumplebucks) - parseInt(args[1]),
    stash: parseInt(sStash)
  };

  fumplebucks[pUser.id] = {
    fumplebucks: parseInt(pFumplebucks) + parseInt(args[1]),
    stash: parseInt(pStash)
  };

  let pAvatar = pUser.user.avatarURL;
  let pUsername = pUser.user.username;

  let payEmbed = new Discord.RichEmbed()
    .setAuthor(response.pay_title.format(message.author.username, pUsername), message.author.avatarURL)
    .setThumbnail(pAvatar)
    .addField(response.pay_sender_title.format(message.author.username, payment, pUser.user.username), response.pay_sender_balance.format(message.author.username, fumplebucks[message.author.id].fumplebucks, pUser.user.username, fumplebucks[pUser.id].fumplebucks))
    .setColor(color.lime)
    .setTimestamp();

  message.channel.send(payEmbed);

  fs.writeFile("./fumplebucks.json", JSON.stringify(fumplebucks), (err) => {
    if (err) cosole.log(err)
  });
}

module.exports.help = {
  name: "pay",
  aliases: []
}
