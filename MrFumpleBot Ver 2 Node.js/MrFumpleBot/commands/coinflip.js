const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "coinflip");

  //$coinflip
  const rolled = Math.floor(Math.random() * 2) + 1;
  let headembed = new Discord.RichEmbed()
    .setAuthor(`Coin Flip made by ${message.author.username}`, message.author.avatarURL)
    .addField(`Results:`, `You flipped: **Heads**!`)
    .setThumbnail("https://cdn.discordapp.com/attachments/523621220235739156/540796012218941440/139362185558690588heads-hi.png")
    .setColor('RANDOM')
    .setTimestamp();
  let tailembed = new Discord.RichEmbed()
    .setAuthor(`Coin Flip made by ${message.author.username}`, message.author.avatarURL)
    .addField(`Results:`, `You flipped: **Tails**!`)
    .setThumbnail("https://cdn.discordapp.com/attachments/523621220235739156/540796174492499968/1393621733287511319tails-md.png")
    .setColor('RANDOM')
    .setTimestamp();
  if (rolled == "1") {
    message.channel.send(tailembed);
  }
  if (rolled == "2") {
    message.channel.send(headembed);
  }
}

module.exports.help = {
  name: "coinflip",
  aliases: ["flipcoin"]
}
