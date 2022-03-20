const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "shame");

//$shame [@Mentioned Person] [Shame Reason]
let sUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!sUser) return message.channel.reply(response.missing_user);
let sReason = args.join(" ").slice(22);
if(!sReason) return message.channel.send(response.missing_reason);

let shameEmbed = new Discord.RichEmbed()
.setAuthor(response.shamed_by.format(message.author.username), message.author.avatarURL)
.addField(response.shame_title, response.shame_description.format(message.author.id, sUser.user.id, sReason))
.addField(response.shame_help_title, response.shame_helpmessage)
.setThumbnail("https://images-ext-2.discordapp.net/external/iqP1OJ9QcZog8g5NNZHkSrOwenYrNZZBHmNLaFTceWE/https/cdn.discordapp.com/attachments/422551692186222595/424344069615910912/Tomato-by-Rones.png?width=512&height=464")
.setColor(color.red)
.setTimestamp();

return message.channel.send(shameEmbed).then(async e => {
    await e.react("🍅")
});
}

module.exports.help = {
name: "shame",
aliases: []
}
