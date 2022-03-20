const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "8ball");

  //$8ball [question]
  if (!args[0]) return message.channel.send(response.missing_question);

  let result = Math.floor((Math.random() * response.eightball_replies.length));
  let question = args.slice(0).join(" ");

  let ballembed = new Discord.RichEmbed()
    .setAuthor(response.eightball_author.format(message.author.username))
    .setColor(color.black)
    .addField(response.eightball_question_title, question)
    .addField(response.eightball_answer_title, response.eightball_replies[result])
    .setThumbnail("https://images-ext-2.discordapp.net/external/oUkR5URLJx24Ue38b-HOteurioi-ZqvtolE8NUZ6VNE/https/cdn.discordapp.com/attachments/523621220235739156/539664098921676811/MagicFumple8.png")
    .setFooter(response.User_ID_Footer.format(message.author.id))
    .setTimestamp();

  message.channel.send(ballembed)
}

module.exports.help = {
  name: "8ball",
  aliases: []
}
