const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const fs = require("fs");
let stats = require("../stats.json");
let fumplebucks = require("../fumplebucks.json");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "advertise");

  //$advertise [message]
  let adchannel = message.guild.channels.find(c => c.name === "advertisements");
  if (!args[0]) return message.channel.send("You need to include what you are gonna advertise!");
  let ad = args.slice(0).join(" ");
  let price = 500;
  if (!fumplebucks[message.author.id]) {
    fumplebucks[message.author.id] = {
      fumplebucks: 0,
      dumplings: 0,
      stash: 0
    };
    return message.channel.send(response.insufficent_fumplebucks);
  }
  if (!stats[message.author.id]) {
    stats[message.author.id] = {
      bio: response.unknown_bio,
      slotmachine_pulls: 0,
      gamble_wins: 0,
      gamble_loses: 0,
      russian_roulettes_survived: 0,
      russian_roulettes_deaths: 0
    };
  }
  if (price > fumplebucks[message.author.id].fumplebucks) return message.channel.send(response.insufficent_fumplebucks);
  let currentfumplebucks = fumplebucks[message.author.id].fumplebucks;

  fumplebucks[message.author.id].fumplebucks = currentfumplebucks - price;
  let adEmbed = new Discord.RichEmbed()
    .setAuthor("brought to you by {0}".format(message.author.username), message.author.avatarURL)
    .setTitle("Ad")
    .setDescription(ad)
    .setTimestamp()
    .setFooter("If you want an ad like this use $advertise [your message] it only cost 500 fumplebucks")
    .setColor(color.blue);


  adchannel.send(adEmbed);

  fs.writeFile("./fumplebucks.json", JSON.stringify(fumplebucks), (err) => {
    if (err) cosole.log(err)
  });
  fs.writeFile("./stats.json", JSON.stringify(stats), (err) => {
    if (err) console.log(err)
  });
}

module.exports.help = {
  name: "advertise",
  aliases: ["ad"]
}
