const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "paytable");

  //Whitelist Command
  if (message.guild.id != 411715542467215362 && message.guild.id != 483302549235957773) {
    return message.channel.send("`Sorry but you can't use that command in this server...`");
  }
  //$paytable
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

  let tableEmbed = new Discord.RichEmbed()
    .setAuthor(response.paymenttable_author.format(message.author.username), message.author.avatarURL)
    .setTitle(response.paymenttable_title)
    .setColor(color.purple)
    .addField("Cost", "The cost playing a slot machine is `{0}` fumplebucks.".format(price))
    .addField("💀Skulls💀", "Negates any money you win in the slot machine.")
    .addField("🍋Lemons🍋", response.paymenttable_cost.format("🍋", lemon2, lemon3))
    .addField("🍒Cherries🍒", response.paymenttable_cost.format("🍒", cherry2, cherry3))
    .addField("🍖Meat🍖", response.paymenttable_cost.format("🍖", meat2, meat3))
    .addField("🔫Guns🔫", response.paymenttable_cost.format("🔫", gun2, gun3))
    .addField("🐴Horses🐴", response.paymenttable_cost.format("🐴", horse2, horse3))
    .addField("🔔Bells🔔", response.paymenttable_cost.format("🔔", bell2, bell3))
    .addField("🍺Beers🍺", response.paymenttable_cost.format("🍺", beer2, beer3))
    .addField("💰MoneyBags💰", response.paymenttable_cost.format("💰", moneybag2, moneybag3))
    .addField("💎Gems💎", response.paymenttable_cost.format("💎", gem2, gem3))
    .setFooter(response.paymenttable_footer)
    .setTimestamp();

  return message.channel.send(tableEmbed);
}

module.exports.help = {
  name: "paytable",
  aliases: ["paymenttable"]
}
