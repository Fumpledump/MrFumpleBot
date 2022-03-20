const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "vote");

//$vote
let vReason = args.slice(0).join(" ");
if(!vReason) return message.channel.send(response.missing_vote);

let shameEmbed = new Discord.RichEmbed()
.setAuthor(response.vote_by.format(message.author.username), message.author.avatarURL)
.addField(response.vote_title.format(vReason), response.vote_description.format(message.author.id, vReason))
.addField(response.vote_help_title, response.vote_helpmessage)
.setColor(color.royal_blue)
.setTimestamp();

return message.channel.send(shameEmbed).then(async e => {
    await e.react("✅")
    await e.react("❌")
});
}

module.exports.help = {
name: "vote",
aliases: ["poll"]
}
