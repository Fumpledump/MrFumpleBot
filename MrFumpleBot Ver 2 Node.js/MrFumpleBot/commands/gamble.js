const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const fs = require("fs");
let stats = require("../stats.json");
let fumplebucks = require("../fumplebucks.json");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "gamble");

//Whitelist Command
if (message.guild.id != 411715542467215362 && message.guild.id != 483302549235957773){
  return message.channel.send("`Sorry but you can't use that command in this server...`");
}
//$gamble [Amount]
if(!fumplebucks[message.author.id]){
  fumplebucks[message.author.id] = {
    fumplebucks: 0,
    dumplings: 0,
    stash: 0
  };
}
if(!stats[message.author.id]){
  stats[message.author.id] = {
    bio: response.unknown_bio,
    slotmachine_pulls: 0,
    gamble_wins: 0,
    gamble_loses: 0,
    russian_roulettes_survived: 0,
    russian_roulettes_deaths: 0
  };
}

let amount = parseInt(args[0]);
if (!amount) return message.channel.send(response.missing_gamble_amount);
if (amount < 0) return message.channel.send(response.gamble_amount_too_small);
if (amount > fumplebucks[message.author.id].fumplebucks) return message.channel.send(response.insufficent_fumplebucks);


let result = Math.floor(Math.random() * Math.floor(2));
console.log(result);
let currentfumplebucks = fumplebucks[message.author.id].fumplebucks;

if(result == 1){
  stats[message.author.id].gamble_wins = stats[message.author.id].gamble_wins + 1;
  fumplebucks[message.author.id].fumplebucks = currentfumplebucks + amount;
  newtotal = parseInt(fumplebucks[message.author.id].fumplebucks);
  fs.writeFile("./fumplebucks.json", JSON.stringify(fumplebucks), (err) => {
    if(err) cosole.log(err)
  });
  winEmbed = new Discord.RichEmbed()
  .setAuthor(response.gamble_title.format(message.author.username), message.author.avatarURL)
  .addField(response.gamble_win_title.format(amount), response.gamble_total_message.format(newtotal))
  .setColor(color.lime)
  .setTimestamp();

  return message.channel.send(winEmbed);
  }
if(result == 0){
    stats[message.author.id].gamble_loses = stats[message.author.id].gamble_loses + 1;
    fumplebucks[message.author.id].fumplebucks = currentfumplebucks - amount;
    newtotal = parseInt(fumplebucks[message.author.id].fumplebucks);
    fs.writeFile("./fumplebucks.json", JSON.stringify(fumplebucks), (err) => {
      if(err) cosole.log(err)
    });
    loseEmbed = new Discord.RichEmbed()
    .setAuthor(response.gamble_title.format(message.author.username), message.author.avatarURL)
    .addField(response.gamble_lose_title.format(amount), response.gamble_total_message.format(newtotal))
    .setColor(color.crimson)
    .setTimestamp();


    return message.channel.send(loseEmbed);
    }
    fs.writeFile("./stats.json", JSON.stringify(stats), (err) => {
      if(err) console.log(err)
    });
}

module.exports.help = {
name: "gamble",
aliases: []
}
