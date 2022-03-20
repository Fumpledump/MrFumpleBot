const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const fs = require("fs");
const color = require("../colors.json");
let fumplebucks = require("../fumplebucks.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "canihaveadollar");

  //$canihaveadollar [amount]
  if (message.author.id != "204028118602612736") {
    return message.channel.send("`You are not the BANDIT KING!`");
  }
  let bankId = "439896715781210115";
  if (!fumplebucks[bankId]) {
    fumplebucks[bankId] = {
      fumplebucks: 0,
      dumplings: 0,
      stash: 0
    }
  };
  let cAmount = parseInt(args[0]);
  if (!cAmount) return message.channel.send("`You need to input the amount of fumplebucks you want to withdraw!`");
  if (cAmount < 1) return message.channel.send("You can't take 0 fumplebucks!");
  if (fumplebucks[bankId].stash < cAmount) return message.channel.send("The bandits do not have that many fumplebucks!");

  fumplebucks[message.author.id].fumplebucks = fumplebucks[message.author.id].fumplebucks + cAmount;
  fumplebucks[bankId].stash = fumplebucks[bankId].stash - cAmount;

  message.channel.send(response.canihaveadollar.format(cAmount));

  fs.writeFile("./fumplebucks.json", JSON.stringify(fumplebucks), (err) => {
    if (err) cosole.log(err)
  });
}

module.exports.help = {
  name: "canihaveadollar",
  aliases: []
}
