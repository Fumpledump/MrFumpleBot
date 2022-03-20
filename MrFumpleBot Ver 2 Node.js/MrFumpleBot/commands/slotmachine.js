const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");
const fs = require("fs");
let stats = require("../stats.json");
let fumplebucks = require("../fumplebucks.json");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "slotmachine");

//Whitelist Command
if (message.guild.id != 411715542467215362 && message.guild.id != 483302549235957773){
  return message.channel.send("`Sorry but you can't use that command in this server...`");
}
//$slotmachine
let price = 25;
let lemon2 = price * 1;
let lemon3 = price * 2;
let cherry2 = price * 3;
let cherry3 = price * 12;
let meat2 = price * 5;
let meat3 = price * 16;
let gun2 = price * 7;
let gun3 = price * 20;
let horse2 = price * 9;
let horse3 = price * 24;
let bell2 = price * 11;
let bell3 = price * 28;
let beer2 = price * 13;
let beer3 = price * 32;
let moneybag2 = price * 15;
let moneybag3 = price * 36;
let gem2 = price * 17;
let gem3 = price * 40;

if(!fumplebucks[message.author.id]){
  fumplebucks[message.author.id] = {
    fumplebucks: 0,
    dumplings: 0,
    stash: 0
  };
  return message.channel.send(response.insufficent_fumplebucks);
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
if (price > fumplebucks[message.author.id].fumplebucks) return message.channel.send(response.insufficent_fumplebucks);
let currentfumplebucks = fumplebucks[message.author.id].fumplebucks;
fumplebucks[message.author.id].fumplebucks = currentfumplebucks - price;
let slotfumplebucks = fumplebucks[message.author.id].fumplebucks;

let firstresult = Math.floor((Math.random() * response.slotmachine_items.length));
let secondresult = Math.floor((Math.random() * response.slotmachine_items.length));
let thirdresult = Math.floor((Math.random() * response.slotmachine_items.length));

let FirstSlot = response.slotmachine_items[firstresult];
let MiddleSlot = response.slotmachine_items[secondresult];
let LastSlot = response.slotmachine_items[thirdresult];

var slotmessage = function(result_description, won_or_lost, amount)
{
fumplebucks[message.author.id].fumplebucks = slotfumplebucks + amount;
let earnings = amount - price;

if(won_or_lost === "lost"){
  earnings = price
}

stats[message.author.id].slotmachine_pulls = stats[message.author.id].slotmachine_pulls + 1;

let SlotMachineEmbed = new Discord.RichEmbed()
.setAuthor(response.slotmachine_author.format(message.author.username), message.author.avatarURL)
.setTitle(`🎰${FirstSlot}${MiddleSlot}${LastSlot}🎰`)
.setDescription(result_description)
.addField(response.slotmachine_result_title, response.slotmachine_result_message.format(message.author.username, won_or_lost, earnings, fumplebucks[message.author.id].fumplebucks))
.setColor(color.purple)
.setFooter(response.slotmachine_help)
.setTimestamp();

fs.writeFile("./fumplebucks.json", JSON.stringify(fumplebucks), (err) => {
  if(err) cosole.log(err)
});
fs.writeFile("./stats.json", JSON.stringify(stats), (err) => {
  if(err) console.log(err)
});
return message.channel.send(SlotMachineEmbed)
}

if(FirstSlot === "💀" || MiddleSlot === "💀" || LastSlot === "💀"){
  slotmessage(response.slotmachine_skull, "lost", 0);
} else if(FirstSlot === MiddleSlot && MiddleSlot === LastSlot){
  switch(FirstSlot){
    case "🍋":
    slotmessage(response.slotmachine_lemon3, "won", lemon3);
    break;
    case "🍒":
    slotmessage(response.slotmachine_cherry3, "won", cherry3);
    break;
    case "🍖":
    slotmessage(response.slotmachine_meat3, "won", meat3);
    break;
    case "🔫":
    slotmessage(response.slotmachine_gun3, "won", gun3);
    break;
    case "🐴":
    slotmessage(response.slotmachine_horse3, "won", horse3);
    break;
    case "🔔":
    slotmessage(response.slotmachine_bell3, "won", bell3);
    break;
    case "🍺":
    slotmessage(response.slotmachine_beer3, "won", beer3);
    break;
    case "💰":
    slotmessage(response.slotmachine_moneybag3, "won", moneybag3);
    break;
    case "💎":
    slotmessage(response.slotmachine_gem3, "won", gem3);
    break;
    default:
        return message.channel.send(response.slotmachine_unknown_item);
  }
} else if(FirstSlot === MiddleSlot || FirstSlot === LastSlot){
  switch(FirstSlot){
    case "🍋":
    slotmessage(response.slotmachine_lemon2, "won", lemon2);
    break;
    case "🍒":
    slotmessage(response.slotmachine_cherry2, "won", cherry2);
    break;
    case "🍖":
    slotmessage(response.slotmachine_meat2, "won", meat2);
    break;
    case "🔫":
    slotmessage(response.slotmachine_gun2, "won", gun2);
    break;
    case "🐴":
    slotmessage(response.slotmachine_horse2, "won", horse2);
    break;
    case "🔔":
    slotmessage(response.slotmachine_bell2, "won", bell2);
    break;
    case "🍺":
    slotmessage(response.slotmachine_beer2, "won", beer2);
    break;
    case "💰":
    slotmessage(response.slotmachine_moneybag2, "won", moneybag2);
    break;
    case "💎":
    slotmessage(response.slotmachine_gem2, "won", gem2);
    break;
    default:
        return message.channel.send(response.slotmachine_unknown_item);
  }
} else if (MiddleSlot === LastSlot) {
  switch(MiddleSlot){
    case "🍋":
    slotmessage(response.slotmachine_lemon2, "won", lemon2);
    break;
    case "🍒":
    slotmessage(response.slotmachine_cherry2, "won", cherry2);
    break;
    case "🍖":
    slotmessage(response.slotmachine_meat2, "won", meat2);
    break;
    case "🔫":
    slotmessage(response.slotmachine_gun2, "won", gun2);
    break;
    case "🐴":
    slotmessage(response.slotmachine_horse2, "won", horse2);
    break;
    case "🔔":
    slotmessage(response.slotmachine_bell2, "won", bell2);
    break;
    case "🍺":
    slotmessage(response.slotmachine_beer2, "won", beer2);
    break;
    case "💰":
    slotmessage(response.slotmachine_moneybag2, "won", moneybag2);
    break;
    case "💎":
    slotmessage(response.slotmachine_gem2, "won", gem2);
    break;
    default:
        return message.channel.send(response.slotmachine_unknown_item);
  }
} else {
  slotmessage(response.slotmachine_nomatch, "lost", 0);
}


}

module.exports.help = {
name: "slotmachine",
aliases: ["slots"]
}
