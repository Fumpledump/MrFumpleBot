const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "birthday");

//$birthday
let result = Math.floor((Math.random() * response.birthday_urls.length));


let birthdayembed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle("John's Birthday Invitation")
.setAuthor(response.birthday_author.format(message.author.username), message.author.avatarURL)
.setDescription("You are invited to John's 17th birthday party and below is information on the party!")
.setThumbnail('https://cdn.discordapp.com/attachments/575536451530260480/630244411368013824/ARQR.png')
.addField("Date", "October 13th")
.addField("Time", "2 pm and you can stay the night!")
.addField("Address", "7105 Wayne Lane Biloxi Mississippi")
.addField("Food", "We will have cake, pizza, snacks, and now probably a giant ice cream bowl thanks to you guys!")
.addField("Other", "Bring a controller to play games, bring a sleeping bag if you are going to stay the night and tell me if you are coming to the party or not!")
.setImage("https://cdn.discordapp.com/attachments/516138714745929784/631029848751472640/Birthday_Invite_Finale.png")
.setTimestamp()
.setFooter("Hey by the way you should click the link that changes everytime you use this command.", "https://images-ext-2.discordapp.net/external/jwS_-rHC0Ki7M5oeEDxJRWx_gDvcwxi0_pVc3aVFRWQ/https/images-ext-1.discordapp.net/external/AK3j_NHWVTgKarek2RiwjHs5y2OvSFxNc-vjQ4cJUoU/https/cdn.discordapp.com/attachments/483302550666346498/492014432692731922/question_mark_good.png")
.setURL(response.birthday_urls[result]);

return message.channel.send(birthdayembed);
}

module.exports.help = {
name: "birthday",
aliases: ["bday"]
}
