const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
let fumplebucks = require("../fumplebucks.json");
const color = require("../colors.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "balance");

  //Whitelist Command
  if (message.guild.id != 411715542467215362 && message.guild.id != 483302549235957773) {
    return message.channel.send("`Sorry but you can't use that command in this server...`");
  }
  //$balance [@Mentioned Person]
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let bUsername;
  let bAvatar;



  if (!bUser) {
    bUser = message.author;
    bUsername = message.author.username;
    bAvatar = message.author.avatarURL
  } else {
    bUsername = bUser.user.username;
    bAvatar = bUser.user.avatarURL;
  }

  if (!fumplebucks[bUser.id]) {
    fumplebucks[bUser.id] = {
      fumplebucks: 0,
      dumplings: 0,
      stash: 0
    };
  }

  if (!fumplebucks[bUser.id].dumplings) {
    fumplebucks[bUser.id].dumplings = 0;
  }
  fs.writeFile("./fumplebucks.json", JSON.stringify(fumplebucks), (err) => {
    if (err) console.log(err)
  });

  let currentfumplebucks = fumplebucks[bUser.id].fumplebucks;
  let currentstash = fumplebucks[bUser.id].stash;
  let currentdumplings = fumplebucks[bUser.id].dumplings;

  let balanceEmbed = new Discord.RichEmbed()
    .setAuthor(response.balance_author.format(bUsername), bAvatar)
    .setThumbnail(bAvatar)
    .setColor(color.lime)
    .addField(response.balance_title, response.balance_message.format(bUsername, currentfumplebucks, currentstash, currentdumplings))
    .setFooter(response.User_ID_Footer.format(bUser.id))
    .setTimestamp();

  message.channel.send(balanceEmbed);
}

module.exports.help = {
  name: "balance",
  aliases: ["wallet", "bal"]
}
