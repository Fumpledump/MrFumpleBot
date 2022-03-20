const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const command_data = require("../commanddata.json");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "chat");

//$chat [Message]
let msg = args.slice(0).join(" ");
if(!msg) return message.channel.send(response.missing_chatmsg);

var txt = command_data.chat_text;
var order = 6;
var ngrams = {};

  for (var i = 0; i <= txt.length - order; i++){
    var gram = txt.substring(i, i + order);

    if(!ngrams[gram]) {
      ngrams[gram] = [];
    }
    ngrams[gram].push(txt.charAt(i + order));
  }

  var currentGram = txt.substring(0, order);
  var result = currentGram;

  for (var i = 0; i < 10; i++) {
    var possibilities = ngrams[currentGram];
    if (!possibilities) {
      break;
    }
    var next = Math.floor((Math.random() * possibilities));
    result += next;
    var len = result.length;

    currentGram = result.substring(len - order, len);
  }

  return message.channel.send(result);
}

module.exports.help = {
name: "chat",
aliases: []
}
