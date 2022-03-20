const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "spit");

  //$spit

  //~common~
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  let tavern_channel = message.guild.channels.find(c => c.name === botconfig.tavern_channel);
  let bot_channel = message.guild.channels.find(c => c.name === botconfig.bot_channel);
  let nsfw_channel = message.guild.channels.find(c => c.name === botconfig.nsfw_channel);

  //~average~
  let auction_channel = message.guild.channels.find(c => c.name === botconfig.auction_channel);
  let music_channel = message.guild.channels.find(c => c.name === botconfig.music_channel);
  let stock_discussion_channel = message.guild.channels.find(c => c.name === botconfig.stock_discussion_channel);

  //~rare~
  let general_channel = message.guild.channels.find(c => c.name === botconfig.general_channel);
  let kyles_channel = message.guild.channels.find(c => c.name === botconfig.kyles_channel);
  let suggestion_channel = message.guild.channels.find(c => c.name === botconfig.suggestion_channel);
  let meme_channel = message.guild.channels.find(c => c.name === botconfig.meme_channel);

  function commonspittoon() {
    if (getRandomInt(3) != 0) {
      return message.channel.send(response.successfulspit);
    } else {
      return message.channel.send(response.unsuccessfulspit);
    }
  }

  function averagespittoon() {
    if (getRandomInt(2) == 0) {
      return message.channel.send(response.successfulspit);
    } else {
      return message.channel.send(response.unsuccessfulspit);
    }
  }

  function rarespittoon() {
    if (getRandomInt(3) == 0) {
      return message.channel.send(response.successfulspit);
    } else {
      return message.channel.send(response.unsuccessfulspit);
    }
  }

  switch (message.channel) {
    case tavern_channel:
    case bot_channel:
    case nsfw_channel:
      commonspittoon();
      break;
    case auction_channel:
    case music_channel:
    case stock_discussion_channel:
      averagespittoon();
      break;
    case general_channel:
    case suggestion_channel:
    case kyles_channel:
    case meme_channel:
      rarespittoon();
      break;
    default:
      return message.channel.send(response.unspitable);
  }
}

module.exports.help = {
  name: "spit",
  aliases: []
}
