const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
let stocks = require("../stocks.json");
const fs = require("fs");
let userstocks = require("../userstocks.json");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "resetstocks");

//$resetstocks
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(response.missing_permissions)
  stocks = {
    "stock_1_name": "Stock Number 1",
    "stock_1_abbr": "SNON",
    "stock_1_value": 200,
    "stock_1_amount": 100,
    "stock_2_name": "Stock Number 2",
    "stock_2_abbr": "SNTW",
    "stock_2_value": 200,
    "stock_2_amount": 100,
    "stock_3_name": "Stock Number 3",
    "stock_3_abbr": "SNTH",
    "stock_3_value": 200,
    "stock_3_amount": 100,
    "stock_4_name": "Stock Number 4",
    "stock_4_abbr": "SNFO",
    "stock_4_value": 200,
    "stock_4_amount": 100,
    "stock_5_name": "Stock Number 5",
    "stock_5_abbr": "SNFI",
    "stock_5_value": 200,
    "stock_5_amount": 100,
    "stock_6_name": "Stock Number 6",
    "stock_6_abbr": "SNSI",
    "stock_6_value": 200,
    "stock_6_amount": 100,
    "stock_7_name": "Stock Number 7",
    "stock_7_abbr": "SNSE",
    "stock_7_value": 200,
    "stock_7_amount": 100,
    "stock_8_name": "Stock Number 8",
    "stock_8_abbr": "SNEI",
    "stock_8_value": 200,
    "stock_8_amount": 100,
    "stock_9_name": "Stock Number 9",
    "stock_9_abbr": "SNNI",
    "stock_9_value": 200,
    "stock_9_amount": 100
  }
  fs.writeFile("./stocks.json", JSON.stringify(stocks), (err) => {
    if(err) cosole.log(err)
  });
  if(!userstocks[message.author.id]){
    userstocks[message.author.id] = {
      stock1: 0,
      stock2: 0,
      stock3: 0,
      stock4: 0,
      stock5: 0,
      stock6: 0,
      stock7: 0,
      stock8: 0,
      stock9: 0
    };
  }
  fs.writeFile("./userstocks.json", JSON.stringify(userstocks), (err) => {
    if(err) cosole.log(err)
  });

  message.channel.send("`Stocks Reseted.`");
}

module.exports.help = {
  name: "resetstocks",
  aliases: []
}
