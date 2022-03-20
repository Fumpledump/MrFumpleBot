const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
let stocks = require("../stocks.json");
let userstocks = require("../userstocks.json");
const color = require("../colors.json");
const fs = require("fs");
let fumplebucks = require("../fumplebucks.json");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "invest");

//$invest [Abbreviated Stock] [Amount]
if(!fumplebucks[message.author.id]){
  fumplebucks[message.author.id] = {
    fumplebucks: 0,
    stash: 0
  };
}
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

function invest(pamount, stockprice, stockamount, stockname, owendstocks, stocknum){
  console.log(pamount);
  console.log(stockprice);
  console.log(stockamount);
  console.log(stockname);
  console.log(owendstocks);
  console.log(stocknum);
  if(stockprice = 0) return message.channel.send(response.stock_is_dead);
  if(pamount * stockprice > fumplebucks[message.author.id].fumplebucks) return message.channel.send(response.stock_insufficent_fumplebucks.format(pamount, pamount * stockprice));

  fumplebucks[message.author.id].fumplebucks = fumplebucks[message.author.id].fumplebucks - (pamount * stockprice);
  console.log(fumplebucks[message.author.id].fumplebucks - (pamount * stockprice));
  fs.writeFile("./fumplebucks.json", JSON.stringify(fumplebucks), (err) => {
    if(err) cosole.log(err)
  });

  if (pamount > stockamount) return message.channel.send(response.stock_amount_toohigh);
  switch(stocknum){
    case 1:
      userstocks[message.author.id].stock1 = userstocks[message.author.id].stock1 + pamount;
      stocks.stock_1_amount = stocks.stock_1_amount - pamount;
      stockamount = stocks.stock_1_amount - pamount;
    break;
    default:
      return message.channel.send(response.unknown_stock);
  }
  fs.writeFile("./userstocks.json", JSON.stringify(userstocks), (err) => {
    if(err) cosole.log(err)
  });
  fs.writeFile("./stocks.json", JSON.stringify(stocks), (err) => {
    if(err) cosole.log(err)
  });

  let investEmbed = new Discord.RichEmbed()
  .setAuthor(response.invested_by.format(message.author.username), message.author.avatarURL)
  .addField(response.invest_made.format(message.author.username, pamount * stockprice, stockname, pamount), response.invest_results.format(owendstocks, stockname, fumplebucks[message.author.id].fumplebucks))
  .setColor(color.lime)
  .setFooter(response.invest_footer.format(stockname, stockamount))
  .setTimestamp();

  return message.channel.send(investEmbed);
}

let abbrstock = args[0].toUpperCase();
if(!abbrstock) return message.channel.send(response.missing_stock);

let amount = parseInt(args[1]);
if(amount == 0) return message.channel.send(response.stock_amount_toolow);
if(!amount) return message.channel.send(response.missing_stock_amount);

switch(abbrstock){
  case stocks.stock_1_abbr:
  invest(amount, stocks.stock_1_price, stocks.stock_1_amount, stocks.stock_1_name, userstocks.stock1, 1);
  break;
  default:
    return message.channel.send(response.unknown_stock);
}
}

module.exports.help = {
name: "invest",
aliases: []
}
