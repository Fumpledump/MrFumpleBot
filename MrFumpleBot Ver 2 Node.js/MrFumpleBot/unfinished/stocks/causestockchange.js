const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const fs = require("fs");
let stocks = require("../stocks.json");
let userstocks = require("../userstocks.json");
let file = JSON.parse(fs.readFileSync('../userstocks.json', 'utf8'));
const color = require("../colors.json");
const botconfig = require("../botconfig.json");


module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "causestockchange");

//$startstocktimer
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getChange(stockspecialevent, stockvalue){
  if(stockvalue == 0 || stockvalue >= 1000){
    return 0;
  }else if(stockvalue >= 1000){
    return 0;
  }else if(stockspecialevent == 1){
    return stockvalue / 1.5;
  }else if (stockspecialevent < 4){
    return stockvalue / 2;
  }else if (stockspecialevent < 8){
    return stockvalue / 3;
  }else{
    return getRandomArbitrary(1, 30);
  }
}

function getPosChange(stockposneg, stockChange)
{
  if(stockposneg == 2){
    return stockChange;
  }else if(stockposneg == 1){
    return 0;
  }
}
function getNegChange(stockposneg, stockChange)
{
  if(stockposneg == 1){
    return stockChange;
  }else if(stockposneg == 2){
    return 0;
  }
}
function getSpecialEvent(stockvalue)
{
  if(stockvalue == 0 || stockvalue >= 1000){
    return 400;
  }else{
    getRandomArbitrary(1, 400);
  }
}
function getEventTitle(stockspecialevent, stockposneg)
{
  if(stockposneg == 1)
  {
    if(stockspecailevent == 1){
      return "Fumplestock Crash:";
    }else if(stockspecailevent < 4){
      return "Fumplestock Depression:";
    }else if(stockspecailevent < 8){
      return "Fumplestock Recession:";
    }
  }else{
    if(stockspecailevent == 1){
      return "Fumplestock Skyrocket:";
    }else if(stockspecailevent < 4){
      return "Fumplestock Boom:";
    }else if(stockspecailevent < 8){
      return "Fumplestock Expansion:";
    }
  }
}
function getEventMessage(stockspecialevent,  stockposneg)
{
  if(stockposneg == 1)
  {
    if(stockspecailevent == 1){
      return "{0} just CRASHED!!!";
    }else if(stockspecailevent < 4){
      return "{0} went into a Depression!!";
    }else if(stockspecailevent < 8){
      return "{0} just had a Recession!";
    }
  }else{
    if(stockspecailevent == 1){
      return "{0} just SKYROCKETED!!!";
    }else if(stockspecailevent < 4){
      return "{0} just Boomed!!";
    }else if(stockspecailevent < 8){
      return "{0} just Expanded!";
    }
  }
}
function getStockMessage(stockposneg, stockvalue)
{
  if(stockvalue <= 0){
    return "💀 {0} 💀 {1} -{2}";
  }else if(stockvalue >= 1000){
    return "👑 {0} 👑 {1} +{2}";
  }else if(stockposneg == 1)
  {
    return "--- {0} 🔻 {1} -{2}";
  }else{
    return "🔺 {0} --- {1} +{2}";
  }
}
function getNewStockValue(stockposneg, stockvalue, stockchange, stockamount, stocknumber)
{
  if(stockposneg == 1){
    if(stockchange > stockvalue)
    {
      if(stockamount <= 25)
      {
        if(stocknumber == 1){
          for (x in file)
          {
          file[x].stock1 = parseInt(0);
          }
        }else if(stocknumber == 2){
          for (x in file)
          {
          file[x].stock2 = parseInt(0);
          }
        }else if(stocknumber == 3){
          for (x in file)
          {
          file[x].stock3 = parseInt(0);
          }
        }else if(stocknumber == 4){
          for (x in file)
          {
          file[x].stock4 = parseInt(0);
          }
        }else if(stocknumber == 5){
          for (x in file)
          {
          file[x].stock5 = parseInt(0);
          }
        }else if(stocknumber == 6){
          for (x in file)
          {
          file[x].stock6 = parseInt(0);
          }
        }else if(stocknumber == 7){
          for (x in file)
          {
          file[x].stock7 = parseInt(0);
          }
        }else if(stocknumber == 8){
          for (x in file)
          {
          file[x].stock8 = parseInt(0);
          }
        }else if(stocknumber == 9){
          for (x in file)
          {
          file[x].stock9 = parseInt(0);
          }
        }
          fs.writeFile("./userstocks.json", JSON.stringify(file), (err) => {
          if(err) cosole.log(err)
          });
          return 0;
      }else{
        if(stocknumber == 1){
          currentstockamount = stocks.stock_1_amount;
          stocks.stock_1_amount = currentstockamount / 2;
          for (x in file)
          {
            file[x].stock1 = file[x].stock1 / 2;
          }
        }else if(stocknumber == 2){
          currentstockamount = stocks.stock_2_amount;
          stocks.stock_2_amount = currentstockamount / 2;
          for (x in file)
          {
          file[x].stock2 = file[x].stock2 / 2;
          }
        }else if(stocknumber == 3){
          currentstockamount = stocks.stock_3_amount;
          stocks.stock_3_amount = currentstockamount / 2;
          for (x in file)
          {
          file[x].stock3 = file[x].stock3 / 2;
          }
        }else if(stocknumber == 4){
          currentstockamount = stocks.stock_4_amount;
          stocks.stock_4_amount = currentstockamount / 2;
          for (x in file)
          {
          file[x].stock4 = file[x].stock4 / 2;
          }
        }else if(stocknumber == 5){
          currentstockamount = stocks.stock_5_amount;
          stocks.stock_5_amount = currentstockamount / 2;
          for (x in file)
          {
          file[x].stock5 = file[x].stock5 / 2;
          }
        }else if(stocknumber == 6){
          currentstockamount = stocks.stock_6_amount;
          stocks.stock_6_amount = currentstockamount / 2;
          for (x in file)
          {
          file[x].stock6 = file[x].stock6 / 2;
          }
        }else if(stocknumber == 7){
          currentstockamount = stocks.stock_7_amount;
          stocks.stock_7_amount = currentstockamount / 2;
          for (x in file)
          {
          file[x].stock7 = file[x].stock7 / 2;
          }
        }else if(stocknumber == 8){
          currentstockamount = stocks.stock_8_amount;
          stocks.stock_8_amount = currentstockamount / 2;
          for (x in file)
          {
          file[x].stock8 = file[x].stock8 / 2;
          }
        }else if(stocknumber == 9){
          currentstockamount = stocks.stock_9_amount;
          stocks.stock_9_amount = currentstockamount / 2;
          for (x in file)
          {
          file[x].stock9 = file[x].stock9 / 2;
          }
        }
        fs.writeFile("./stocks.json", JSON.stringify(stocks), (err) => {
          if(err) cosole.log(err)
        });
        fs.writeFile("./userstocks.json", JSON.stringify(file), (err) => {
        if(err) cosole.log(err)
        });
        return 500;
      }
    }else{
          return stockvalue - stockchange;
    }
  }else{
    if(stockvalue + stockchange >= 1000){
      if(stockamount >= 1600){
        return stockvalue;
      }else{
        if(stocknumber == 1){
          currentstockamount = stocks.stock_1_amount;
          stocks.stock_1_amount = currentstockamount * 2;
          for (x in file)
          {
            file[x].stock1 = file[x].stock1 * 2;
          }
        }else if(stocknumber == 2){
          currentstockamount = stocks.stock_2_amount;
          stocks.stock_2_amount = currentstockamount * 2;
          for (x in file)
          {
          file[x].stock2 = file[x].stock2 * 2;
          }
        }else if(stocknumber == 3){
          currentstockamount = stocks.stock_3_amount;
          stocks.stock_3_amount = currentstockamount * 2;
          for (x in file)
          {
          file[x].stock3 = file[x].stock3 * 2;
          }
        }else if(stocknumber == 4){
          currentstockamount = stocks.stock_4_amount;
          stocks.stock_4_amount = currentstockamount * 2;
          for (x in file)
          {
          file[x].stock4 = file[x].stock4 * 2;
          }
        }else if(stocknumber == 5){
          currentstockamount = stocks.stock_5_amount;
          stocks.stock_5_amount = currentstockamount * 2;
          for (x in file)
          {
          file[x].stock5 = file[x].stock5 * 2;
          }
        }else if(stocknumber == 6){
          currentstockamount = stocks.stock_6_amount;
          stocks.stock_6_amount = currentstockamount * 2;
          for (x in file)
          {
          file[x].stock6 = file[x].stock6 * 2;
          }
        }else if(stocknumber == 7){
          currentstockamount = stocks.stock_7_amount;
          stocks.stock_7_amount = currentstockamount * 2;
          for (x in file)
          {
          file[x].stock7 = file[x].stock7 * 2;
          }
        }else if(stocknumber == 8){
          currentstockamount = stocks.stock_8_amount;
          stocks.stock_8_amount = currentstockamount * 2;
          for (x in file)
          {
          file[x].stock8 = file[x].stock8 * 2;
          }
        }else if(stocknumber == 9){
          currentstockamount = stocks.stock_9_amount;
          stocks.stock_9_amount = currentstockamount * 2;
          for (x in file)
          {
          file[x].stock9 = file[x].stock9 * 2;
          }
        }
        fs.writeFile("./stocks.json", JSON.stringify(stocks), (err) => {
          if(err) cosole.log(err)
        });
        fs.writeFile("./userstocks.json", JSON.stringify(file), (err) => {
        if(err) cosole.log(err)
        });
        return 500;
      }
    }else{
          return stockvalue + stockchange;
    }
  }
}


