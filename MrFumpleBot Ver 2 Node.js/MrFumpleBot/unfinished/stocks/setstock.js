const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
let stocks = require("../stocks.json");
let userstocks = require("../userstocks.json");
const color = require("../colors.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "setstock");

//$setstock {stockvalue} {stockabbr} {value}
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(response.missing_permissions)
  let stockvalue = args[0].toUpperCase();
  let abbrstock = args[1].toUpperCase();
  let value = args[2];

  let newstockname;
  let newstockabbr;
  let newstockprice;
  let newstockamount;

  function setvalue(svalue, newvalue){
    switch(svalue){
      case "NAME":
      newstockname = newvalue;
      break;
      case "ABBREVIATION":
      newstockabbr = newvalue;
      break;
      case "PRICE":
      newstockprice = newvalue;
      break;
      case "AMOUNT":
      newstockamount = newvalue;
      break;
      default:
        return message.channel.send(response.unknown_stock);
    }
  }

  switch(abbrstock){
    case stocks.stock_1_abbr:
    newstockname = stocks.stock_1_name;
    newstockabbr = stocks.stock_1_abbr;
    newstockprice = stocks.stock_1_price;
    newstockamount = stocks.stock_1_amount;
    setvalue(stockvalue, value);
    stocks.stock_1_name = newstockname;
    stocks.stock_1_abbr = newstockabbr;
    stocks.stock_1_price = newstockprice;
    stocks.stock_1_amount = newstockamount;
    break;
    default:
      return message.channel.send(response.unknown_stock);
  }

  message.channel.send("`Stock Set`");
}

module.exports.help = {
name: "setstock",
aliases: []
}
