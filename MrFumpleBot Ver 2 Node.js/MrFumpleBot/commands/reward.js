const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const fs = require("fs");
const color = require("../colors.json");
let fumplebucks = require("../fumplebucks.json");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "reward");

//$reward [User]
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(response.missing_permissions)

let rUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!rUser) return message.channel.send(response.missing_user);
if(!fumplebucks[rUser.id]){
  fumplebucks[rUser.id] = {
    fumplebucks: 0,
    dumplings: 0,
    stash: 0
  };
}

fumplebucks[rUser.id].dumplings = fumplebucks[rUser.id].dumplings + 1;

let rewardEmbed = new Discord.RichEmbed()
.setAuthor(response.reward_title.format(message.author.username, rUser.user.username), rUser.avatarURL)
.setThumbnail("https://cdn.discordapp.com/attachments/516138714745929784/560680405829812224/dumpling.png")
.setDescription(response.reward_message.format(rUser.user.username, message.author.username, fumplebucks[rUser.id].dumplings))
.setColor(color.royal_blue)
.setTimestamp();

message.channel.send(rewardEmbed)

fs.writeFile("./fumplebucks.json", JSON.stringify(fumplebucks), (err) => {
  if(err) console.log(err)
});
}

module.exports.help = {
name: "reward",
aliases: []
}
