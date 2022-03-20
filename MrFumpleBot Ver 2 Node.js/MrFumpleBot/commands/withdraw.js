const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const fs = require("fs");
const color = require("../colors.json");
let fumplebucks = require("../fumplebucks.json");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "withdraw");

//Whitelist Command
if (message.guild.id != 411715542467215362 && message.guild.id != 483302549235957773){
  return message.channel.send("`Sorry but you can't use that command in this server...`");
}
//$withdraw [Fumplebucks]
if(!fumplebucks[message.author.id]){
  fumplebucks[message.author.id] = {
    fumplebucks: 0,
    dumplings: 0,
    stash: 0
  };
  return message.channel.send(response.insufficent_fumplebucks);
}

let wAmount = parseInt(args[0]);
if(!wAmount) return message.channel.send(response.missing_withdraw);
if(wAmount < 1) return message.channel.send(response.withdraw_amount_too_small);
if(fumplebucks[message.author.id].stash < wAmount) return message.channel.send(response.insufficent_fumplebucks);

fumplebucks[message.author.id] = {
  fumplebucks: fumplebucks[message.author.id].fumplebucks + parseInt(args[0]),
  stash: fumplebucks[message.author.id].stash - parseInt(args[0]),
};

let withdrawEmbed = new Discord.RichEmbed()
.setAuthor(response.withdraw_author.format(message.author.username), message.author.avatarURL)
.addField(response.withdraw_title.format(message.author.username, wAmount), response.withdraw_message.format(fumplebucks[message.author.id].fumplebucks, fumplebucks[message.author.id].stash))
.setColor(color.blue)
.setTimestamp();

message.channel.send(withdrawEmbed);

fs.writeFile("./fumplebucks.json", JSON.stringify(fumplebucks), (err) => {
  if(err) cosole.log(err)
});

}

module.exports.help = {
name: "withdraw",
aliases: []
}
