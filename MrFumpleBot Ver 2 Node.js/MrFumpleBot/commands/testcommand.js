/*
  ~~Template Command Code~~

  const Discord = require("discord.js");
  const response = require("../responses.json");
  const format = require("../format.js");
  const logcommand = require("../logcommand.js");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "name of command");

  //$YourCommand
          ~~YOUR COMMAND~~
}

module.exports.help = {
  name: "name of command",
  aliases: []
}
*/

const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const fs = require("fs");
let fumplebucks = require("../fumplebucks.json");
let mystocks = JSON.parse(fs.readFileSync('./mystocks.json', 'utf8'));
let cooldowns = JSON.parse(fs.readFileSync('./cooldowns.json', 'utf8'));
let users = require("../users.json");

module.exports.run = async (bot, message, args) => {
  logcommand(message, "testcommand");
  //$testcommand
  console.log(response.test_response.format("testcommand"));
  console.log(message.author.id);
  console.log(mystocks[message.author.id].Stocks_One_Amount);
  console.log(mystocks[users[message.author.id].Id].Stocks_Two_Amount);

  for(x in users){
    console.log(users[x].Id)
    mystocks[x] = {
      Stocks_One_Amount: 0,
      Stocks_Two_Amount: 0,
      Stocks_Three_Amount: 0,
      Stocks_Four_Amount: 0,
      Stocks_Five_Amount: 0,
      Stocks_Six_Amount: 0,
      Stocks_Seven_Amount: 0,
      Stocks_Eight_Amount: 0,
      Owned_Stocks: {"Stock_One":"None", "Stock_Two":"None"}
    };
    mystocks[users[x].Id].Stocks_One_Amount = 5
    mystocks[users[x].Id].Stocks_Two_Amount = 2
    mystocks[users[x].Id].Stocks_Four_Amount = 1
  }

  fs.writeFile("./mystocks.json", JSON.stringify(mystocks), (err) => {
    if(err) cosole.log(err)
  });
}

module.exports.help = {
  name: "testcommand",
  aliases: []
}
