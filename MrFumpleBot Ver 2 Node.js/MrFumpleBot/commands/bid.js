const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const command_data = require("../commanddata.json");
let fumplebucks = require("../fumplebucks.json");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "bid");

  //$bis [amount]
  let amount = parseInt(args[0]);
  if (!amount) return message.channel.send(response.missing_bid);
  if (amount < 0) return message.channel.send(response.bid_amount_too_small);
  if (amount > fumplebucks[message.author.id].fumplebucks) return message.channel.send(response.insufficent_fumplebucks);
  if (amount <= command_data.last_bid) return message.channel.send(response.bid_under.format(command_data.last_bid, command_data.bid_owner));
  command_data.last_bid = amount;
  command_data.bid_owner = message.author.username;
  let bidEmbed = new Discord.RichEmbed()
    .setAuthor(response.bid_author.format(message.author.username), message.author.avatarURL)
    .addField(response.bid_title.format(message.author.username), response.bid_message.format(message.author.username, amount))
    .setColor(color.lime)
    .setTimestamp();

  let bids_channel = bot.guilds.get("411715542467215362").channels.get("455218919884587019");

  bids_channel.send(bidEmbed);
  return message.channel.send("`Bid made.`");
}

module.exports.help = {
  name: "bid",
  aliases: []
}
