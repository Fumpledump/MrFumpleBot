const Discord = require('discord.js');
const fetch = require('snekfetch');
const color = require("../colors.json");
const logcommand = require("../logcommand.js");
const response = require("../responses.json");
const format = require("../format.js");
const emoji = ['🤣', '👅', '😱', '😆', '😂'];
module.exports.run = async (client, message) => {
  //Logging Command
  logcommand(message, "yomama");

  //$yomama
  fetch.get('https://api.apithis.net/yomama.php').then(joe => {
    const joke = new Discord.RichEmbed()
      .setColor(color.hot_pink)
      .setAuthor(`Insult made by ${message.author.username}`, message.author.avatarURL)
      .setTimestamp()
      .setFooter(response.User_ID_Footer.format(message.author.id))
      .setThumbnail("https://images-ext-2.discordapp.net/external/20Z1ku-cfCf1ESF_1-F25Mm9FMOach-7qzC628C43XI/https/cdn.discordapp.com/attachments/523621220235739156/539678156433522699/YOMAMADUMP.png?width=464&height=464")
      .addField(joe.body, `${emoji[~~(Math.random() * emoji.length)]}`);
    message.channel.send({
      embed: joke
    }).catch(e => co.error(e));
  }).catch(e => logger.error(e));
};
module.exports.help = {
  name: "yomama",
  aliases: []
};
