const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");
let fumplebucks = require("../fumplebucks.json");
const fs = require("fs");
let cooldowns = JSON.parse(fs.readFileSync('./cooldowns.json', 'utf8'));


module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "daily");

  //Whitelist Command
  if (message.guild.id != 411715542467215362 && message.guild.id != 483302549235957773) {
    return message.channel.send("`Sorry but you can't use that command in this server...`");
  }
  //$daily
  let cdseconds = 86400;
  let amount = 50;

  if (!fumplebucks[message.author.id]) {
    fumplebucks[message.author.id] = {
      fumplebucks: 0,
      dumplings: 0,
      stash: 0
    };
  }

  if (!cooldowns[message.author.id]) {
    cooldowns[message.author.id] = {
      last_daily: "Never Done",
      daily_done: "No",
      last_tweet: "Never Done",
      tweet_done: "No",
      last_mug: "Never Done",
      mug_done: "No"
    };
  }
  if (cooldowns[message.author.id].daily_done == "No") {
    cooldowns[message.author.id].last_daily = message.createdAt;
    fumplebucks[message.author.id].fumplebucks = fumplebucks[message.author.id].fumplebucks + amount;
    cooldowns[message.author.id].daily_done = "Yes";
    setTimeout(() => {
      cooldowns[message.author.id].daily_done = "No";
      fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
        if (err) console.log(err)
      });
      console.log(`${message.author.username} daily cooldown has ended.`)
    }, cdseconds * 1000);

    fs.writeFile("./fumplebucks.json", JSON.stringify(fumplebucks), (err) => {
      if (err) console.log(err)
    });

    fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
      if (err) console.log(err)
    });

    let dailyEmbed = new Discord.RichEmbed()
      .setAuthor(response.daily_author.format(message.author.username), message.author.avatarURL)
      .setThumbnail(message.author.avatarURL)
      .addField(response.daily_title.format(message.author.username, amount), response.daily_total.format(fumplebucks[message.author.id].fumplebucks))
      .setColor(color.royal_blue)
      .setTimestamp();
    return message.channel.send(dailyEmbed);
  } else if (cooldowns[message.author.id].daily_done == "Yes") {
    return message.channel.send(response.daily_earned.format(cooldowns[message.author.id].last_daily));
  }
}

module.exports.help = {
  name: "daily",
  aliases: []
}
