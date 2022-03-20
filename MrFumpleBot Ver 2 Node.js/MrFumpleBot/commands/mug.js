const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");
let fumplebucks = require("../fumplebucks.json");
let crime = require("../crime.json");
const fs = require("fs");
let cooldowns = JSON.parse(fs.readFileSync('./cooldowns.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "mug");
  //johnhaley65461

  //sheriff start
  //mugging
  //sheriif end
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  //Whitelist Command
  if (message.guild.id != 411715542467215362 && message.guild.id != 483302549235957773) {
    return message.channel.send("`Sorry but you can't use that command in this server...`");
  }
  //$mug [@Mentioned User]
  let one_hour = 3600;
  let two_hours = 7200;
  let three_hours = 10800;
  let four_hours = 14400;
  let cdseconds = 3600;
  let mUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!mUser) return message.channel.send(response.missing_user);
  if (!crime[message.author.id]) {
    crime[message.author.id] = {
      stolen_fumplebucks_earned: 0,
      fumplebucks_stolen: 0,
      successful_mugs: 0,
      unsuccessful_mugs: 0
    };
  }
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
  if (!crime[mUser.id]) {
    crime[mUser.id] = {
      stolen_fumplebucks_earned: 0,
      fumplebucks_stolen: 0,
      successful_mugs: 0,
      unsuccessful_mugs: 0
    };
  }
  if (!fumplebucks[mUser.id]) {
    fumplebucks[mUser.id] = {
      fumplebucks: 0,
      stash: 0
    };
  }
  if (cooldowns[message.author.id].mug_done == "Yes") {
    return message.channel.send(response.mug_done.format(cooldowns[message.author.id].last_mug));
  }
  if (!cooldowns[mUser.id]) {
    cooldowns[mUser.id] = {
      last_daily: "Never Done",
      daily_done: "No",
      last_tweet: "Never Done",
      tweet_done: "No",
      last_mug: "Never Done",
      mug_done: "No"
    };
  }

  var end = function() {
    if (cdseconds == one_hour) {
      mugEmbed.setFooter(response.mug_timer_onehour);
    } else if (cdseconds == two_hours) {
      mugEmbed.setFooter(response.mug_timer_twohours);
    } else if (cdseconds == three_hours) {
      mugEmbed.setFooter(response.mug_timer_threehours);
    } else if (cdseconds == four_hours) {
      mugEmbed.setFooter(response.mug_timer_fourhours);
    }
    cooldowns[message.author.id].last_mug = message.createdAt;
    cooldowns[message.author.id].mug_done = "Yes";
    setTimeout(() => {
      cooldowns[message.author.id].mug_done = "No";
      fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
        if (err) console.log(err)
      });
      console.log(`${message.author.username} mug cooldown has ended.`)
    }, cdseconds * 1000);
    fs.writeFile("./fumplebucks.json", JSON.stringify(fumplebucks), (err) => {
      if (err) console.log(err)
    });
    fs.writeFile("./crime.json", JSON.stringify(crime), (err) => {
      if (err) console.log(err)
    });
    fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
      if (err) console.log(err)
    });
  }

  let mugEmbed = new Discord.RichEmbed()
    .setAuthor(response.mug_author.format(message.author.username, mUser.user.username), message.author.avatarURL)
    .setThumbnail(mUser.user.avatarURL)
    .setTimestamp();

  if (message.author.id == mUser.id) {
    let selfmsg = Math.floor((Math.random() * response.mug_self_messages.length));
    mugEmbed.setColor(color.crimson);
    mugEmbed.addField(response.mug_self.format(message.author.username), response.mug_self_messages[selfmsg].format(message.author.username), false);
    mugEmbed.addField(response.mug_results_title, response.mug_results_self_mug, false);
    cdseconds = one_hour;
    end();
    return message.channel.send(mugEmbed);
  }
  if (fumplebucks[mUser.id].fumplebucks == 0) {
    mugEmbed.setColor(color.crimson);
    mugEmbed.addField(response.mug_title.format(message.author.username.mUser.user.username), response.mug_event.format(message.author.username), false);
    mugEmbed.addField(response.mug_nomoney_title.format(mUser.user.username), response.mug_nomoney_message.format(mUser.user.username), false);
    mugEmbed.addField(response.mug_results_title, response.mug_results_nomoney.format(mUser.user.username, message.author.username), false);
    cdseconds = one_hour;
    end();
    return message.channel.send(mugEmbed);
  }
  //mug Code
  let potentialmoney;
  let mugedarea = Math.floor(Math.random() * Math.floor(3));
  let mugevent = Math.floor(Math.random() * Math.floor(3));
  if (mugedarea == 0) {
    potentialmoney = getRandomInt(0, fumplebucks[mUser.id].fumplebucks);
  } else if (mugedarea == 1) {
    potentialmoney = getRandomInt(0, fumplebucks[mUser.id].fumplebucks / 2);
  } else {
    potentialmoney = getRandomInt(0, fumplebucks[mUser.id].fumplebucks / 3);
  }
  console.log(mugevent);
  console.log(potentialmoney);

  let earnedmoney;
  if (bot.fetchUser('246813230205370379').status == "online" && message.author.id != "246813230205370379" && mUser.user.id != "246813230205370379") {
    let sheriffstop = Math.floor(Math.random() * Math.floor(3));
    if (sheriffstop == 0) { //mug not stopped
      mugEmbed.addField(response.new_mug_start.format(message.author.username, mUser.user.username, potentialmoney), response.new_mug_success.format(message.author.username));
      mugEmbed.setColor(color.lime);
      mugEmbed.addField(response.mug_results_title, response.mug_success_results.format(message.author.username, potentialmoney, mUser.user.username, fumplebucks[mUser.id].fumplebucks, fumplebucks[message.author.id].fumplebucks));
      crime[message.author.id].successful_mugs = crime[message.author.id].successful_mugs + 1;
      crime[message.author.id].stolen_fumplebucks_earned = crime[message.author.id].stolen_fumplebucks_earned + potentialmoney;
      crime[mUser.user.id].fumplebucks_stolen = crime[mUser.user.id].fumplebucks_stolen + potentialmoney;
      cdseconds = one_hour;
      end();
      return message.channel.send(mugEmbed);
    } else { //mugg stopped
      mugEmbed.addField(response.new_mug_start.format(message.author.username, mUser.user.username, potentialmoney), response.new_mug_owner_stop.format(message.author.username));
      mugEmbed.addField(response.mug_results_title, response.new_mug_fail_results.format(message.author.username, mUser.user.username));
      mugEmbed.setColor(color.crimson);
      crime[message.author.id].unsuccessful = crime[message.author.id].unsuccessful + 1;
      cdseconds = three_hours;
      end();
      return message.channel.send(mugEmbed);
    }
  } else {
    let mugstop = Math.floor(Math.random() * Math.floor(2));
    if (mugstop == 0) { //success
      mugEmbed.addField(response.new_mug_start.format(message.author.username, mUser.user.username, potentialmoney), response.new_mug_success.format(message.author.username));
      mugEmbed.setColor(color.lime);
      mugEmbed.addField(response.mug_results_title, response.mug_success_results.format(message.author.username, potentialmoney, mUser.user.username, fumplebucks[mUser.id].fumplebucks, fumplebucks[message.author.id].fumplebucks));
      crime[message.author.id].successful_mugs = crime[message.author.id].successful_mugs + 1;
      crime[message.author.id].stolen_fumplebucks_earned = crime[message.author.id].stolen_fumplebucks_earned + potentialmoney;
      crime[mUser.user.id].fumplebucks_stolen = crime[mUser.user.id].fumplebucks_stolen + potentialmoney;
      cdseconds = one_hour;
      end();
      return message.channel.send(mugEmbed);
    } else { //fail
      mugEmbed.addField(response.new_mug_start.format(message.author.username, mUser.user.username, potentialmoney), response.new_mug_stop.format(message.author.username, mUser.user.username));
      mugEmbed.addField(response.mug_results_title, response.new_mug_fail_results.format(message.author.username, mUser.user.username));
      mugEmbed.setColor(color.crimson);
      crime[message.author.id].unsuccessful = crime[message.author.id].unsuccessful + 1;
      cdseconds = two_hours;
      end();
      return message.channel.send(mugEmbed);
    }
  }
}

module.exports.help = {
  name: "mug",
  aliases: []
}
