const Discord = require("discord.js");
const response = require("../responses.json");
const logcommand = require("../logcommand.js");
const superagent = require("superagent");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "cat");

  //$cat
  let {
    body
  } = await superagent
    .get(`http://aws.random.cat/meow`);

  let catembed = new Discord.RichEmbed()
    .setColor(color.orange)
    .setTitle(":cat: Cat :cat:")
    .setImage(body.file)
    .setTimestamp();

  message.channel.send(catembed);
}

module.exports.help = {
  name: "cat",
  aliases: []
}
