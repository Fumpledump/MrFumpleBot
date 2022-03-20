const Discord = require("discord.js");
const response = require("../responses.json");
const logcommand = require("../logcommand.js");
const superagent = require("superagent");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "dog");

  //$dog
  let {body} = await superagent
  .get(`https://random.dog/woof.json`);

  let dogembed = new Discord.RichEmbed()
  .setColor(color.saddle_brown)
  .setTitle(":dog: Dog :dog:")
  .setImage(body.url)
  .setTimestamp();

  message.channel.send(dogembed);
}

module.exports.help = {
  name: "dog",
  aliases: []
}
