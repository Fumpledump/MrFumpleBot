const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const command_data = require("../commanddata.json");
const botconfig = require("../botconfig.json");
const fs = require("fs");
let cooldowns = JSON.parse(fs.readFileSync('./cooldowns.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "tweet");

  //Whitelist Command
  if (message.guild.id != 411715542467215362 && message.guild.id != 483302549235957773) {
    return message.channel.send("`Sorry but you can't use that command in this server...`");
  }
  //$tweet [Tweet]
  let cdseconds = 3600;

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
  if (cooldowns[message.author.id].tweet_done == "No") {
    cooldowns[message.author.id].last_tweet = message.createdAt;
    cooldowns[message.author.id].tweet_done = "Yes";
    setTimeout(() => {
      cooldowns[message.author.id].tweet_done = "No";
      fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
        if (err) console.log(err)
      });
      console.log(`${message.author.username} tweet cooldown has ended.`)
    }, cdseconds * 1000);

    fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
      if (err) console.log(err)
    });

    let tweet = args.slice(0).join(" ");
    if (!tweet) return message.channel.send(response.missing_tweet);
    if (tweet == command_data.last_tweet) return message.channel.send(response.same_tweet);


    var Twit = require('twit');

    var T = new Twit({
      consumer_key: botconfig.twitter_consumer_key,
      consumer_secret: botconfig.twitter_consumer_secret,
      access_token: botconfig.twitter_access_token,
      access_token_secret: botconfig.twitter_access_token_secret,
    });

    T.post('statuses/update', {
      status: tweet
    }, function(err, data, response) {
      if (err) {
        return message.channel.send(err);
      }
      command_data.last_tweet = tweet;
    })

    message.channel.send(response.tweet_confirmation);
    return message.channel.send("`To see your tweet all you have to do is go to this link -->` https://twitter.com/FumpleMr");
  } else if (cooldowns[message.author.id].tweet_done == "Yes") {
    return message.channel.send(response.tweet_done.format(cooldowns[message.author.id].last_tweet));
  }
}

module.exports.help = {
  name: "tweet",
  aliases: []
}
