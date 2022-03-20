const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
let stats = require("../stats.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "setbio");

//$setbio [newbio]
if(!args[0]) return message.channel.send(response.missing_bio);

let newbio = args.slice(0).join(" ");

if(!stats[message.author.id]){
  stats[message.author.id] = {
    bio: response.unknown_bio,
    slotmachine_pulls: 0,
    gamble_wins: 0,
    gamble_loses: 0,
    russian_roulettes_survived: 0,
    russian_roulettes_deaths: 0
  };
}

stats[message.author.id].bio = newbio;

fs.writeFile("./stats.json", JSON.stringify(stats), (err) => {
  if(err) console.log(err)
});

return message.channel.send("`Bio Set`");
}

module.exports.help = {
name: "setbio",
aliases: []
}
