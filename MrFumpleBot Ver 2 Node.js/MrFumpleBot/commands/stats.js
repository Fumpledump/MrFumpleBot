const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
let fumplebucks = require("../fumplebucks.json");
let xp = require("../xp.json");
let stats = require("../stats.json");
let crime = require("../crime.json");
const color = require("../colors.json");
let game = require("../game.json");
let userstocks = require("../userstocks.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "stats");

  //Whitelist Command
  if (message.guild.id != 411715542467215362 && message.guild.id != 483302549235957773) {
    return message.channel.send("`Sorry but you can't use that command in this server...`");
  }
  //$stats [Mentioned Person]
  let sUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if (!sUser) {
    sUser = message.author;
    sUsername = message.author.username;
    sAvatar = message.author.avatarURL
  } else {
    sUsername = sUser.user.username;
    sAvatar = sUser.user.avatarURL;
  }

  if (!fumplebucks[sUser.id]) {
    fumplebucks[sUser.id] = {
      fumplebucks: 0,
      dumplings: 0,
      stash: 0
    };
  }
  if (!fumplebucks[sUser.id].dumplings) {
    fumplebucks[sUser.id].dumplings = 0;
  }

  if (!xp[sUser.id]) {
    xp[sUser.id] = {
      xp: 0,
      level: 1,
      skillpoints: 0
    };
  }
  if (!stats[sUser.id]) {
    stats[sUser.id] = {
      bio: response.unknown_bio,
      slotmachine_pulls: 0,
      gamble_wins: 0,
      gamble_loses: 0,
      russian_roulettes_survived: 0,
      russian_roulettes_deaths: 0
    };
  }
  if (!crime[sUser.id]) {
    crime[sUser.id] = {
      stolen_fumplebucks_earned: 0,
      fumplebucks_stolen: 0,
      successful_mugs: 0,
      unsuccessful_mugs: 0
    };
  }

  if (!game[sUser.id]) {
    game[sUser.id] = {
      Tictactoe_Wins: 0,
      Tictactoe_Losses: 0,
      Tictactoe: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      Symbol: "None",
      Turn: "Next",
      Playing: "Nobody",
      Game: "None",
      Status: "Closed"
    };
  }

  //Bio
  let bio = stats[sUser.id].bio;
  //Fumplebucks
  let currentfumplebucks = fumplebucks[sUser.id].fumplebucks;
  let currentstash = fumplebucks[sUser.id].stash;
  let currentdumplings = fumplebucks[sUser.id].dumplings;
  //Experience
  let currentlevel = xp[sUser.id].level;
  let currentxp = xp[sUser.id].xp;
  //Crime
  let current_stolen_fumplebucks_earned = crime[sUser.id].stolen_fumplebucks_earned;
  let current_fumplebucks_stolen = crime[sUser.id].fumplebucks_stolen;
  let current_successful_mugs = crime[sUser.id].successful_mugs;
  let current_unsuccessful_mugs = crime[sUser.id].unsuccessful_mugs;
  //Game Stats
  let tictactoe_wins = game[sUser.id].Tictactoe_Wins;
  let tictactoe_losses = game[sUser.id].Tictactoe_Losses;
  //Personal Stats
  let slotmachinepulls = stats[sUser.id].slotmachine_pulls;
  let gamblewins = stats[sUser.id].gamble_wins;
  let gambleloses = stats[sUser.id].gamble_loses;
  let russianroulettessurvived = stats[sUser.id].russian_roulettes_survived;
  let russianroulettesdeaths = stats[sUser.id].russian_roulettes_deaths;

  let statsembed = new Discord.RichEmbed()
    .setAuthor(response.stats_setAuthor.format(sUsername), sAvatar)
    .setThumbnail(sAvatar)
    .setColor(color.royal_blue)
    .addField(response.bio_title, bio)
    .addField(response.stats_Balance_title, response.stats_Balance_message.format(sUsername, currentfumplebucks, currentstash, currentdumplings))
    .addField(response.stats_Experience_title, response.stats_Experience_message.format(sUsername, currentlevel, currentxp))
    .addField(response.crime_title, response.crime_stats.format(sUsername, current_stolen_fumplebucks_earned, current_fumplebucks_stolen, current_successful_mugs, current_unsuccessful_mugs))
    .addField(response.stats_game_title, response.stats_game_message.format(tictactoe_wins, tictactoe_losses))
    .addField(response.personal_stats_title, response.stats_personal.format(slotmachinepulls, gamblewins, gambleloses, russianroulettessurvived, russianroulettesdeaths))
    .setFooter(response.stats_setFooter.format(sUser.id))
    .setTimestamp();

  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if (err) console.log(err)
  });

  fs.writeFile("./fumplebucks.json", JSON.stringify(fumplebucks), (err) => {
    if (err) console.log(err)
  });

  fs.writeFile("./stats.json", JSON.stringify(stats), (err) => {
    if (err) console.log(err)
  });

  return message.channel.send(statsembed);
}

module.exports.help = {
  name: "stats",
  aliases: ["playerstats", "statistics"]
}