function stockChange() {
  console.log("•Stock Market Change Caused");

  if(!message.member.hasPermission("MANAGE_ROLES")) return message.send(response.missing_permissions);
  let stockchannel = message.guild.channels.find(c => c.name === botconfig.stock_channel);
  let logchannel = message.guild.channels.find(c => c.name === botconfig.log_channel_name);
  if(!stockchannel) return message.channel.send(response.missing_stock_channel.format(botconfig.stock_channel));
  if(!logchannel) return message.channel.send(response.missing_logs);

  let firststock1amount = stocks.stock_1_amount;
  let firststock2amount = stocks.stock_2_amount;
  let firststock3amount = stocks.stock_3_amount;
  let firststock4amount = stocks.stock_4_amount;
  let firststock5amount = stocks.stock_5_amount;
  let firststock6amount = stocks.stock_6_amount;
  let firststock7amount = stocks.stock_7_amount;
  let firststock8amount = stocks.stock_8_amount;
  let firststock9amount = stocks.stock_9_amount;

  let stock1specialevent = Math.round(getSpecialEvent(stocks.stock_1_value));
  let stock2specialevent = Math.round(getSpecialEvent(stocks.stock_2_value));
  let stock3specialevent = Math.round(getSpecialEvent(stocks.stock_3_value));
  let stock4specialevent = Math.round(getSpecialEvent(stocks.stock_4_value));
  let stock5specialevent = Math.round(getSpecialEvent(stocks.stock_5_value));
  let stock6specialevent = Math.round(getSpecialEvent(stocks.stock_6_value));
  let stock7specialevent = Math.round(getSpecialEvent(stocks.stock_7_value));
  let stock8specialevent = Math.round(getSpecialEvent(stocks.stock_8_value));
  let stock9specialevent = Math.round(getSpecialEvent(stocks.stock_9_value));

  let stock1posneg = Math.round(getRandomArbitrary(1, 2));
  let stock2posneg = Math.round(getRandomArbitrary(1, 2));
  let stock3posneg = Math.round(getRandomArbitrary(1, 2));
  let stock4posneg = Math.round(getRandomArbitrary(1, 2));
  let stock5posneg = Math.round(getRandomArbitrary(1, 2));
  let stock6posneg = Math.round(getRandomArbitrary(1, 2));
  let stock7posneg = Math.round(getRandomArbitrary(1, 2));
  let stock8posneg = Math.round(getRandomArbitrary(1, 2));
  let stock9posneg = Math.round(getRandomArbitrary(1, 2));

  let stock1Change = Math.round(getChange(stock1specialevent, stocks.stock_1_value));
  let stock2Change = Math.round(getChange(stock2specialevent, stocks.stock_2_value));
  let stock3Change = Math.round(getChange(stock3specialevent, stocks.stock_3_value));
  let stock4Change = Math.round(getChange(stock4specialevent, stocks.stock_4_value));
  let stock5Change = Math.round(getChange(stock5specialevent, stocks.stock_5_value));
  let stock6Change = Math.round(getChange(stock6specialevent, stocks.stock_6_value));
  let stock7Change = Math.round(getChange(stock7specialevent, stocks.stock_7_value));
  let stock8Change = Math.round(getChange(stock8specialevent, stocks.stock_8_value));
  let stock9Change = Math.round(getChange(stock9specialevent, stocks.stock_9_value));

  let newstock1Value = Math.round(getNewStockValue(stock1posneg, stocks.stock_1_value, stock1Change, stocks.stock_1_amount, 1));
  let newstock2Value = Math.round(getNewStockValue(stock2posneg, stocks.stock_2_value, stock2Change, stocks.stock_2_amount, 2));
  let newstock3Value = Math.round(getNewStockValue(stock3posneg, stocks.stock_3_value, stock3Change, stocks.stock_3_amount, 3));
  let newstock4Value = Math.round(getNewStockValue(stock4posneg, stocks.stock_4_value, stock4Change, stocks.stock_4_amount, 4));
  let newstock5Value = Math.round(getNewStockValue(stock5posneg, stocks.stock_5_value, stock5Change, stocks.stock_5_amount, 5));
  let newstock6Value = Math.round(getNewStockValue(stock6posneg, stocks.stock_6_value, stock6Change, stocks.stock_6_amount, 6));
  let newstock7Value = Math.round(getNewStockValue(stock7posneg, stocks.stock_7_value, stock7Change, stocks.stock_7_amount, 7));
  let newstock8Value = Math.round(getNewStockValue(stock8posneg, stocks.stock_8_value, stock8Change, stocks.stock_8_amount, 8));
  let newstock9Value = Math.round(getNewStockValue(stock9posneg, stocks.stock_9_value, stock9Change, stocks.stock_9_amount, 9));

  let stock1PosChange = getPosChange(stock1posneg, stock1Change);
  let stock1NegChange = getNegChange(stock1posneg, stock1Change);
  let stock2PosChange = getPosChange(stock2posneg, stock2Change);
  let stock2NegChange = getNegChange(stock2posneg, stock2Change);
  let stock3PosChange = getPosChange(stock3posneg, stock3Change);
  let stock3NegChange = getNegChange(stock3posneg, stock3Change);
  let stock4PosChange = getPosChange(stock4posneg, stock4Change);
  let stock4NegChange = getNegChange(stock4posneg, stock4Change);
  let stock5PosChange = getPosChange(stock5posneg, stock5Change);
  let stock5NegChange = getNegChange(stock5posneg, stock5Change);
  let stock6PosChange = getPosChange(stock6posneg, stock6Change);
  let stock6NegChange = getNegChange(stock6posneg, stock6Change);
  let stock7PosChange = getPosChange(stock7posneg, stock7Change);
  let stock7NegChange = getNegChange(stock7posneg, stock7Change);
  let stock8PosChange = getPosChange(stock8posneg, stock8Change);
  let stock8NegChange = getNegChange(stock8posneg, stock8Change);
  let stock9PosChange = getPosChange(stock9posneg, stock9Change);
  let stock9NegChange = getNegChange(stock9posneg, stock9Change);

  let stockTitle;
  let stockcolor;
  let stockImage;
  let stockThumbnail;
  if(stocks.stock_1_value + stocks.stock_2_value + stocks.stock_3_value + stocks.stock_4_value + stocks.stock_5_value + stocks.stock_6_value + stocks.stock_7_value + stocks.stock_8_value + stocks.stock_9_value <= 0){
    return;
  }else if(stock1specialevent < 8 || stock2specialevent < 8 || stock3specialevent < 8 || stock4specialevent < 8 || stock5specialevent < 8 || stock6specialevent < 8 || stock7specialevent < 8 || stock8specialevent < 8 || stock9specialevent < 8){
    stockcolor = color.golden_rod;
    stockImage = "https://cdn.discordapp.com/attachments/422079130260209680/491438753273872384/Breaking_News_Fumplestocks.jpg";
    stockThumbnail = "https://cdn.discordapp.com/attachments/483302550666346498/525887018690150400/6f703ca9-c89d-4e74-947c-64426059f789.png";
    stockTitle = response.stock_breakingnews;
  }else if(stock1PosChange + stock2PosChange + stock3PosChange + stock4PosChange + stock5PosChange + stock6PosChange + stock7PosChange + stock8PosChange + stock9PosChange <= 0){
    stockcolor = color.crimson;
    stockImage = "https://images-ext-2.discordapp.net/external/glWByWrEnYqkvNimV5P61uHfq23y_PokOTA7YiYDuus/https/cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg";
    stockThumbnail = "https://images-ext-2.discordapp.net/external/zmLrPL6IMilA_53iVQ3UwMPEGDHuX2auTTecspNyu9g/https/cdn.discordapp.com/attachments/483302550666346498/492027771657125899/ThunderFumpledump.png";
    stockTitle = response.stock_horribleday;
  }else if(stock1NegChange + stock2NegChange + stock3NegChange + stock4NegChange + stock5NegChange + stock6NegChange + stock7NegChange + stock8NegChange + stock9NegChange <= 0){
    stockcolor = color.green;
    stockImage = "https://images-ext-2.discordapp.net/external/glWByWrEnYqkvNimV5P61uHfq23y_PokOTA7YiYDuus/https/cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg";
    stockThumbnail = "https://images-ext-1.discordapp.net/external/E-Mb7DcWQwY1mYBAVJPCiE_nxeL0l4uoIwBWGh4lZg4/https/cdn.discordapp.com/attachments/483302550666346498/492027770256228362/SunFumple.png";
    stockTitle = response.stock_greatday;
  }else if(stock1PosChange + stock2PosChange + stock3PosChange + stock4PosChange + stock5PosChange + stock6PosChange + stock7PosChange + stock8PosChange + stock9PosChange > stock1NegChange + stock2NegChange + stock3NegChange + stock4NegChange + stock5NegChange + stock6NegChange + stock7NegChange + stock8NegChange + stock9NegChange){
    stockcolor = color.lime;
    stockImage = "https://images-ext-2.discordapp.net/external/glWByWrEnYqkvNimV5P61uHfq23y_PokOTA7YiYDuus/https/cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg";
    stockThumbnail = "https://images-ext-1.discordapp.net/external/vkqGFRX6GGfQ4cX5UF4vTJ_SEG0afaHQiYamDg0dt08/https/cdn.discordapp.com/attachments/483302550666346498/492027767932715028/PartlyCloudyFumple.png";
    stockTitle = response.stock_goodday;
  }
  else if(stock1PosChange + stock2PosChange + stock3PosChange + stock4PosChange + stock5PosChange + stock6PosChange + stock7PosChange + stock8PosChange + stock9PosChange < stock1NegChange + stock2NegChange + stock3NegChange + stock4NegChange + stock5NegChange + stock6NegChange + stock7NegChange + stock8NegChange + stock9NegChange){
    stockcolor = color.red;
    stockImage = "https://images-ext-2.discordapp.net/external/glWByWrEnYqkvNimV5P61uHfq23y_PokOTA7YiYDuus/https/cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg";
    stockThumbnail = "https://images-ext-1.discordapp.net/external/RGB6GiHYyw5wCjTBOyeZG-aj1MFiWaHNmEyV_IKXkUU/https/cdn.discordapp.com/attachments/483302550666346498/492027769396396032/RainFumpledump.png";
    stockTitle = response.stock_badday;
  }
  else{
    let stockcolor = color.royal_blue;
    let stockImage = "https://images-ext-2.discordapp.net/external/glWByWrEnYqkvNimV5P61uHfq23y_PokOTA7YiYDuus/https/cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg";
    let stockThumbnail = "https://media.discordapp.net/attachments/483302550666346498/492027766259187712/CloudyFumple.png";
    let stockTitle = response.stock_borringday;
  }

  stocks.stock_1_value = newstock1Value;
  stocks.stock_2_value = newstock2Value;
  stocks.stock_3_value = newstock3Value;
  stocks.stock_4_value = newstock4Value;
  stocks.stock_5_value = newstock5Value;
  stocks.stock_6_value = newstock6Value;
  stocks.stock_7_value = newstock7Value;
  stocks.stock_8_value = newstock8Value;
  stocks.stock_9_value = newstock9Value;

  fs.writeFile("./stocks.json", JSON.stringify(stocks), (err) => {
    if(err) cosole.log(err)
  });

  let stockChangeEmbed = new Discord.RichEmbed()
  .setAuthor(response.stock_change_author.format(message.author.username), message.author.avatarURL)
  .setTitle(stockTitle)
  .addField(stocks.stock_1_name, getStockMessage(stock1posneg, stocks.stock_1_value).format(stocks.stock_1_abbr, stocks.stock_1_value, stock1Change))
  if(stock1specialevent < 8)
  {
    stockChangeEmbed.addField(getSpecialEvent(stock1specialevent, stock1posneg), getEventMessage(stock1specialevent, stock1posneg).format(stocks.stock_1_name))
  }
  if(firststock1amount != stocks.stock_1_amount){
    if(firststock1amount > stocks.stock_1_amount){
      stockChangeEmbed.addField(response.stock_split_title, response.stock_split_message.format(stocks.stock_1_name, stocks.stock_1_amount))
    }else{
      stockChangeEmbed.addField(response.stock_double_title, response.stock_doubled_message.format(stocks.stock_1_name, stocks.stock_1_amount))
    }
  }
  stockChangeEmbed.addField(stocks.stock_2_name, getStockMessage(stock2posneg, stocks.stock_2_value).format(stocks.stock_2_abbr, stocks.stock_2_value, stock2Change))
  if(stock2specialevent < 8)
  {
    stockChangeEmbed.addField(getSpecialEvent(stock2specialevent, stock2posneg), getEventMessage(stock2specialevent, stock2posneg).format(stocks.stock_2_name))
  }
  if(firststock2amount != stocks.stock_2_amount){
    if(firststock2amount > stocks.stock_2_amount){
      stockChangeEmbed.addField(response.stock_split_title, response.stock_split_message.format(stocks.stock_2_name, stocks.stock_2_amount))
    }else{
      stockChangeEmbed.addField(response.stock_double_title, response.stock_doubled_message.format(stocks.stock_2_name, stocks.stock_2_amount))
    }
  }
  stockChangeEmbed.addField(stocks.stock_3_name, getStockMessage(stock3posneg, stocks.stock_3_value).format(stocks.stock_3_abbr, stocks.stock_3_value, stock3Change))
  if(stock3specialevent < 8)
  {
        stockChangeEmbed.addField(getSpecialEvent(stock3specialevent, stock3posneg), getEventMessage(stock3specialevent, stock3posneg).format(stocks.stock_3_name))
  }
  if(firststock3amount != stocks.stock_3_amount){
    if(firststock3amount > stocks.stock_3_amount){
      stockChangeEmbed.addField(response.stock_split_title, response.stock_split_message.format(stocks.stock_3_name, stocks.stock_3_amount))
    }else{
      stockChangeEmbed.addField(response.stock_double_title, response.stock_doubled_message.format(stocks.stock_3_name, stocks.stock_3_amount))
    }
  }
  stockChangeEmbed.addField(stocks.stock_4_name, getStockMessage(stock4posneg, stocks.stock_4_value).format(stocks.stock_4_abbr, stocks.stock_4_value, stock4Change))
  if(stock4specialevent < 8)
  {
        stockChangeEmbed.addField(getSpecialEvent(stock4specialevent, stock4posneg), getEventMessage(stock4specialevent, stock4posneg).format(stocks.stock_4_name))
  }
  if(firststock4amount != stocks.stock_4_amount){
    if(firststock4amount > stocks.stock_4_amount){
      stockChangeEmbed.addField(response.stock_split_title, response.stock_split_message.format(stocks.stock_4_name, stocks.stock_4_amount))
    }else{
      stockChangeEmbed.addField(response.stock_double_title, response.stock_doubled_message.format(stocks.stock_4_name, stocks.stock_4_amount))
    }
  }
  stockChangeEmbed.addField(stocks.stock_5_name, getStockMessage(stock5posneg, stocks.stock_5_value).format(stocks.stock_5_abbr, stocks.stock_5_value, stock5Change))
  if(stock5specialevent < 8)
  {
        stockChangeEmbed.addField(getSpecialEvent(stock5specialevent, stock5posneg), getEventMessage(stock5specialevent, stock5posneg).format(stocks.stock_5_name))
  }
  if(firststock5amount != stocks.stock_5_amount){
    if(firststock5amount > stocks.stock_5_amount){
      stockChangeEmbed.addField(response.stock_split_title, response.stock_split_message.format(stocks.stock_5_name, stocks.stock_5_amount))
    }else{
      stockChangeEmbed.addField(response.stock_double_title, response.stock_doubled_message.format(stocks.stock_5_name, stocks.stock_5_amount))
    }
  }
  stockChangeEmbed.addField(stocks.stock_6_name, getStockMessage(stock6posneg, stocks.stock_6_value).format(stocks.stock_6_abbr, stocks.stock_6_value, stock6Change))
  if(stock6specialevent < 8)
  {
        stockChangeEmbed.addField(getSpecialEvent(stock6specialevent, stock6posneg), getEventMessage(stock6specialevent, stock6posneg).format(stocks.stock_6_name))
  }
  if(firststock6amount != stocks.stock_6_amount){
    if(firststock6amount > stocks.stock_6_amount){
      stockChangeEmbed.addField(response.stock_split_title, response.stock_split_message.format(stocks.stock_6_name, stocks.stock_6_amount))
    }else{
      stockChangeEmbed.addField(response.stock_double_title, response.stock_doubled_message.format(stocks.stock_6_name, stocks.stock_6_amount))
    }
  }
  stockChangeEmbed.addField(stocks.stock_7_name, getStockMessage(stock7posneg, stocks.stock_7_value).format(stocks.stock_7_abbr, stocks.stock_7_value, stock7Change))
  if(stock7specialevent < 8)
  {
        stockChangeEmbed.addField(getSpecialEvent(stock7specialevent, stock7posneg), getEventMessage(stock7specialevent, stock7posneg).format(stocks.stock_7_name))
  }
  if(firststock7amount != stocks.stock_7_amount){
    if(firststock7amount > stocks.stock_7_amount){
      stockChangeEmbed.addField(response.stock_split_title, response.stock_split_message.format(stocks.stock_7_name, stocks.stock_7_amount))
    }else{
      stockChangeEmbed.addField(response.stock_double_title, response.stock_doubled_message.format(stocks.stock_7_name, stocks.stock_7_amount))
    }
  }
  stockChangeEmbed.addField(stocks.stock_8_name, getStockMessage(stock8posneg, stocks.stock_8_value).format(stocks.stock_8_abbr, stocks.stock_8_value, stock8Change))
  if(stock8specialevent < 8)
  {
        stockChangeEmbed.addField(getSpecialEvent(stock8specialevent, stock8posneg), getEventMessage(stock8specialevent, stock8posneg).format(stocks.stock_8_name))
  }
  if(firststock8amount != stocks.stock_8_amount){
    if(firststock8amount > stocks.stock_8_amount){
      stockChangeEmbed.addField(response.stock_split_title, response.stock_split_message.format(stocks.stock_8_name, stocks.stock_8_amount))
    }else{
      stockChangeEmbed.addField(response.stock_double_title, response.stock_doubled_message.format(stocks.stock_8_name, stocks.stock_8_amount))
    }
  }
  stockChangeEmbed.addField(stocks.stock_9_name, getStockMessage(stock9posneg, stocks.stock_9_value).format(stocks.stock_9_abbr, stocks.stock_9_value, stock9Change))
  if(stock9specialevent < 8)
  {
        stockChangeEmbed.addField(getSpecialEvent(stock9specialevent, stock9posneg), getEventMessage(stock9specialevent, stock9posneg).format(stocks.stock_9_name))
  }
  if(firststock9amount != stocks.stock_9_amount){
    if(firststock9amount > stocks.stock_9_amount){
      stockChangeEmbed.addField(response.stock_split_title, response.stock_split_message.format(stocks.stock_9_name, stocks.stock_9_amount))
    }else{
      stockChangeEmbed.addField(response.stock_double_title, response.stock_doubled_message.format(stocks.stock_9_name, stocks.stock_9_amount))
    }
  }
  stockChangeEmbed.setImage(stockImage)
  stockChangeEmbed.setThumbnail(stockThumbnail)
  stockChangeEmbed.setFooter(response.stock_help)
  stockChangeEmbed.setColor(stockcolor)
  stockChangeEmbed.setTimestamp();

  stockchannel.send(stockChangeEmbed);
}

if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(response.missing_permissions)
stockChange();
message.channel.send(response.causestockchange_message.format(message.author.username));
}

module.exports.help = {
name: "causestockchange",
aliases: []
}
