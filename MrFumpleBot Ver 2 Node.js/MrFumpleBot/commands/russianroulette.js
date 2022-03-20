const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
let stats = require("../stats.json");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "russianroulette");

  //russianroulette
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

  let result = Math.floor(Math.random() * Math.floor(7));

  if (result == 0) {
    stats[message.author.id].russian_roulettes_deaths = stats[message.author.id].russian_roulettes_deaths + 1;

    let rouletteEmbed = new Discord.RichEmbed()
      .setAuthor(response.russianroulette_author.format(message.author.username), message.author.avatarURL)
      .addField(response.russianroulette_title, response.russianroulette_lose_message)
      .setColor(color.crimson)
      .setTimestamp();

    return message.channel.send(rouletteEmbed);
  } else {
    stats[message.author.id].russian_roulettes_survived = stats[message.author.id].russian_roulettes_survived + 1;

    let rouletteEmbed = new Discord.RichEmbed()
      .setAuthor(response.russianroulette_author.format(message.author.username), message.author.avatarURL)
      .addField(response.russianroulette_title, response.russianroulette_win_message)
      .setColor(color.lime)
      .setTimestamp();

    return message.channel.send(rouletteEmbed);
    fs.writeFile("./stats.json", JSON.stringify(stats), (err) => {
      if (err) console.log(err)
    });
  }
}

module.exports.help = {
  name: "russianroulette",
  aliases: []
}
