const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const fs = require("fs");
let mystocks = JSON.parse(fs.readFileSync('./mystocks.json', 'utf8'));
let stocks = require("../stocks.json");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "getstocks");

  //$stocks
  var stockstatus = function(stock_price, stock_num, stock_name, stock_abbreviation, stock_owned)
  {
    if(stock_price <= 0){
      stockembed.addField(response.stock_num_title.format(stock_num), response.stock_purchasable.format(stock_num));
    }else{
      stockembed.addField("📈`{0}`📉".format(stock_name), response.stock_info.format(stock_name, stock_abbreviation, stock_price, stock_owned));
    }
  }

  let stockembed = new Discord.RichEmbed()
  .setAuthor(response.stock_author.format(message.author.username), message.author.avatarURL)
  .setImage("https://cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg")
  .setColor(color.royal_blue)
  .setTimestamp();

  stockstatus(stocks.Stock_One.Price, stocks.Stock_One.Number, stocks.Stock_One.Name, stocks.Stock_One.Abbreviation, mystocks[message.author.id].Stocks_One_Amount);
  stockstatus(stocks.Stock_Two.Price, stocks.Stock_Two.Number, stocks.Stock_Two.Name, stocks.Stock_Two.Abbreviation, mystocks[message.author.id].Stocks_Two_Amount);
  stockstatus(stocks.Stock_Three.Price, stocks.Stock_Three.Number, stocks.Stock_Three.Name, stocks.Stock_Three.Abbreviation, mystocks[message.author.id].Stocks_Three_Amount);
  stockstatus(stocks.Stock_Four.Price, stocks.Stock_Four.Number, stocks.Stock_Four.Name, stocks.Stock_Four.Abbreviation, mystocks[message.author.id].Stocks_Four_Amount);
  stockstatus(stocks.Stock_Five.Price, stocks.Stock_Five.Number, stocks.Stock_Five.Name, stocks.Stock_Five.Abbreviation, mystocks[message.author.id].Stocks_Five_Amount);
  stockstatus(stocks.Stock_Six.Price, stocks.Stock_Six.Number, stocks.Stock_Six.Name, stocks.Stock_Six.Abbreviation, mystocks[message.author.id].Stocks_Six_Amount);
  stockstatus(stocks.Stock_Seven.Price, stocks.Stock_Seven.Number, stocks.Stock_Seven.Name, stocks.Stock_Seven.Abbreviation, mystocks[message.author.id].Stocks_Seven_Amount);
  stockstatus(stocks.Stock_Eight.Price, stocks.Stock_Eight.Number, stocks.Stock_Eight.Name, stocks.Stock_Eight.Abbreviation, mystocks[message.author.id].Stocks_Eight_Amount);

  message.channel.send(stockembed);
}

module.exports.help = {
name: "getstocks",
aliases: ["stocks"]
}
