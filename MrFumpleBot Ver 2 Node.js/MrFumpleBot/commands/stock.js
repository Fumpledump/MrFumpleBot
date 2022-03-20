const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
let stocks = require("../stocks.json");
const color = require("../colors.json");
let save = require("../utils/save.js");
const fs = require("fs");
let fumplebucks = require("../fumplebucks.json");
const botconfig = require("../botconfig.json");
let mystocks = JSON.parse(fs.readFileSync('./mystocks.json', 'utf8'));
let users = require("../users.json");

module.exports.run = async (bot, message, args) => {

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}

//Logging Command
logcommand(message, "stock");

//$stock
save.NewUser(message.author.id);
if(!mystocks[message.author.id]){
  mystocks[message.author.id] = {
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
}

if(!args[0]) return message.channel.send(response.missing_input);
let sInput = args[0].toLowerCase();

let stockChannel = bot.guilds.get("411715542467215362").channels.get("489963488949567498")

if(args[1])
{
  let sInput2 = args[1].toLowerCase();
}

save.NewUser(message.author.id)

var stockinfo = function()
{
    if(!args[1]) return message.channel.send(response.missing_stock)
    let stock = args[1].toLowerCase();

    let stockinfoembed = new Discord.RichEmbed()
    .setAuthor(response.stock_info_author.format(message.author.username), message.author.avatarURL)
    .setTimestamp();

    switch(stock){
      case "none":
        message.channel.send("`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`");
        break;
      case "1":
      case stocks.Stock_One.Abbreviation.toLowerCase():
        stockstatus(stockinfoembed, stocks.Stock_One.Price, stocks.Stock_One.Number, stocks.Stock_One.Name, stocks.Stock_One.Abbreviation, mystocks[message.author.id].Stocks_One_Amount, stocks.Stock_One.Image, stocks.Stock_One.Info);
        message.channel.send(stockinfoembed);
        break;
      case "2":
      case stocks.Stock_Two.Abbreviation.toLowerCase():
        stockstatus(stockinfoembed, stocks.Stock_Two.Price, stocks.Stock_Two.Number, stocks.Stock_Two.Name, stocks.Stock_Two.Abbreviation, mystocks[message.author.id].Stocks_Two_Amount, stocks.Stock_Two.Image, stocks.Stock_Two.Info);
        message.channel.send(stockinfoembed);
        break;
      case "3":
      case stocks.Stock_Three.Abbreviation.toLowerCase():
        stockstatus(stockinfoembed, stocks.Stock_Three.Price, stocks.Stock_Three.Number, stocks.Stock_Three.Name, stocks.Stock_Three.Abbreviation, mystocks[message.author.id].Stocks_Three_Amount, stocks.Stock_Three.Image, stocks.Stock_Three.Info);
        message.channel.send(stockinfoembed);
        break;
      case "4":
      case stocks.Stock_Four.Abbreviation.toLowerCase():
        stockstatus(stockinfoembed, stocks.Stock_Four.Price, stocks.Stock_Four.Number, stocks.Stock_Four.Name, stocks.Stock_Four.Abbreviation, mystocks[message.author.id].Stocks_Four_Amount, stocks.Stock_Four.Image, stocks.Stock_Four.Info);
        message.channel.send(stockinfoembed);
        break;
      case "5":
      case stocks.Stock_Five.Abbreviation.toLowerCase():
        stockstatus(stockinfoembed, stocks.Stock_Five.Price, stocks.Stock_Five.Number, stocks.Stock_Five.Name, stocks.Stock_Five.Abbreviation, mystocks[message.author.id].Stocks_Five_Amount, stocks.Stock_Five.Image, stocks.Stock_Five.Info);
        message.channel.send(stockinfoembed);
        break;
      case "6":
      case stocks.Stock_Six.Abbreviation.toLowerCase():
        stockstatus(stockinfoembed, stocks.Stock_Six.Price, stocks.Stock_Six.Number, stocks.Stock_Six.Name, stocks.Stock_Six.Abbreviation, mystocks[message.author.id].Stocks_Six_Amount, stocks.Stock_Six.Image, stocks.Stock_Six.Info);
        message.channel.send(stockinfoembed);
        break;
      case "7":
      case stocks.Stock_Seven.Abbreviation.toLowerCase():
        stockstatus(stockinfoembed, stocks.Stock_Seven.Price, stocks.Stock_Seven.Number, stocks.Stock_Seven.Name, stocks.Stock_Seven.Abbreviation, mystocks[message.author.id].Stocks_Seven_Amount, stocks.Stock_Seven.Image, stocks.Stock_Seven.Info);
        message.channel.send(stockinfoembed);
        break;
      case "8":
      case stocks.Stock_Eight.Abbreviation.toLowerCase():
        stockstatus(stockinfoembed, stocks.Stock_Eight.Price, stocks.Stock_Eight.Number, stocks.Stock_Eight.Name, stocks.Stock_Eight.Abbreviation, mystocks[message.author.id].Stocks_Eight_Amount, stocks.Stock_Eight.Image, stocks.Stock_Eight.Info);
        message.channel.send(stockinfoembed);
        break;
      default:
        message.channel.send(response.unknown_stock);
    }
}
var stockstatus = function(stockembed, stock_price, stock_num, stock_name, stock_abbreviation, stock_owned, stockimage, stockbio)
{
  if(stock_price <= 0){
    stockembed.setThumbnail("https://cdn.discordapp.com/attachments/516138714745929784/562042312386019367/iu.png");
    stockembed.setColor(color.lime)
    stockembed.addField(response.stock_num_title.format(stock_num), response.stock_purchasable.format(stock_num));
  }else{
    if(stockimage != "None"){
          stockembed.setThumbnail(stockimage);
    }
    stockembed.setColor(color.royal_blue)
    stockembed.addField("📈`{0}`📉".format(stock_name), response.stock_info.format(stock_name, stock_abbreviation, stock_price, stock_owned));
    if(stockbio != "None"){
      stockembed.addField("Stock Description", stockbio)
    }else{
      stockembed.addField("Stock Description", "The owner of this stock has not added a description for the stock.")
    }
  }
}
var stockbuy = function()
{
  if(!args[1]) return message.channel.send(response.missing_stock)
  let stock = args[1].toLowerCase();

  if(!args[2]) return message.channel.send(response.missing_selectedpayment)
  let payment = args[2].toLowerCase();

  switch(payment){
    case "dumplings":
    case "dumpling":
    case "rewards":
    case "d":
      payment = "dumplings";
      break;
    case "money":
    case "fumplebuck":
    case "fumplebucks":
    case "f":
      payment = "fumplebucks";
      break;
    default:
      return message.channel.send("`You can't pay in that!`");
  }

  let newstockabbreviation = args[3]
  let newstockname = args.slice(4).join(" ");
  let boughtembed = new Discord.RichEmbed()

  switch(stock){
    case "1":
      if(!args[3]) return message.channel.send(response.missing_stock)

      if(newstockabbreviation == "None") return message.channel.send("`You can not put that as the stock abbreviation!`")
      if(newstockabbreviation == "none") return message.channel.send("`You can not put that as the stock abbreviation!`")
      if(newstockabbreviation == "NONE") return message.channel.send("`You can not put that as the stock abbreviation!`")


      if(!args[4]) return message.channel.send(response.missing_selectedpayment)

      if(stocks.Stock_One.Price != 0){
        return message.channe.send("You can not buy this stock!");
      }else if(payment == "dumplings" && fumplebucks[message.author.id].dumplings != 0){
        fumplebucks[message.author.id].dumplings = fumplebucks[message.author.id].dumplings - 1;
      }else if(fumplebucks[message.author.id].fumplebucks >= 1000){
        fumplebucks[message.author.id].fumplebucks = fumplebucks[message.author.id].fumplebucks - 1000;
      }else{
        return message.channel.send("You do not have enough to buy that stock!");
      }

      if(mystocks[message.author.id].Owned_Stocks.Stock_One == "None"){
        mystocks[message.author.id].Owned_Stocks.Stock_One = newstockname;
      }else if(mystocks[message.author.id].Owned_Stocks.Stock_Two == "None"){
        mystocks[message.author.id].Owned_Stocks.Stock_Two = newstockname;
      }else{
        return message.channel.send("You already own the maximum number of stocks!")
      }

      stocks.Stock_One.Abbreviation = newstockabbreviation;
      stocks.Stock_One.Name = newstockname;
      stocks.Stock_One.Price = 1000;
      stocks.Stock_One.Owner_Name = message.author.username;
      stocks.Stock_One.Owner_Id = message.author.id;

      boughtembed.setThumbnail("https://cdn.discordapp.com/attachments/422079130260209680/491438753273872384/Breaking_News_Fumplestocks.jpg")
      boughtembed.setColor(color.lime)
      boughtembed.setTimestamp();

      if(payment == "dumplings"){
        boughtembed.setAuthor(response.stock_buy_author.format(message.author.username), message.author.avatarURL)
        boughtembed.addField(response.stock_buy_title_dumplings.format(message.author.username, stock), response.stock_buy_message_dumplings.format(stock, newstockname, newstockabbreviation, message.author.username, fumplebucks[message.author.id].dumplings))
      }else{
        boughtembed.setAuthor(response.stock_buy_author.format(message.author.username), message.author.avatarURL)
        boughtembed.addField(response.stock_buy_title_fumplebucks.format(message.author.username, stock), response.stock_buy_message_fumplebucks.format(stock, newstockname, newstockabbreviation, message.author.username, fumplebucks[message.author.id].fumplebucks))
      }


      fs.writeFile("./stocks.json", JSON.stringify(stocks), (err) => {
        if(err) console.log(err)
      });
      fs.writeFile("mystocks", JSON.stringify(mystocks), (err) => {
        if(err) console.log(err)
      });



      let purchaseEmbed1 = new Discord.RichEmbed()
      .setAuthor(response.stock_purchase_author.format(message.author.username), message.author.avatarURL)
      .addField(response.stock_purchase_title.format(stocks.Stock_One.Name, stocks.Stock_One.Abbreviation), response.stock_purchase_message.format(stocks.Stock_One.Name, stocks.Stock_One.Abbreviation, message.author.username, stocks.Stock_One.Number))
      .setColor(color.lime)
      .setFooter(response.stock_purchase_footer.format(message.author.id))
      .setTimestamp();

      stockChannel.send(purchaseEmbed1);

      save.SaveAll();
      message.channel.send(boughtembed)
      break;
      case "2":

        if(!args[3]) return message.channel.send(response.missing_stock)

        if(newstockabbreviation == "None") return message.channel.send("`You can not put that as the stock abbreviation!`")
if(newstockabbreviation == "none") return message.channel.send("`You can not put that as the stock abbreviation!`")
if(newstockabbreviation == "NONE") return message.channel.send("`You can not put that as the stock abbreviation!`")

        if(!args[4]) return message.channel.send(response.missing_selectedpayment)

        if(stocks.Stock_Two.Price != 0){
          return message.channe.send("You can not buy this stock!");
        }else if(payment == "dumplings" && fumplebucks[message.author.id].dumplings != 0){
          fumplebucks[message.author.id].dumplings = fumplebucks[message.author.id].dumplings - 1;
        }else if(fumplebucks[message.author.id].fumplebucks >= 1000){
          fumplebucks[message.author.id].fumplebucks = fumplebucks[message.author.id].fumplebucks - 1000;
        }else{
          return message.channel.send("You do not have enough to buy that stock!");
        }

        if(mystocks[message.author.id].Owned_Stocks.Stock_One == "None"){
          mystocks[message.author.id].Owned_Stocks.Stock_One = newstockname;
        }else if(mystocks[message.author.id].Owned_Stocks.Stock_Two == "None"){
          mystocks[message.author.id].Owned_Stocks.Stock_Two = newstockname;
        }else{
          return message.channel.send("You already own the maximum number of stocks!")
        }

        stocks.Stock_Two.Abbreviation = newstockabbreviation;
        stocks.Stock_Two.Name = newstockname;
        stocks.Stock_Two.Price = 1000;
        stocks.Stock_Two.Owner_Name = message.author.username;
        stocks.Stock_Two.Owner_Id = message.author.id;

        boughtembed.setThumbnail("https://cdn.discordapp.com/attachments/422079130260209680/491438753273872384/Breaking_News_Fumplestocks.jpg")
        boughtembed.setColor(color.lime)
        boughtembed.setTimestamp();

        if(payment == "dumplings"){
          boughtembed.setAuthor(response.stock_buy_author.format(message.author.username), message.author.avatarURL)
          boughtembed.addField(response.stock_buy_title_dumplings.format(message.author.username, stock), response.stock_buy_message_dumplings.format(stock, newstockname, newstockabbreviation, message.author.username, fumplebucks[message.author.id].dumplings))
        }else{
          boughtembed.setAuthor(response.stock_buy_author.format(message.author.username), message.author.avatarURL)
          boughtembed.addField(response.stock_buy_title_fumplebucks.format(message.author.username, stock), response.stock_buy_message_fumplebucks.format(stock, newstockname, newstockabbreviation, message.author.username, fumplebucks[message.author.id].fumplebucks))
        }

        fs.writeFile("./stocks.json", JSON.stringify(stocks), (err) => {
          if(err) console.log(err)
        });
        fs.writeFile("mystocks", JSON.stringify(mystocks), (err) => {
          if(err) console.log(err)
        });



        let purchaseEmbed2 = new Discord.RichEmbed()
        .setAuthor(response.stock_purchase_author.format(message.author.username), message.author.avatarURL)
        .addField(response.stock_purchase_title.format(stocks.Stock_Two.Name, stocks.Stock_Two.Abbreviation), response.stock_purchase_message.format(stocks.Stock_Two.Name, stocks.Stock_Two.Abbreviation, message.author.username, stocks.Stock_Two.Number))
        .setColor(color.lime)
        .setFooter(response.stock_purchase_footer.format(message.author.id))
        .setTimestamp();

        stockChannel.send(purchaseEmbed2);

        save.SaveAll();
        message.channel.send(boughtembed)
        break;
        case "3":

          if(!args[3]) return message.channel.send(response.missing_stock)

          if(newstockabbreviation == "None") return message.channel.send("`You can not put that as the stock abbreviation!`")
if(newstockabbreviation == "none") return message.channel.send("`You can not put that as the stock abbreviation!`")
if(newstockabbreviation == "NONE") return message.channel.send("`You can not put that as the stock abbreviation!`")

          if(!args[4]) return message.channel.send(response.missing_selectedpayment)

          if(stocks.Stock_Three.Price != 0){
            return message.channe.send("You can not buy this stock!");
          }else if(payment == "dumplings" && fumplebucks[message.author.id].dumplings != 0){
            fumplebucks[message.author.id].dumplings = fumplebucks[message.author.id].dumplings - 1;
          }else if(fumplebucks[message.author.id].fumplebucks >= 1000){
            fumplebucks[message.author.id].fumplebucks = fumplebucks[message.author.id].fumplebucks - 1000;
          }else{
            return message.channel.send("You do not have enough to buy that stock!");
          }

          if(mystocks[message.author.id].Owned_Stocks.Stock_One == "None"){
            mystocks[message.author.id].Owned_Stocks.Stock_One = newstockname;
          }else if(mystocks[message.author.id].Owned_Stocks.Stock_Two == "None"){
            mystocks[message.author.id].Owned_Stocks.Stock_Two = newstockname;
          }else{
            return message.channel.send("You already own the maximum number of stocks!")
          }

          stocks.Stock_Three.Abbreviation = newstockabbreviation;
          stocks.Stock_Three.Name = newstockname;
          stocks.Stock_Three.Price = 1000;
          stocks.Stock_Three.Owner_Name = message.author.username;
          stocks.Stock_Three.Owner_Id = message.author.id;

          boughtembed.setThumbnail("https://cdn.discordapp.com/attachments/422079130260209680/491438753273872384/Breaking_News_Fumplestocks.jpg")
          boughtembed.setColor(color.lime)
          boughtembed.setTimestamp();

          if(payment == "dumplings"){
            boughtembed.setAuthor(response.stock_buy_author.format(message.author.username), message.author.avatarURL)
            boughtembed.addField(response.stock_buy_title_dumplings.format(message.author.username, stock), response.stock_buy_message_dumplings.format(stock, newstockname, newstockabbreviation, message.author.username, fumplebucks[message.author.id].dumplings))
          }else{
            boughtembed.setAuthor(response.stock_buy_author.format(message.author.username), message.author.avatarURL)
            boughtembed.addField(response.stock_buy_title_fumplebucks.format(message.author.username, stock), response.stock_buy_message_fumplebucks.format(stock, newstockname, newstockabbreviation, message.author.username, fumplebucks[message.author.id].fumplebucks))
          }

          fs.writeFile("./stocks.json", JSON.stringify(stocks), (err) => {
            if(err) console.log(err)
          });
          fs.writeFile("mystocks", JSON.stringify(mystocks), (err) => {
            if(err) console.log(err)
          });



          let purchaseEmbed3 = new Discord.RichEmbed()
          .setAuthor(response.stock_purchase_author.format(message.author.username), message.author.avatarURL)
          .addField(response.stock_purchase_title.format(stocks.Stock_Three.Name, stocks.Stock_Three.Abbreviation), response.stock_purchase_message.format(stocks.Stock_Three.Name, stocks.Stock_Three.Abbreviation, message.author.username, stocks.Stock_Three.Number))
          .setColor(color.lime)
          .setFooter(response.stock_purchase_footer.format(message.author.id))
          .setTimestamp();

          stockChannel.send(purchaseEmbed3);

          save.SaveAll();
          message.channel.send(boughtembed)
          break;
            case "4":

              if(!args[3]) return message.channel.send(response.missing_stock)

              if(newstockabbreviation == "None") return message.channel.send("`You can not put that as the stock abbreviation!`")
if(newstockabbreviation == "none") return message.channel.send("`You can not put that as the stock abbreviation!`")
if(newstockabbreviation == "NONE") return message.channel.send("`You can not put that as the stock abbreviation!`")

              if(!args[4]) return message.channel.send(response.missing_selectedpayment)

              if(stocks.Stock_Four.Price != 0){
                return message.channe.send("You can not buy this stock!");
              }else if(payment == "dumplings" && fumplebucks[message.author.id].dumplings != 0){
                fumplebucks[message.author.id].dumplings = fumplebucks[message.author.id].dumplings - 1;
              }else if(fumplebucks[message.author.id].fumplebucks >= 1000){
                fumplebucks[message.author.id].fumplebucks = fumplebucks[message.author.id].fumplebucks - 1000;
              }else{
                return message.channel.send("You do not have enough to buy that stock!");
              }

              if(mystocks[message.author.id].Owned_Stocks.Stock_One == "None"){
                mystocks[message.author.id].Owned_Stocks.Stock_One = newstockname;
              }else if(mystocks[message.author.id].Owned_Stocks.Stock_Two == "None"){
                mystocks[message.author.id].Owned_Stocks.Stock_Two = newstockname;
              }else{
                return message.channel.send("You already own the maximum number of stocks!")
              }

              stocks.Stock_Four.Abbreviation = newstockabbreviation;
              stocks.Stock_Four.Name = newstockname;
              stocks.Stock_Four.Price = 1000;
              stocks.Stock_Four.Owner_Name = message.author.username;
              stocks.Stock_Four.Owner_Id = message.author.id;

              boughtembed.setThumbnail("https://cdn.discordapp.com/attachments/422079130260209680/491438753273872384/Breaking_News_Fumplestocks.jpg")
              boughtembed.setColor(color.lime)
              boughtembed.setTimestamp();

              if(payment == "dumplings"){
                boughtembed.setAuthor(response.stock_buy_author.format(message.author.username), message.author.avatarURL)
                boughtembed.addField(response.stock_buy_title_dumplings.format(message.author.username, stock), response.stock_buy_message_dumplings.format(stock, newstockname, newstockabbreviation, message.author.username, fumplebucks[message.author.id].dumplings))
              }else{
                boughtembed.setAuthor(response.stock_buy_author.format(message.author.username), message.author.avatarURL)
                boughtembed.addField(response.stock_buy_title_fumplebucks.format(message.author.username, stock), response.stock_buy_message_fumplebucks.format(stock, newstockname, newstockabbreviation, message.author.username, fumplebucks[message.author.id].fumplebucks))
              }

              fs.writeFile("./stocks.json", JSON.stringify(stocks), (err) => {
                if(err) console.log(err)
              });
              fs.writeFile("mystocks", JSON.stringify(mystocks), (err) => {
                if(err) console.log(err)
              });



              let purchaseEmbed4 = new Discord.RichEmbed()
              .setAuthor(response.stock_purchase_author.format(message.author.username), message.author.avatarURL)
              .addField(response.stock_purchase_title.format(stocks.Stock_Four.Name, stocks.Stock_Four.Abbreviation), response.stock_purchase_message.format(stocks.Stock_Four.Name, stocks.Stock_Four.Abbreviation, message.author.username, stocks.Stock_Four.Number))
              .setColor(color.lime)
              .setFooter(response.stock_purchase_footer.format(message.author.id))
              .setTimestamp();

              stockChannel.send(purchaseEmbed4);

              save.SaveAll();
              message.channel.send(boughtembed)
              break;
              case "5":

                if(!args[3]) return message.channel.send(response.missing_stock)

                if(newstockabbreviation == "None") return message.channel.send("`You can not put that as the stock abbreviation!`")
                if(newstockabbreviation == "none") return message.channel.send("`You can not put that as the stock abbreviation!`")
                if(newstockabbreviation == "NONE") return message.channel.send("`You can not put that as the stock abbreviation!`")

                if(!args[4]) return message.channel.send(response.missing_selectedpayment)

                if(stocks.Stock_Five.Price != 0){
                  return message.channe.send("You can not buy this stock!");
                }else if(payment == "dumplings" && fumplebucks[message.author.id].dumplings != 0){
                  fumplebucks[message.author.id].dumplings = fumplebucks[message.author.id].dumplings - 1;
                }else if(fumplebucks[message.author.id].fumplebucks >= 1000){
                  fumplebucks[message.author.id].fumplebucks = fumplebucks[message.author.id].fumplebucks - 1000;
                }else{
                  return message.channel.send("You do not have enough to buy that stock!");
                }

                if(mystocks[message.author.id].Owned_Stocks.Stock_One == "None"){
                  mystocks[message.author.id].Owned_Stocks.Stock_One = newstockname;
                }else if(mystocks[message.author.id].Owned_Stocks.Stock_Two == "None"){
                  mystocks[message.author.id].Owned_Stocks.Stock_Two = newstockname;
                }else{
                  return message.channel.send("You already own the maximum number of stocks!")
                }

                stocks.Stock_Five.Abbreviation = newstockabbreviation;
                stocks.Stock_Five.Name = newstockname;
                stocks.Stock_Five.Price = 1000;
                stocks.Stock_Five.Owner_Name = message.author.username;
                stocks.Stock_Five.Owner_Id = message.author.id;

                boughtembed.setThumbnail("https://cdn.discordapp.com/attachments/422079130260209680/491438753273872384/Breaking_News_Fumplestocks.jpg")
                boughtembed.setColor(color.lime)
                boughtembed.setTimestamp();

                if(payment == "dumplings"){
                  boughtembed.setAuthor(response.stock_buy_author.format(message.author.username), message.author.avatarURL)
                  boughtembed.addField(response.stock_buy_title_dumplings.format(message.author.username, stock), response.stock_buy_message_dumplings.format(stock, newstockname, newstockabbreviation, message.author.username, fumplebucks[message.author.id].dumplings))
                }else{
                  boughtembed.setAuthor(response.stock_buy_author.format(message.author.username), message.author.avatarURL)
                  boughtembed.addField(response.stock_buy_title_fumplebucks.format(message.author.username, stock), response.stock_buy_message_fumplebucks.format(stock, newstockname, newstockabbreviation, message.author.username, fumplebucks[message.author.id].fumplebucks))
                }

                fs.writeFile("./stocks.json", JSON.stringify(stocks), (err) => {
                  if(err) console.log(err)
                });
                fs.writeFile("mystocks", JSON.stringify(mystocks), (err) => {
                  if(err) console.log(err)
                });



                let purchaseEmbed5 = new Discord.RichEmbed()
                .setAuthor(response.stock_purchase_author.format(message.author.username), message.author.avatarURL)
                .addField(response.stock_purchase_title.format(stocks.Stock_Five.Name, stocks.Stock_Five.Abbreviation), response.stock_purchase_message.format(stocks.Stock_Five.Name, stocks.Stock_Five.Abbreviation, message.author.username, stocks.Stock_Five.Number))
                .setColor(color.lime)
                .setFooter(response.stock_purchase_footer.format(message.author.id))
                .setTimestamp();

                stockChannel.send(purchaseEmbed5);

                save.SaveAll();
                message.channel.send(boughtembed)
                break;
                case "6":

                  if(!args[3]) return message.channel.send(response.missing_stock)

                  if(newstockabbreviation == "None") return message.channel.send("`You can not put that as the stock abbreviation!`")
if(newstockabbreviation == "none") return message.channel.send("`You can not put that as the stock abbreviation!`")
if(newstockabbreviation == "NONE") return message.channel.send("`You can not put that as the stock abbreviation!`")

                  if(!args[4]) return message.channel.send(response.missing_selectedpayment)

                  if(stocks.Stock_Six.Price != 0){
                    return message.channe.send("You can not buy this stock!");
                  }else if(payment == "dumplings" && fumplebucks[message.author.id].dumplings != 0){
                    fumplebucks[message.author.id].dumplings = fumplebucks[message.author.id].dumplings - 1;
                  }else if(fumplebucks[message.author.id].fumplebucks >= 1000){
                    fumplebucks[message.author.id].fumplebucks = fumplebucks[message.author.id].fumplebucks - 1000;
                  }else{
                    return message.channel.send("You do not have enough to buy that stock!");
                  }

                  if(mystocks[message.author.id].Owned_Stocks.Stock_One == "None"){
                    mystocks[message.author.id].Owned_Stocks.Stock_One = newstockname;
                  }else if(mystocks[message.author.id].Owned_Stocks.Stock_Two == "None"){
                    mystocks[message.author.id].Owned_Stocks.Stock_Two = newstockname;
                  }else{
                    return message.channel.send("You already own the maximum number of stocks!")
                  }

                  stocks.Stock_Six.Abbreviation = newstockabbreviation;
                  stocks.Stock_Six.Name = newstockname;
                  stocks.Stock_Six.Price = 1000;
                  stocks.Stock_Six.Owner_Name = message.author.username;
                  stocks.Stock_Six.Owner_Id = message.author.id;

                  boughtembed.setThumbnail("https://cdn.discordapp.com/attachments/422079130260209680/491438753273872384/Breaking_News_Fumplestocks.jpg")
                  boughtembed.setColor(color.lime)
                  boughtembed.setTimestamp();

                  if(payment == "dumplings"){
                    boughtembed.setAuthor(response.stock_buy_author.format(message.author.username), message.author.avatarURL)
                    boughtembed.addField(response.stock_buy_title_dumplings.format(message.author.username, stock), response.stock_buy_message_dumplings.format(stock, newstockname, newstockabbreviation, message.author.username, fumplebucks[message.author.id].dumplings))
                  }else{
                    boughtembed.setAuthor(response.stock_buy_author.format(message.author.username), message.author.avatarURL)
                    boughtembed.addField(response.stock_buy_title_fumplebucks.format(message.author.username, stock), response.stock_buy_message_fumplebucks.format(stock, newstockname, newstockabbreviation, message.author.username, fumplebucks[message.author.id].fumplebucks))
                  }

                  fs.writeFile("./stocks.json", JSON.stringify(stocks), (err) => {
                    if(err) console.log(err)
                  });
                  fs.writeFile("mystocks", JSON.stringify(mystocks), (err) => {
                    if(err) console.log(err)
                  });



                  let purchaseEmbed6 = new Discord.RichEmbed()
                  .setAuthor(response.stock_purchase_author.format(message.author.username), message.author.avatarURL)
                  .addField(response.stock_purchase_title.format(stocks.Stock_Six.Name, stocks.Stock_Six.Abbreviation), response.stock_purchase_message.format(stocks.Stock_Six.Name, stocks.Stock_Six.Abbreviation, message.author.username, stocks.Stock_Six.Number))
                  .setColor(color.lime)
                  .setFooter(response.stock_purchase_footer.format(message.author.id))
                  .setTimestamp();

                  stockChannel.send(purchaseEmbed6);

                  save.SaveAll();
                  message.channel.send(boughtembed)
                  break;
                  case "7":

                    if(!args[3]) return message.channel.send(response.missing_stock)

                    if(newstockabbreviation == "None") return message.channel.send("`You can not put that as the stock abbreviation!`")
if(newstockabbreviation == "none") return message.channel.send("`You can not put that as the stock abbreviation!`")
if(newstockabbreviation == "NONE") return message.channel.send("`You can not put that as the stock abbreviation!`")

                    if(!args[4]) return message.channel.send(response.missing_selectedpayment)

                    if(stocks.Stock_Seven.Price != 0){
                      return message.channe.send("You can not buy this stock!");
                    }else if(payment == "dumplings" && fumplebucks[message.author.id].dumplings != 0){
                      fumplebucks[message.author.id].dumplings = fumplebucks[message.author.id].dumplings - 1;
                    }else if(fumplebucks[message.author.id].fumplebucks >= 1000){
                      fumplebucks[message.author.id].fumplebucks = fumplebucks[message.author.id].fumplebucks - 1000;
                    }else{
                      return message.channel.send("You do not have enough to buy that stock!");
                    }

                    if(mystocks[message.author.id].Owned_Stocks.Stock_One == "None"){
                      mystocks[message.author.id].Owned_Stocks.Stock_One = newstockname;
                    }else if(mystocks[message.author.id].Owned_Stocks.Stock_Two == "None"){
                      mystocks[message.author.id].Owned_Stocks.Stock_Two = newstockname;
                    }else{
                      return message.channel.send("You already own the maximum number of stocks!")
                    }

                    stocks.Stock_Seven.Abbreviation = newstockabbreviation;
                    stocks.Stock_Seven.Name = newstockname;
                    stocks.Stock_Seven.Price = 1000;
                    stocks.Stock_Seven.Owner_Name = message.author.username;
                    stocks.Stock_Seven.Owner_Id = message.author.id;

                    boughtembed.setThumbnail("https://cdn.discordapp.com/attachments/422079130260209680/491438753273872384/Breaking_News_Fumplestocks.jpg")
                    boughtembed.setColor(color.lime)
                    boughtembed.setTimestamp();

                    if(payment == "dumplings"){
                      boughtembed.setAuthor(response.stock_buy_author.format(message.author.username), message.author.avatarURL)
                      boughtembed.addField(response.stock_buy_title_dumplings.format(message.author.username, stock), response.stock_buy_message_dumplings.format(stock, newstockname, newstockabbreviation, message.author.username, fumplebucks[message.author.id].dumplings))
                    }else{
                      boughtembed.setAuthor(response.stock_buy_author.format(message.author.username), message.author.avatarURL)
                      boughtembed.addField(response.stock_buy_title_fumplebucks.format(message.author.username, stock), response.stock_buy_message_fumplebucks.format(stock, newstockname, newstockabbreviation, message.author.username, fumplebucks[message.author.id].fumplebucks))
                    }

                    fs.writeFile("./stocks.json", JSON.stringify(stocks), (err) => {
                      if(err) console.log(err)
                    });
                    fs.writeFile("mystocks", JSON.stringify(mystocks), (err) => {
                      if(err) console.log(err)
                    });



                    let purchaseEmbed7 = new Discord.RichEmbed()
                    .setAuthor(response.stock_purchase_author.format(message.author.username), message.author.avatarURL)
                    .addField(response.stock_purchase_title.format(stocks.Stock_Seven.Name, stocks.Stock_Seven.Abbreviation), response.stock_purchase_message.format(stocks.Stock_Seven.Name, stocks.Stock_Seven.Abbreviation, message.author.username, stocks.Stock_Seven.Number))
                    .setColor(color.lime)
                    .setFooter(response.stock_purchase_footer.format(message.author.id))
                    .setTimestamp();

                    stockChannel.send(purchaseEmbed7);

                    save.SaveAll();
                    message.channel.send(boughtembed)
                    break;
                    case "8":

                      if(!args[3]) return message.channel.send(response.missing_stock)

                      if(newstockabbreviation == "None") return message.channel.send("`You can not put that as the stock abbreviation!`")
if(newstockabbreviation == "none") return message.channel.send("`You can not put that as the stock abbreviation!`")
if(newstockabbreviation == "NONE") return message.channel.send("`You can not put that as the stock abbreviation!`")

                      if(!args[4]) return message.channel.send(response.missing_selectedpayment)

                      if(stocks.Stock_Eight.Price != 0){
                        return message.channe.send("You can not buy this stock!");
                      }else if(payment == "dumplings" && fumplebucks[message.author.id].dumplings != 0){
                        fumplebucks[message.author.id].dumplings = fumplebucks[message.author.id].dumplings - 1;
                      }else if(fumplebucks[message.author.id].fumplebucks >= 1000){
                        fumplebucks[message.author.id].fumplebucks = fumplebucks[message.author.id].fumplebucks - 1000;
                      }else{
                        return message.channel.send("You do not have enough to buy that stock!");
                      }



                      if(mystocks[message.author.id].Owned_Stocks.Stock_One == "None"){
                        mystocks[message.author.id].Owned_Stocks.Stock_One = newstockname;
                      }else if(mystocks[message.author.id].Owned_Stocks.Stock_Two == "None"){
                        mystocks[message.author.id].Owned_Stocks.Stock_Two = newstockname;
                      }else{
                        return message.channel.send("You already own the maximum number of stocks!")
                      }

                      stocks.Stock_Eight.Abbreviation = newstockabbreviation;
                      stocks.Stock_Eight.Name = newstockname;
                      stocks.Stock_Eight.Price = 1000;
                      stocks.Stock_Eight.Owner_Name = message.author.username;
                      stocks.Stock_Eight.Owner_Id = message.author.id;

                      boughtembed.setThumbnail("https://cdn.discordapp.com/attachments/422079130260209680/491438753273872384/Breaking_News_Fumplestocks.jpg")
                      boughtembed.setColor(color.lime)
                      boughtembed.setTimestamp();

                      if(payment == "dumplings"){
                        boughtembed.setAuthor(response.stock_buy_author.format(message.author.username), message.author.avatarURL)
                        boughtembed.addField(response.stock_buy_title_dumplings.format(message.author.username, stock), response.stock_buy_message_dumplings.format(stock, newstockname, newstockabbreviation, message.author.username, fumplebucks[message.author.id].dumplings))
                      }else{
                        boughtembed.setAuthor(response.stock_buy_author.format(message.author.username), message.author.avatarURL)
                        boughtembed.addField(response.stock_buy_title_fumplebucks.format(message.author.username, stock), response.stock_buy_message_fumplebucks.format(stock, newstockname, newstockabbreviation, message.author.username, fumplebucks[message.author.id].fumplebucks))
                      }

                      fs.writeFile("./stocks.json", JSON.stringify(stocks), (err) => {
                        if(err) console.log(err)
                      });
                      fs.writeFile("mystocks", JSON.stringify(mystocks), (err) => {
                        if(err) console.log(err)
                      });



                      let purchaseEmbed8 = new Discord.RichEmbed()
                      .setAuthor(response.stock_purchase_author.format(message.author.username), message.author.avatarURL)
                      .addField(response.stock_purchase_title.format(stocks.Stock_Eight.Name, stocks.Stock_Eight.Abbreviation), response.stock_purchase_message.format(stocks.Stock_Eight.Name, stocks.Stock_Eight.Abbreviation, message.author.username, stocks.Stock_Eight.Number))
                      .setColor(color.lime)
                      .setFooter(response.stock_purchase_footer.format(message.author.id))
                      .setTimestamp();

                      stockChannel.send(purchaseEmbed8);

                      save.SaveAll();
                      message.channel.send(boughtembed)
                      break;
    default:
      return message.channel.send(response.unknown_stock);
  }
}

var stockset = function()
{
  if(!args[1]) return message.channel.send(response.missing_stock)
  let stock = args[1].toLowerCase();

  if(!args[2]) return message.channel.send(response.missing_stock_feature)
  let feature = args[2].toLowerCase();

  if(!args[3]) return message.channel.send(response.missing_stock_newfeature)
  let newfeature = args.slice(3).join(" ");

  let stocksetembed = new Discord.RichEmbed()
  .setColor(color.royal_blue)
  .setTimestamp();

  switch(stock)
  {
    case "none":
      message.channel.send("`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`");
      break;
    case "1":
    case stocks.Stock_One.Abbreviation.toLowerCase():
      if(stocks.Stock_One.Owner_Id != message.author.id) return message.channel.send(response.unowned_stock)

      stocksetembed.setAuthor(response.stock_set_author.format(message.author.username, feature.toLowerCase(), stocks.Stock_One.Name), message.author.avatarURL)
      switch(feature.toLowerCase())
      {
        case "bio":
        case "info":
        case "description":
          stocks.Stock_One.Info = newfeature;
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_One.Name, newfeature));
          break;
        case "image":
        case "picture":
        case "logo":
          stocks.Stock_One.Image = newfeature;
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_One.Name, newfeature));
          break;
        case "abbreviation":
        case "abbr":
          if(newfeature.toLowerCase == "none") return message.channel.send("Nah p you can't use that abbreviation!");
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_One.Name, newfeature));

          if(!stockChannel) return message.channel.reply(response.missing_channel);
          stocks.Stock_One.Abbreviation = newfeature;
          stockChannel.send(stocksetembed);
          break;
        case "name":
        case "title":
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_One.Name, newfeature));
          stocks.Stock_One.Name = newfeature;
          message.channel.send(stocksetembed);
          break;
      }
      message.channel.send(stocksetembed);
      break;
    case "2":
    case stocks.Stock_Two.Abbreviation.toLowerCase():
    if(stocks.Stock_Two.Owner_Id != message.author.id) return message.channel.send(response.unowned_stock)
    stocksetembed.setAuthor(response.stock_set_author.format(message.author.username, feature.toLowerCase(), stocks.Stock_Two.Name), message.author.avatarURL)
      switch(feature.toLowerCase())
      {
        case "bio":
        case "info":
        case "description":
          stocks.Stock_Two.Info = newfeature;
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Two.Name, newfeature));
          break;
        case "image":
        case "picture":
        case "logo":
          stocks.Stock_Two.Image = newfeature;
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Two.Name, newfeature));
          break;
        case "abbreviation":
        case "abbr":
          if(newfeature.toLowerCase == "none") return message.channel.send("Nah p you can't use that abbreviation!");
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Two.Name, newfeature));

          if(!stockChannel) return message.channel.reply(response.missing_channel);
          stocks.Stock_Two.Abbreviation = newfeature;
          stockChannel.send(stocksetembed);
          break;
        case "name":
        case "title":
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Two.Name, newfeature));
          stocks.Stock_Two.Name = newfeature;
          break;
      }
      message.channel.send(stocksetembed);
      break;
    case "3":
    case stocks.Stock_Three.Abbreviation.toLowerCase():
    if(stocks.Stock_Three.Owner_Id != message.author.id) return message.channel.send(response.unowned_stock)
    stocksetembed.setAuthor(response.stock_set_author.format(message.author.username, feature.toLowerCase(), stocks.Stock_Three.Name), message.author.avatarURL)
      switch(feature.toLowerCase())
      {
        case "bio":
        case "info":
        case "description":
          stocks.Stock_Three.Info = newfeature;
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Three.Name, newfeature));
          break;
        case "image":
        case "picture":
        case "logo":
          stocks.Stock_Three.Image = newfeature;
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Three.Name, newfeature));
          break;
        case "abbreviation":
        case "abbr":
          if(newfeature.toLowerCase == "none") return message.channel.send("Nah p you can't use that abbreviation!");
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Three.Name, newfeature));

          if(!stockChannel) return message.channel.reply(response.missing_channel);
          stocks.Stock_Three.Abbreviation = newfeature;
          stockChannel.send(stocksetembed);
          break;
        case "name":
        case "title":
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Three.Name, newfeature));
          stocks.Stock_Three.Name = newfeature;
          break;
      }
      message.channel.send(stocksetembed);
      break;
    case "4":
    case stocks.Stock_Four.Abbreviation.toLowerCase():
    if(stocks.Stock_Four.Owner_Id != message.author.id) return message.channel.send(response.unowned_stock)
    stocksetembed.setAuthor(response.stock_set_author.format(message.author.username, feature.toLowerCase(), stocks.Stock_Four.Name), message.author.avatarURL)
      switch(feature.toLowerCase())
      {
        case "bio":
        case "info":
        case "description":
          stocks.Stock_Four.Info = newfeature;
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Four.Name, newfeature));
          break;
        case "image":
        case "picture":
        case "logo":
          stocks.Stock_Four.Image = newfeature;
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Four.Name, newfeature));
          break;
        case "abbreviation":
        case "abbr":
          if(newfeature.toLowerCase == "none") return message.channel.send("Nah p you can't use that abbreviation!");
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Four.Name, newfeature));

          if(!stockChannel) return message.channel.reply(response.missing_channel);
          stocks.Stock_Four.Abbreviation = newfeature;
          stockChannel.send(stocksetembed);
          break;
        case "name":
        case "title":
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Four.Name, newfeature));
          stocks.Stock_Four.Name = newfeature;
          break;
      }
      message.channel.send(stocksetembed);
      break;
    case "5":
    case stocks.Stock_Five.Abbreviation.toLowerCase():
    if(stocks.Stock_Five.Owner_Id != message.author.id) return message.channel.send(response.unowned_stock)
    stocksetembed.setAuthor(response.stock_set_author.format(message.author.username, feature.toLowerCase(), stocks.Stock_Five.Name), message.author.avatarURL)
      switch(feature.toLowerCase())
      {
        case "bio":
        case "info":
        case "description":
          stocks.Stock_Five.Info = newfeature;
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Five.Name, newfeature));
          break;
        case "image":
        case "picture":
        case "logo":
          stocks.Stock_Five.Image = newfeature;
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Five.Name, newfeature));
          break;
        case "abbreviation":
        case "abbr":
          if(newfeature.toLowerCase == "none") return message.channel.send("Nah p you can't use that abbreviation!");
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Five.Name, newfeature));

          if(!stockChannel) return message.channel.reply(response.missing_channel);
          stocks.Stock_Five.Abbreviation = newfeature;
          stockChannel.send(stocksetembed);
          break;
        case "name":
        case "title":
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Five.Name, newfeature));
          stocks.Stock_Five.Name = newfeature;
          break;
      }
      message.channel.send(stocksetembed);
      break;
    case "6":
    case stocks.Stock_Six.Abbreviation.toLowerCase():
    if(stocks.Stock_Six.Owner_Id != message.author.id) return message.channel.send(response.unowned_stock)
    stocksetembed.setAuthor(response.stock_set_author.format(message.author.username, feature.toLowerCase(), stocks.Stock_Six.Name), message.author.avatarURL)
      switch(feature.toLowerCase())
      {
        case "bio":
        case "info":
        case "description":
          stocks.Stock_Six.Info = newfeature;
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Six.Name, newfeature));
          break;
        case "image":
        case "picture":
        case "logo":
          stocks.Stock_Six.Image = newfeature;
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Six.Name, newfeature));
          break;
        case "abbreviation":
        case "abbr":
          if(newfeature.toLowerCase == "none") return message.channel.send("Nah p you can't use that abbreviation!");
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Six.Name, newfeature));

          if(!stockChannel) return message.channel.reply(response.missing_channel);
          stocks.Stock_Six.Abbreviation = newfeature;
          stockChannel.send(stocksetembed);
          break;
        case "name":
        case "title":
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Six.Name, newfeature));
          stocks.Stock_Six.Name = newfeature;
          break;
      }
      message.channel.send(stocksetembed);
      break;
    case "7":
    case stocks.Stock_Seven.Abbreviation.toLowerCase():
    if(stocks.Stock_Seven.Owner_Id != message.author.id) return message.channel.send(response.unowned_stock)
    stocksetembed.setAuthor(response.stock_set_author.format(message.author.username, feature.toLowerCase(), stocks.Stock_Seven.Name), message.author.avatarURL)
      switch(feature.toLowerCase())
      {
        case "bio":
        case "info":
        case "description":
          stocks.Stock_Seven.Info = newfeature;
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Seven.Name, newfeature));
          break;
        case "image":
        case "picture":
        case "logo":
          stocks.Stock_Seven.Image = newfeature;
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Seven.Name, newfeature));
          break;
        case "abbreviation":
        case "abbr":
          if(newfeature.toLowerCase == "none") return message.channel.send("Nah p you can't use that abbreviation!");
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Seven.Name, newfeature));

          if(!stockChannel) return message.channel.reply(response.missing_channel);
          stocks.Stock_Seven.Abbreviation = newfeature;
          stockChannel.send(stocksetembed);
          break;
        case "name":
        case "title":
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Seven.Name, newfeature));
          stocks.Stock_Seven.Name = newfeature;
          break;
      }
      message.channel.send(stocksetembed);
      break;
    case "8":
    case stocks.Stock_Eight.Abbreviation.toLowerCase():
    if(stocks.Stock_Eight.Owner_Id != message.author.id) return message.channel.send(response.unowned_stock)
    stocksetembed.setAuthor(response.stock_set_author.format(message.author.username, feature.toLowerCase(), stocks.Stock_Eight.Name), message.author.avatarURL)
      switch(feature.toLowerCase())
      {
        case "bio":
        case "info":
        case "description":
          stocks.Stock_Eight.Info = newfeature;
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Eight.Name, newfeature));
          break;
        case "image":
        case "picture":
        case "logo":
          stocks.Stock_Eight.Image = newfeature;
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Eight.Name, newfeature));
          break;
        case "abbreviation":
        case "abbr":
          if(newfeature.toLowerCase == "none") return message.channel.send("Nah p you can't use that abbreviation!");
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Eight.Name, newfeature));

          if(!stockChannel) return message.channel.reply(response.missing_channel);
          stocks.Stock_Eight.Abbreviation = newfeature;
          stockChannel.send(stocksetembed);
          break;
        case "name":
        case "title":
          stocksetembed.addField(response.stock_set_title, response.stock_set_message.format(message.author.username, feature.toLowerCase(), stocks.Stock_Eight.Name, newfeature));
          stocks.Stock_Eight.Name = newfeature;
          break;
      }
      message.channel.send(stocksetembed);
      break;
    default:
      message.channel.send(response.unknown_stock);
  }
  fs.writeFile("./stocks.json", JSON.stringify(stocks), (err) => {
    if(err) console.log(err)
  });
}


var investmsg = function(investamount, stockname, ownedstocks)
{
  let investmsg = new Discord.RichEmbed(investamount, stockname)
  .setAuthor(response.stock_invest_author.format(message.author.username), message.author.avatarURL)
  .addField(response.stock_invest_message_title.format(message.author.username, investamount, stockname), response.stock_invest_message.format(message.author.username, ownedstocks, stockname))
  .setColor(color.purple)
  .setTimestamp();

  return message.channel.send(investmsg);
}

var invest = function()
{
  if(!args[1]) return message.channel.send(response.missing_stock)
  let stock = args[1].toLowerCase();

  if(!args[2]) return message.channel.send(response.missing_stock_amount)
  let amount = parseInt(args[2]);
  message.channel.send(amount);
  if(amount == null) return message.channel.send("No");
  if(amount == NaN) return message.channel.send("No");
  if (!Number.isInteger(amount)) {
    return message.channel.send("No");
  }
  switch(stock)
  {
    case "1":
    case stocks.Stock_One.Abbreviation.toLowerCase():
      if(stocks.Stock_One.Abbreviation.toLowerCase() == "none") return message.channel.send(`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`);
      if(stocks.Stock_One.Price == 0) return message.channel.send(response.stock_univestable);
      if (amount * stocks.Stock_One.Price > fumplebucks[message.author.id].fumplebucks) return message.channel.send(response.insufficent_fumplebucks);
      fumplebucks[message.author.id].fumplebucks -= amount * stocks.Stock_One.Price;
      mystocks[message.author.id].Stocks_One_Amount += amount;
      investmsg(amount, stocks.Stock_One.Name, mystocks[message.author.id].Stocks_One_Amount);
      break;
      case "2":
      case stocks.Stock_Two.Abbreviation.toLowerCase():
        if(stocks.Stock_Two.Abbreviation.toLowerCase() == "none") return message.channel.send(`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`);
        if(stocks.Stock_Two.Price == 0) return message.channel.send(response.stock_univestable);
        if (amount * stocks.Stock_Two.Price > fumplebucks[message.author.id].fumplebucks) return message.channel.send(response.insufficent_fumplebucks);
        fumplebucks[message.author.id].fumplebucks -= amount * stocks.Stock_Two.Price;
        mystocks[message.author.id].Stocks_Two_Amount += amount;
        investmsg(amount, stocks.Stock_Two.Name, mystocks[message.author.id].Stocks_Two_Amount);
        break;
        case "3":
        case stocks.Stock_Three.Abbreviation.toLowerCase():
          if(stocks.Stock_Three.Abbreviation.toLowerCase() == "none") return message.channel.send(`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`);
          if(stocks.Stock_Three.Price == 0) return message.channel.send(response.stock_univestable);
          if (amount * stocks.Stock_Three.Price > fumplebucks[message.author.id].fumplebucks) return message.channel.send(response.insufficent_fumplebucks);
          fumplebucks[message.author.id].fumplebucks -= amount * stocks.Stock_Three.Price;
          mystocks[message.author.id].Stocks_Three_Amount += amount;
          investmsg(amount, stocks.Stock_Three.Name, mystocks[message.author.id].Stocks_Three_Amount);
          break;
          case "4":
          case stocks.Stock_Four.Abbreviation.toLowerCase():
            if(stocks.Stock_Four.Abbreviation.toLowerCase() == "none") return message.channel.send(`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`);
            if(stocks.Stock_Four.Price == 0) return message.channel.send(response.stock_univestable);
            if (amount * stocks.Stock_Four.Price > fumplebucks[message.author.id].fumplebucks) return message.channel.send(response.insufficent_fumplebucks);
            fumplebucks[message.author.id].fumplebucks -= amount * stocks.Stock_Four.Price;
            mystocks[message.author.id].Stocks_Four_Amount += amount;
            investmsg(amount, stocks.Stock_Four.Name, mystocks[message.author.id].Stocks_Four_Amount);
            break;
            case "5":
            case stocks.Stock_Five.Abbreviation.toLowerCase():
              if(stocks.Stock_Five.Abbreviation.toLowerCase() == "none") return message.channel.send(`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`);
              if(stocks.Stock_Five.Price == 0) return message.channel.send(response.stock_univestable);
              if (amount * stocks.Stock_Five.Price > fumplebucks[message.author.id].fumplebucks) return message.channel.send(response.insufficent_fumplebucks);
              fumplebucks[message.author.id].fumplebucks -= amount * stocks.Stock_Five.Price;
              mystocks[message.author.id].Stocks_Five_Amount += amount;
              investmsg(amount, stocks.Stock_Five.Name, mystocks[message.author.id].Stocks_Five_Amount);
              break;
              case "6":
              case stocks.Stock_Six.Abbreviation.toLowerCase():
                if(stocks.Stock_Six.Abbreviation.toLowerCase() == "none") return message.channel.send(`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`);
                if(stocks.Stock_Six.Price == 0) return message.channel.send(response.stock_univestable);
                if (amount * stocks.Stock_Six.Price > fumplebucks[message.author.id].fumplebucks) return message.channel.send(response.insufficent_fumplebucks);
                fumplebucks[message.author.id].fumplebucks -= amount * stocks.Stock_Six.Price;
                mystocks[message.author.id].Stocks_Six_Amount += amount;
                investmsg(amount, stocks.Stock_Six.Name, mystocks[message.author.id].Stocks_Six_Amount);
                break;
                case "7":
                case stocks.Stock_Seven.Abbreviation.toLowerCase():
                  if(stocks.Stock_Seven.Abbreviation.toLowerCase() == "none") return message.channel.send(`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`);
                  if(stocks.Stock_Seven.Price == 0) return message.channel.send(response.stock_univestable);
                  if (amount * stocks.Stock_Seven.Price > fumplebucks[message.author.id].fumplebucks) return message.channel.send(response.insufficent_fumplebucks);
                  fumplebucks[message.author.id].fumplebucks -= amount * stocks.Stock_Seven.Price;
                  mystocks[message.author.id].Stocks_Seven_Amount += amount;
                  investmsg(amount, stocks.Stock_Seven.Name, mystocks[message.author.id].Stocks_Seven_Amount);
                  break;
                  case "8":
                  case stocks.Stock_Eight.Abbreviation.toLowerCase():
                    if(stocks.Stock_Eight.Abbreviation.toLowerCase() == "none") return message.channel.send(`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`);
                    if(stocks.Stock_Eight.Price == 0) return message.channel.send(response.stock_univestable);
                    if (amount * stocks.Stock_Eight.Price > fumplebucks[message.author.id].fumplebucks) return message.channel.send(response.insufficent_fumplebucks);
                    fumplebucks[message.author.id].fumplebucks -= amount * stocks.Stock_Eight.Price;
                    mystocks[message.author.id].Stocks_Eight_Amount += amount;
                    investmsg(amount, stocks.Stock_Eight.Name, mystocks[message.author.id].Stocks_Eight_Amount);
                    break;
  }
}

var cashoutmsg = function(investamount, stockname, ownedstocks)
{
  let cashoutmsg = new Discord.RichEmbed(investamount, stockname)
  .setAuthor(response.stock_cashout_author.format(message.author.username), message.author.avatarURL)
  .addField(response.stock_cashout_message_title.format(message.author.username, investamount, stockname), response.stock_cashout_message.format(message.author.username, ownedstocks, stockname, fumplebucks[message.author.id].fumplebucks))
  .setColor(color.lime)
  .setTimestamp();

  return message.channel.send(cashoutmsg);
}

var cashout = function()
{
  if(!args[1]) return message.channel.send(response.missing_stock)
  let stock = args[1].toLowerCase();

  if(!args[2]) return message.channel.send(response.missing_stock_amount)
  let amount = parseInt(args[2]);

  switch(stock)
  {
    case "1":
    case stocks.Stock_One.Abbreviation.toLowerCase():
      if(stocks.Stock_One.Abbreviation.toLowerCase() == "none") return message.channel.send(`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`);
      if (amount > mystocks[message.author.id].Stocks_One_Amount) return message.channel.send(response.insufficent_stocks);
      mystocks[message.author.id].Stocks_One_Amount -= amount;
      fumplebucks[message.author.id].fumplebucks += amount * stocks.Stock_One.Price;
      cashoutmsg(amount, stocks.Stock_One.Name, mystocks[message.author.id].Stocks_One_Amount);
      break;
      case "2":
      case stocks.Stock_Two.Abbreviation.toLowerCase():
        if(stocks.Stock_Two.Abbreviation.toLowerCase() == "none") return message.channel.send(`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`);
        if (amount > mystocks[message.author.id].Stocks_Two_Amount) return message.channel.send(response.insufficent_stocks);
        mystocks[message.author.id].Stocks_Two_Amount -= amount;
        fumplebucks[message.author.id].fumplebucks += amount * stocks.Stock_Two.Price;
        cashoutmsg(amount, stocks.Stock_Two.Name, mystocks[message.author.id].Stocks_Two_Amount);
        break;
        case "3":
        case stocks.Stock_Three.Abbreviation.toLowerCase():
          if(stocks.Stock_Three.Abbreviation.toLowerCase() == "none") return message.channel.send(`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`);
          if (amount > mystocks[message.author.id].Stocks_Three_Amount) return message.channel.send(response.insufficent_stocks);
          mystocks[message.author.id].Stocks_Three_Amount -= amount;
          fumplebucks[message.author.id].fumplebucks += amount * stocks.Stock_Three.Price;
          cashoutmsg(amount, stocks.Stock_Three.Name, mystocks[message.author.id].Stocks_Three_Amount);
          break;
          case "4":
          case stocks.Stock_Four.Abbreviation.toLowerCase():
            if(stocks.Stock_Four.Abbreviation.toLowerCase() == "none") return message.channel.send(`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`);
            if (amount > mystocks[message.author.id].Stocks_Four_Amount) return message.channel.send(response.insufficent_stocks);
            mystocks[message.author.id].Stocks_Four_Amount -= amount;
            fumplebucks[message.author.id].fumplebucks += amount * stocks.Stock_Four.Price;
            cashoutmsg(amount, stocks.Stock_Four.Name, mystocks[message.author.id].Stocks_Four_Amount);
            break;
            case "5":
            case stocks.Stock_Five.Abbreviation.toLowerCase():
              if(stocks.Stock_Five.Abbreviation.toLowerCase() == "none") return message.channel.send(`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`);
              if (amount > mystocks[message.author.id].Stocks_Five_Amount) return message.channel.send(response.insufficent_stocks);
              mystocks[message.author.id].Stocks_Five_Amount -= amount;
              fumplebucks[message.author.id].fumplebucks += amount * stocks.Stock_Five.Price;
              cashoutmsg(amount, stocks.Stock_Five.Name, mystocks[message.author.id].Stocks_Five_Amount);
              break;
              case "6":
              case stocks.Stock_Six.Abbreviation.toLowerCase():
                if(stocks.Stock_Six.Abbreviation.toLowerCase() == "none") return message.channel.send(`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`);
                if (amount > mystocks[message.author.id].Stocks_Six_Amount) return message.channel.send(response.insufficent_stocks);
                mystocks[message.author.id].Stocks_Six_Amount -= amount;
                fumplebucks[message.author.id].fumplebucks += amount * stocks.Stock_Six.Price;
                cashoutmsg(amount, stocks.Stock_Six.Name, mystocks[message.author.id].Stocks_Six_Amount);
                break;
                case "7":
                case stocks.Stock_Seven.Abbreviation.toLowerCase():
                  if(stocks.Stock_Seven.Abbreviation.toLowerCase() == "none") return message.channel.send(`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`);
                  if (amount > mystocks[message.author.id].Stocks_Seven_Amount) return message.channel.send(response.insufficent_stocks);
                  mystocks[message.author.id].Stocks_Seven_Amount -= amount;
                  fumplebucks[message.author.id].fumplebucks += amount * stocks.Stock_Seven.Price;
                  cashoutmsg(amount, stocks.Stock_Seven.Name, mystocks[message.author.id].Stocks_Seven_Amount);
                  break;
                  case "8":
                  case stocks.Stock_Eight.Abbreviation.toLowerCase():
                    if(stocks.Stock_Eight.Abbreviation.toLowerCase() == "none") return message.channel.send(`Nah p if that is actually someone's abbreviation for their stock then they should contact John to fix it.`);
                    if (amount > mystocks[message.author.id].Stocks_Eight_Amount) return message.channel.send(response.insufficent_stocks);
                    mystocks[message.author.id].Stocks_Eight_Amount -= amount;
                    fumplebucks[message.author.id].fumplebucks += amount * stocks.Stock_Eight.Price;
                    cashoutmsg(amount, stocks.Stock_Eight.Name, mystocks[message.author.id].Stocks_Eight_Amount);
                    break;

  }
}

var eventCalculator = function(event, stockPrice)
{
  if(event == 3)
  {
    if(stockPrice == 0 || stockPrice == 5000)
    {
      return 0;
    }else
    {
      return randomInt(0, 25);
    }
  }else if(event == 2)
  {
    let eventNum = randomInt(1, 2);
    if(eventNum == 2)
    {
      return 1;
    }else
    {
      return 0;
    }
  }else
  {
    if(stockPrice == 0 || stockPrice == 5000)
    {
      return 0;
    }

    let eventNum = randomInt(1, 100);

    if(eventNum <= 10)
    {
      return eventNum;
    }else
    {
      return 0;
    }
  }
}

var stocksystem = function(authorUsername, authorImage)
{

  console.log("Stocks Started!");

  let stockChangeEmbed = new Discord.RichEmbed()
  .setAuthor(response.stock_system_author.format(authorUsername), authorImage)
  .setFooter(response.stock_system_footer, "https://images-ext-1.discordapp.net/external/AK3j_NHWVTgKarek2RiwjHs5y2OvSFxNc-vjQ4cJUoU/https/cdn.discordapp.com/attachments/483302550666346498/492014432692731922/question_mark_good.png")
  .setImage("https://cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg")
  .setTimestamp();

  let stockOneEvent = eventCalculator(1, stocks.Stock_One.Price);
  let stockTwoEvent = eventCalculator(1, stocks.Stock_Two.Price);
  let stockThreeEvent = eventCalculator(1, stocks.Stock_Three.Price);
  let stockFourEvent = eventCalculator(1, stocks.Stock_Four.Price);
  let stockFiveEvent = eventCalculator(1, stocks.Stock_Five.Price);
  let stockSixEvent = eventCalculator(1, stocks.Stock_Six.Price);
  let stockSevenEvent = eventCalculator(1, stocks.Stock_Seven.Price);
  let stockEightEvent = eventCalculator(1, stocks.Stock_Eight.Price);

  let stockOnePosOrNeg = eventCalculator(2, stocks.Stock_One.Price);
  let stockTwoPosOrNeg = eventCalculator(2, stocks.Stock_Two.Price);
  let stockThreePosOrNeg = eventCalculator(2, stocks.Stock_Three.Price);
  let stockFourPosOrNeg = eventCalculator(2, stocks.Stock_Four.Price);
  let stockFivePosOrNeg = eventCalculator(2, stocks.Stock_Five.Price);
  let stockSixPosOrNeg = eventCalculator(2, stocks.Stock_Six.Price);
  let stockSevenPosOrNeg = eventCalculator(2, stocks.Stock_Seven.Price);
  let stockEightPosOrNeg = eventCalculator(2, stocks.Stock_Eight.Price);

  let stockOneNormalChange = eventCalculator(3, stocks.Stock_One.Price);
  let stockTwoNormalChange = eventCalculator(3, stocks.Stock_Two.Price);
  let stockThreeNormalChange = eventCalculator(3, stocks.Stock_Three.Price);
  let stockFourNormalChange = eventCalculator(3, stocks.Stock_Four.Price);
  let stockFiveNormalChange = eventCalculator(3, stocks.Stock_Five.Price);
  let stockSixNormalChange = eventCalculator(3, stocks.Stock_Six.Price);
  let stockSevenNormalChange = eventCalculator(3, stocks.Stock_Seven.Price);
  let stockEightNormalChange = eventCalculator(3, stocks.Stock_Eight.Price)

  let stockOneEventChange1 = randomInt(25, 100);
  let stockTwoEventChange1 = randomInt(25, 100);
  let stockThreeEventChange1 = randomInt(25, 100);
  let stockFourEventChange1 = randomInt(25, 100);
  let stockFiveEventChange1 = randomInt(25, 100);
  let stockSixEventChange1 = randomInt(25, 100);
  let stockSevenEventChange1 = randomInt(25, 100);
  let stockEightEventChange1 = randomInt(25, 100);

  let stockOneEventChange2 = randomInt(100, 500);
  let stockTwoEventChange2 = randomInt(100, 500);
  let stockThreeEventChange2 = randomInt(100, 500);
  let stockFourEventChange2 = randomInt(100, 500);
  let stockFiveEventChange2 = randomInt(100, 500);
  let stockSixEventChange2 = randomInt(100, 500);
  let stockSevenEventChange2 = randomInt(100, 500);
  let stockEightEventChange2 = randomInt(100, 500);

  let stockOneEventChange3 = randomInt(500, 1000);
  let stockTwoEventChange3 = randomInt(500, 1000);
  let stockThreeEventChange3 = randomInt(500, 1000);
  let stockFourEventChange3 = randomInt(500, 1000);
  let stockFiveEventChange3 = randomInt(500, 1000);
  let stockSixEventChange3 = randomInt(500, 1000);
  let stockSevenEventChange3 = randomInt(500, 1000);
  let stockEightEventChange3 = randomInt(500, 1000);


  let posSum = stockOneNormalChange * stockOnePosOrNeg + stockTwoNormalChange * stockTwoPosOrNeg + stockThreeNormalChange * stockThreePosOrNeg + stockFourNormalChange * stockFourPosOrNeg + stockFiveNormalChange * stockFivePosOrNeg + stockSixNormalChange * stockSixPosOrNeg + stockSevenNormalChange * stockSevenPosOrNeg + stockEightNormalChange;
  let negSum = stockOneNormalChange * Math.abs(stockOnePosOrNeg - 1) + stockTwoNormalChange * Math.abs(stockTwoPosOrNeg - 1) + stockThreeNormalChange * Math.abs(stockThreePosOrNeg - 1) + stockFourNormalChange * Math.abs(stockFourPosOrNeg - 1) + stockFiveNormalChange * Math.abs(stockFivePosOrNeg - 1) + stockSixNormalChange * Math.abs(stockSixPosOrNeg - 1) + stockSevenNormalChange * Math.abs(stockSevenPosOrNeg - 1) + stockEightNormalChange * Math.abs(stockEightPosOrNeg - 1);

  console.log(posSum);
  console.log(negSum);

  if(stockOneEvent + stockTwoEvent + stockThreeEvent + stockFourEvent + stockFiveEvent + stockSixEvent + stockSevenEvent + stockEightEvent != 0)
  {
    stockChangeEmbed.setTitle(response.stock_system_event_title);
    stockChangeEmbed.setColor(color.yellow);
    stockChangeEmbed.setImage("https://cdn.discordapp.com/attachments/422079130260209680/491438753273872384/Breaking_News_Fumplestocks.jpg");
  }else if (posSum == negSum)
  {
    stockChangeEmbed.setTitle(response.stock_system_boring_title);
    stockChangeEmbed.setThumbnail("https://cdn.discordapp.com/attachments/516138714745929784/622610900138065920/CloudyFumple.png");
    stockChangeEmbed.setColor(color.gray);
  }else if(negSum == 0)
  {
    stockChangeEmbed.setTitle(response.stock_system_great_title);
    stockChangeEmbed.setThumbnail("https://cdn.discordapp.com/attachments/516138714745929784/622610901614329857/SunFumple.png");
    stockChangeEmbed.setColor(color.lime);
  }else if(posSum == 0)
  {
    stockChangeEmbed.setTitle(response.stock_system_horrible_title);
    stockChangeEmbed.setThumbnail("https://cdn.discordapp.com/attachments/516138714745929784/622610897587666944/ThunderFumpledump.png");
    stockChangeEmbed.setColor(color.crimson);
  }else if(posSum > negSum)
  {
    stockChangeEmbed.setTitle(response.stock_system_good_title);
    stockChangeEmbed.setThumbnail("https://cdn.discordapp.com/attachments/516138714745929784/622610898363613216/PartlyCloudyFumple.png");
    stockChangeEmbed.setColor(color.green);
  }else if(negSum > posSum)
  {
    stockChangeEmbed.setTitle(response.stock_system_bad_title);
    stockChangeEmbed.setThumbnail("https://cdn.discordapp.com/attachments/516138714745929784/622610896618782760/RainFumpledump.png");
    stockChangeEmbed.setColor(color.red);
  }

  let stockOneChange;
  let stockTwoChange;
  let stockThreeChange;
  let stockFourChange;
  let stockFiveChange;
  let stockSixChange;
  let stockSevenChange;
  let stockEightChange;

  if(stocks.Stock_One.Price == 5000)
  {
    stockChangeEmbed.addField(stocks.Stock_One.Name, response.stock_system_nochange_message.format(stocks.Stock_One.Abbreviation, stocks.Stock_One.Price));
  }else if(stocks.Stock_One.Price == 0)
  {
    stockChangeEmbed.addField(response.stock_num_title.format(stocks.Stock_One.Number), response.stock_purchasable.format(stocks.Stock_One.Number));
  }else if(stockOneEvent == 0 && stockOneNormalChange == 0)
  {
    stockChangeEmbed.addField(stocks.Stock_One.Name, response.stock_system_nochange_message.format(stocks.Stock_One.Abbreviation, stocks.Stock_One.Price));
  }else if(stockOnePosOrNeg == 1)
  {
    if(stockOneEvent > 5)
    {
      stockOneChange = stockOneEventChange1;

      stocks.Stock_One.Price += stockOneChange;

      if(stocks.Stock_One.Price > 5000)
      {
        stocks.Stock_One.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_One.Name, response.stock_system_change_good_message.format(stocks.Stock_One.Abbreviation, stocks.Stock_One.Price, stockOneChange));
      stockChangeEmbed.addField(response.stock_system_event_good_1_title, response.stock_system_event_good_1_message.format(stocks.Stock_One.Name));
    }else if(stockOneEvent > 1)
    {
      stockOneChange = stockOneEventChange2;

      stocks.Stock_One.Price += stockOneChange;

      if(stocks.Stock_One.Price > 5000)
      {
        stocks.Stock_One.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_One.Name, response.stock_system_change_good_message.format(stocks.Stock_One.Abbreviation, stocks.Stock_One.Price, stockOneChange));
      stockChangeEmbed.addField(response.stock_system_event_good_2_title, response.stock_system_event_good_2_message.format(stocks.Stock_One.Name));
    }else if(stockOneEvent == 1)
    {
      stockOneChange = stockOneEventChange3;

      stocks.Stock_One.Price += stockOneChange;

      if(stocks.Stock_One.Price > 5000)
      {
        stocks.Stock_One.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_One.Name, response.stock_system_change_good_message.format(stocks.Stock_One.Abbreviation, stocks.Stock_One.Price, stockOneChange));
      stockChangeEmbed.addField(response.stock_system_event_good_3_title, response.stock_system_event_good_3_message.format(stocks.Stock_One.Name));
    }else
    {
      if(stockOneNormalChange == 0)
      {
        stockChangeEmbed.addField(stocks.Stock_One.Name, response.stock_system_nochange_message.format(stocks.Stock_One.Abbreviation, stocks.Stock_One.Price));
      }else
      {
        stockOneChange = stockOneNormalChange;

        stocks.Stock_One.Price += stockOneChange;

        if(stocks.Stock_One.Price > 5000)
        {
stocks.Stock_One.Price = 5000
stocks.Legendary_Stocks.push(stocks.Stock_One.Name);

          stocks.Legendary_Stocks.push(stocks.Stock_One.Name);
        }

        stockChangeEmbed.addField(stocks.Stock_One.Name, response.stock_system_change_good_message.format(stocks.Stock_One.Abbreviation, stocks.Stock_One.Price, stockOneChange));
      }
    }
  }else{
    if(stockOneEvent > 5)
    {
      stockOneChange = stockOneEventChange1;

      stocks.Stock_One.Price -= stockOneChange;

      stockChangeEmbed.addField(stocks.Stock_One.Name, response.stock_system_change_bad_message.format(stocks.Stock_One.Abbreviation, stocks.Stock_One.Price, stockOneChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_1_title, response.stock_system_event_bad_1_message.format(stocks.Stock_One.Name));

      if(stocks.Stock_One.Price <= 0)
      {
        stocks.Stock_One.Price = 0;
        for (x in users)
        {
          if(!mystocks[x]){
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
          }
          mystocks[users[x].Id].Stocks_One_Amount = 0;
        }


        let stock1DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_One.Owner_Name), bot.fetchUser(stocks.Stock_One.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_One.Name), response.stock_death_message.format(stocks.Stock_One.Name, stocks.Stock_One.Abbreviation, stocks.Stock_One.Owner_Name, stocks.Stock_One.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock1DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_One.Name);

        stocks.Stock_One.Name = "None";
        stocks.Stock_One.Abbreviation = "None";
        stocks.Stock_One.Info = "None";
        stocks.Stock_One.Image = "None";
        stocks.Stock_One.Owner_Name = "None";
        stocks.Stock_One.Owner_Id = "None";
      }
    }else if(stockOneEvent > 1)
    {
      stockOneChange = stockOneEventChange2;

      stocks.Stock_One.Price -= stockOneChange;

      stockChangeEmbed.addField(stocks.Stock_One.Name, response.stock_system_change_bad_message.format(stocks.Stock_One.Abbreviation, stocks.Stock_One.Price, stockOneChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_2_title, response.stock_system_event_bad_2_message.format(stocks.Stock_One.Name));

      if(stocks.Stock_One.Price <= 0)
      {
        stocks.Stock_One.Price = 0;
        for (x in users)
        {
          if(!mystocks[x]){
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
          }
          mystocks[users[x].Id].Stocks_One_Amount = 0;
        }


        let stock1DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_One.Owner_Name), bot.fetchUser(stocks.Stock_One.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_One.Name), response.stock_death_message.format(stocks.Stock_One.Name, stocks.Stock_One.Abbreviation, stocks.Stock_One.Owner_Name, stocks.Stock_One.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock1DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_One.Name);

        stocks.Stock_One.Name = "None";
        stocks.Stock_One.Abbreviation = "None";
        stocks.Stock_One.Info = "None";
        stocks.Stock_One.Image = "None";
        stocks.Stock_One.Owner_Name = "None";
        stocks.Stock_One.Owner_Id = "None";
      }
    }else if(stockOneEvent == 1)
    {
      stockOneChange = stockOneEventChange3;

      stocks.Stock_One.Price -= stockOneChange;

      stockChangeEmbed.addField(stocks.Stock_One.Name, response.stock_system_change_bad_message.format(stocks.Stock_One.Abbreviation, stocks.Stock_One.Price, stockOneChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_3_title, response.stock_system_event_bad_3_message.format(stocks.Stock_One.Name));

      if(stocks.Stock_One.Price <= 0)
      {
        stocks.Stock_One.Price = 0;
        for (x in users)
        {
          if(!mystocks[x]){
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
          }
          mystocks[users[x].Id].Stocks_One_Amount = 0;
        }


        let stock1DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_One.Owner_Name), bot.fetchUser(stocks.Stock_One.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_One.Name), response.stock_death_message.format(stocks.Stock_One.Name, stocks.Stock_One.Abbreviation, stocks.Stock_One.Owner_Name, stocks.Stock_One.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock1DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_One.Name);

        stocks.Stock_One.Name = "None";
        stocks.Stock_One.Abbreviation = "None";
        stocks.Stock_One.Info = "None";
        stocks.Stock_One.Image = "None";
        stocks.Stock_One.Owner_Name = "None";
        stocks.Stock_One.Owner_Id = "None";
      }
    }else
    {
      stockOneChange = stockOneNormalChange;

      stocks.Stock_One.Price -= stockOneChange;

      stockChangeEmbed.addField(stocks.Stock_One.Name, response.stock_system_change_bad_message.format(stocks.Stock_One.Abbreviation, stocks.Stock_One.Price, stockOneChange));

      if(stocks.Stock_One.Price <= 0)
      {
        stocks.Stock_One.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_One_Amount = 0;
        }


        let stock1DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_One.Owner_Name), bot.fetchUser(stocks.Stock_One.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_One.Name), response.stock_death_message.format(stocks.Stock_One.Name, stocks.Stock_One.Abbreviation, stocks.Stock_One.Owner_Name, stocks.Stock_One.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock1DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_One.Name);

        stocks.Stock_One.Name = "None";
        stocks.Stock_One.Abbreviation = "None";
        stocks.Stock_One.Info = "None";
        stocks.Stock_One.Image = "None";
        stocks.Stock_One.Owner_Name = "None";
        stocks.Stock_One.Owner_Id = "None";
      }
    }
  }

  if(stocks.Stock_Two.Price == 5000)
  {
    stockChangeEmbed.addField(stocks.Stock_Two.Name, response.stock_system_nochange_message.format(stocks.Stock_Two.Abbreviation, stocks.Stock_Two.Price));
  }else if(stocks.Stock_Two.Price == 0)
  {
    stockChangeEmbed.addField(response.stock_num_title.format(stocks.Stock_Two.Number), response.stock_purchasable.format(stocks.Stock_Two.Number));
  }else if(stockTwoEvent == 0 && stockTwoNormalChange == 0)
  {
    stockChangeEmbed.addField(stocks.Stock_Two.Name, response.stock_system_nochange_message.format(stocks.Stock_Two.Abbreviation, stocks.Stock_Two.Price));
  }else if(stockTwoPosOrNeg == 1)
  {
    if(stockTwoEvent > 5)
    {
      stockTwoChange = stockTwoEventChange1;

      stocks.Stock_Two.Price += stockTwoChange;

      if(stocks.Stock_Two.Price > 5000)
      {
        stocks.Stock_Two.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Two.Name, response.stock_system_change_good_message.format(stocks.Stock_Two.Abbreviation, stocks.Stock_Two.Price, stockTwoChange));
      stockChangeEmbed.addField(response.stock_system_event_good_1_title, response.stock_system_event_good_1_message.format(stocks.Stock_Two.Name));
    }else if(stockTwoEvent > 1)
    {
      stockTwoChange = stockTwoEventChange2;

      stocks.Stock_Two.Price += stockTwoChange;

      if(stocks.Stock_Two.Price > 5000)
      {
        stocks.Stock_Two.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Two.Name, response.stock_system_change_good_message.format(stocks.Stock_Two.Abbreviation, stocks.Stock_Two.Price, stockTwoChange));
      stockChangeEmbed.addField(response.stock_system_event_good_2_title, response.stock_system_event_good_2_message.format(stocks.Stock_Two.Name));
    }else if(stockTwoEvent == 1)
    {
      stockTwoChange = stockTwoEventChange3;

      stocks.Stock_Two.Price += stockTwoChange;

      if(stocks.Stock_Two.Price > 5000)
      {
        stocks.Stock_Two.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Two.Name, response.stock_system_change_good_message.format(stocks.Stock_Two.Abbreviation, stocks.Stock_Two.Price, stockTwoChange));
      stockChangeEmbed.addField(response.stock_system_event_good_3_title, response.stock_system_event_good_3_message.format(stocks.Stock_Two.Name));
    }else
    {
      if(stockTwoNormalChange == 0)
      {
        stockChangeEmbed.addField(stocks.Stock_Two.Name, response.stock_system_nochange_message.format(stocks.Stock_Two.Abbreviation, stocks.Stock_Two.Price));
      }else
      {
        stockTwoChange = stockTwoNormalChange;

        stocks.Stock_Two.Price += stockTwoChange;

        if(stocks.Stock_Two.Price > 5000)
        {
stocks.Stock_Two.Price = 5000
stocks.Legendary_Stocks.push(stocks.Stock_Two.Name);

        }

        stockChangeEmbed.addField(stocks.Stock_Two.Name, response.stock_system_change_good_message.format(stocks.Stock_Two.Abbreviation, stocks.Stock_Two.Price, stockTwoChange));
      }
    }
  }else{
    if(stockTwoEvent > 5)
    {
      stockTwoChange = stockTwoEventChange1;

      stocks.Stock_Two.Price -= stockTwoChange;

      stockChangeEmbed.addField(stocks.Stock_Two.Name, response.stock_system_change_bad_message.format(stocks.Stock_Two.Abbreviation, stocks.Stock_Two.Price, stockTwoChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_1_title, response.stock_system_event_bad_1_message.format(stocks.Stock_Two.Name));

      if(stocks.Stock_Two.Price <= 0)
      {
        stocks.Stock_Two.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Two_Amount = 0;
        }


        let stock2DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Two.Owner_Name), bot.fetchUser(stocks.Stock_Two.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Two.Name), response.stock_death_message.format(stocks.Stock_Two.Name, stocks.Stock_Two.Abbreviation, stocks.Stock_Two.Owner_Name, stocks.Stock_Two.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock2DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Two.Name);

        stocks.Stock_Two.Name = "None";
        stocks.Stock_Two.Abbreviation = "None";
        stocks.Stock_Two.Info = "None";
        stocks.Stock_Two.Image = "None";
        stocks.Stock_Two.Owner_Name = "None";
        stocks.Stock_Two.Owner_Id = "None";
      }
    }else if(stockTwoEvent > 1)
    {
      stockTwoChange = stockTwoEventChange2;

      stocks.Stock_Two.Price -= stockTwoChange;

      stockChangeEmbed.addField(stocks.Stock_Two.Name, response.stock_system_change_bad_message.format(stocks.Stock_Two.Abbreviation, stocks.Stock_Two.Price, stockTwoChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_2_title, response.stock_system_event_bad_2_message.format(stocks.Stock_Two.Name));

      if(stocks.Stock_Two.Price <= 0)
      {
        stocks.Stock_Two.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Two_Amount = 0;
        }


        let stock2DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Two.Owner_Name), bot.fetchUser(stocks.Stock_Two.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Two.Name), response.stock_death_message.format(stocks.Stock_Two.Name, stocks.Stock_Two.Abbreviation, stocks.Stock_Two.Owner_Name, stocks.Stock_Two.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock2DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Two.Name);

        stocks.Stock_Two.Name = "None";
        stocks.Stock_Two.Abbreviation = "None";
        stocks.Stock_Two.Info = "None";
        stocks.Stock_Two.Image = "None";
        stocks.Stock_Two.Owner_Name = "None";
        stocks.Stock_Two.Owner_Id = "None";
      }
    }else if(stockTwoEvent == 1)
    {
      stockTwoChange = stockTwoEventChange3;

      stocks.Stock_Two.Price -= stockTwoChange;

      stockChangeEmbed.addField(stocks.Stock_Two.Name, response.stock_system_change_bad_message.format(stocks.Stock_Two.Abbreviation, stocks.Stock_Two.Price, stockTwoChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_3_title, response.stock_system_event_bad_3_message.format(stocks.Stock_Two.Name));

      if(stocks.Stock_Two.Price <= 0)
      {
        stocks.Stock_Two.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Two_Amount = 0;
        }


        let stock2DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Two.Owner_Name), bot.fetchUser(stocks.Stock_Two.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Two.Name), response.stock_death_message.format(stocks.Stock_Two.Name, stocks.Stock_Two.Abbreviation, stocks.Stock_Two.Owner_Name, stocks.Stock_Two.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock2DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Two.Name);

        stocks.Stock_Two.Name = "None";
        stocks.Stock_Two.Abbreviation = "None";
        stocks.Stock_Two.Info = "None";
        stocks.Stock_Two.Image = "None";
        stocks.Stock_Two.Owner_Name = "None";
        stocks.Stock_Two.Owner_Id = "None";
      }
    }else
    {
      stockTwoChange = stockTwoNormalChange;

      stocks.Stock_Two.Price -= stockTwoChange;

      stockChangeEmbed.addField(stocks.Stock_Two.Name, response.stock_system_change_bad_message.format(stocks.Stock_Two.Abbreviation, stocks.Stock_Two.Price, stockTwoChange));

      if(stocks.Stock_Two.Price <= 0)
      {
        stocks.Stock_Two.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Two_Amount = 0;
        }


        let stock2DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Two.Owner_Name), bot.fetchUser(stocks.Stock_Two.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Two.Name), response.stock_death_message.format(stocks.Stock_Two.Name, stocks.Stock_Two.Abbreviation, stocks.Stock_Two.Owner_Name, stocks.Stock_Two.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock2DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Two.Name);

        stocks.Stock_Two.Name = "None";
        stocks.Stock_Two.Abbreviation = "None";
        stocks.Stock_Two.Info = "None";
        stocks.Stock_Two.Image = "None";
        stocks.Stock_Two.Owner_Name = "None";
        stocks.Stock_Two.Owner_Id = "None";
      }
    }
  }

  if(stocks.Stock_Three.Price == 5000)
  {
    stockChangeEmbed.addField(stocks.Stock_Three.Name, response.stock_system_nochange_message.format(stocks.Stock_Three.Abbreviation, stocks.Stock_Three.Price));
  }else if(stocks.Stock_Three.Price == 0)
  {
    stockChangeEmbed.addField(response.stock_num_title.format(stocks.Stock_Three.Number), response.stock_purchasable.format(stocks.Stock_Three.Number));
  }else if(stockThreeEvent == 0 && stockThreeNormalChange == 0)
  {
    stockChangeEmbed.addField(stocks.Stock_Three.Name, response.stock_system_nochange_message.format(stocks.Stock_Three.Abbreviation, stocks.Stock_Three.Price));
  }else if(stockThreePosOrNeg == 1)
  {
    if(stockThreeEvent > 5)
    {
      stockThreeChange = stockThreeEventChange1;

      stocks.Stock_Three.Price += stockThreeChange;

      if(stocks.Stock_Three.Price > 5000)
      {
        stocks.Stock_Three.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Three.Name, response.stock_system_change_good_message.format(stocks.Stock_Three.Abbreviation, stocks.Stock_Three.Price, stockThreeChange));
      stockChangeEmbed.addField(response.stock_system_event_good_1_title, response.stock_system_event_good_1_message.format(stocks.Stock_Three.Name));
    }else if(stockThreeEvent > 1)
    {
      stockThreeChange = stockThreeEventChange2;

      stocks.Stock_Three.Price += stockThreeChange;

      if(stocks.Stock_Three.Price > 5000)
      {
        stocks.Stock_Three.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Three.Name, response.stock_system_change_good_message.format(stocks.Stock_Three.Abbreviation, stocks.Stock_Three.Price, stockThreeChange));
      stockChangeEmbed.addField(response.stock_system_event_good_2_title, response.stock_system_event_good_2_message.format(stocks.Stock_Three.Name));
    }else if(stockThreeEvent == 1)
    {
      stockThreeChange = stockThreeEventChange3;

      stocks.Stock_Three.Price += stockThreeChange;

      if(stocks.Stock_Three.Price > 5000)
      {
        stocks.Stock_Three.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Three.Name, response.stock_system_change_good_message.format(stocks.Stock_Three.Abbreviation, stocks.Stock_Three.Price, stockThreeChange));
      stockChangeEmbed.addField(response.stock_system_event_good_3_title, response.stock_system_event_good_3_message.format(stocks.Stock_Three.Name));
    }else
    {
      if(stockThreeNormalChange == 0)
      {
        stockChangeEmbed.addField(stocks.Stock_Three.Name, response.stock_system_nochange_message.format(stocks.Stock_Three.Abbreviation, stocks.Stock_Three.Price));
      }else
      {
        stockThreeChange = stockThreeNormalChange;

        stocks.Stock_Three.Price += stockThreeChange;

        if(stocks.Stock_Three.Price > 5000)
        {
stocks.Stock_Three.Price = 5000
stocks.Legendary_Stocks.push(stocks.Stock_Three.Name);

        }

        stockChangeEmbed.addField(stocks.Stock_Three.Name, response.stock_system_change_good_message.format(stocks.Stock_Three.Abbreviation, stocks.Stock_Three.Price, stockThreeChange));
      }
    }
  }else{
    if(stockThreeEvent > 5)
    {
      stockThreeChange = stockThreeEventChange1;

      stocks.Stock_Three.Price -= stockThreeChange;

      stockChangeEmbed.addField(stocks.Stock_Three.Name, response.stock_system_change_bad_message.format(stocks.Stock_Three.Abbreviation, stocks.Stock_Three.Price, stockThreeChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_1_title, response.stock_system_event_bad_1_message.format(stocks.Stock_Three.Name));

      if(stocks.Stock_Three.Price <= 0)
      {
        stocks.Stock_Three.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Three_Amount = 0;
        }


        let stock3DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Three.Owner_Name), bot.fetchUser(stocks.Stock_Three.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Three.Name), response.stock_death_message.format(stocks.Stock_Three.Name, stocks.Stock_Three.Abbreviation, stocks.Stock_Three.Owner_Name, stocks.Stock_Three.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock3DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Three.Name);

        stocks.Stock_Three.Name = "None";
        stocks.Stock_Three.Abbreviation = "None";
        stocks.Stock_Three.Info = "None";
        stocks.Stock_Three.Image = "None";
        stocks.Stock_Three.Owner_Name = "None";
        stocks.Stock_Three.Owner_Id = "None";
      }
    }else if(stockThreeEvent > 1)
    {
      stockThreeChange = stockThreeEventChange2;

      stocks.Stock_Three.Price -= stockThreeChange;

      stockChangeEmbed.addField(stocks.Stock_Three.Name, response.stock_system_change_bad_message.format(stocks.Stock_Three.Abbreviation, stocks.Stock_Three.Price, stockThreeChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_2_title, response.stock_system_event_bad_2_message.format(stocks.Stock_Three.Name));

      if(stocks.Stock_Three.Price <= 0)
      {
        stocks.Stock_Three.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Three_Amount = 0;
        }


        let stock3DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Three.Owner_Name), bot.fetchUser(stocks.Stock_Three.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Three.Name), response.stock_death_message.format(stocks.Stock_Three.Name, stocks.Stock_Three.Abbreviation, stocks.Stock_Three.Owner_Name, stocks.Stock_Three.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock3DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Three.Name);

        stocks.Stock_Three.Name = "None";
        stocks.Stock_Three.Abbreviation = "None";
        stocks.Stock_Three.Info = "None";
        stocks.Stock_Three.Image = "None";
        stocks.Stock_Three.Owner_Name = "None";
        stocks.Stock_Three.Owner_Id = "None";
      }
    }else if(stockThreeEvent == 1)
    {
      stockThreeChange = stockThreeEventChange3;

      stocks.Stock_Three.Price -= stockThreeChange;

      stockChangeEmbed.addField(stocks.Stock_Three.Name, response.stock_system_change_bad_message.format(stocks.Stock_Three.Abbreviation, stocks.Stock_Three.Price, stockThreeChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_3_title, response.stock_system_event_bad_3_message.format(stocks.Stock_Three.Name));

      if(stocks.Stock_Three.Price <= 0)
      {
        stocks.Stock_Three.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Three_Amount = 0;
        }


        let stock3DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Three.Owner_Name), bot.fetchUser(stocks.Stock_Three.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Three.Name), response.stock_death_message.format(stocks.Stock_Three.Name, stocks.Stock_Three.Abbreviation, stocks.Stock_Three.Owner_Name, stocks.Stock_Three.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock3DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Three.Name);

        stocks.Stock_Three.Name = "None";
        stocks.Stock_Three.Abbreviation = "None";
        stocks.Stock_Three.Info = "None";
        stocks.Stock_Three.Image = "None";
        stocks.Stock_Three.Owner_Name = "None";
        stocks.Stock_Three.Owner_Id = "None";
      }
    }else
    {
      stockThreeChange = stockThreeNormalChange;

      stocks.Stock_Three.Price -= stockThreeChange;

      stockChangeEmbed.addField(stocks.Stock_Three.Name, response.stock_system_change_bad_message.format(stocks.Stock_Three.Abbreviation, stocks.Stock_Three.Price, stockThreeChange));

      if(stocks.Stock_Three.Price <= 0)
      {
        stocks.Stock_Three.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Three_Amount = 0;
        }


        let stock3DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Three.Owner_Name), bot.fetchUser(stocks.Stock_Three.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Three.Name), response.stock_death_message.format(stocks.Stock_Three.Name, stocks.Stock_Three.Abbreviation, stocks.Stock_Three.Owner_Name, stocks.Stock_Three.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock3DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Three.Name);

        stocks.Stock_Three.Name = "None";
        stocks.Stock_Three.Abbreviation = "None";
        stocks.Stock_Three.Info = "None";
        stocks.Stock_Three.Image = "None";
        stocks.Stock_Three.Owner_Name = "None";
        stocks.Stock_Three.Owner_Id = "None";
      }
    }
  }

  if(stocks.Stock_Four.Price == 5000)
  {
    stockChangeEmbed.addField(stocks.Stock_Four.Name, response.stock_system_nochange_message.format(stocks.Stock_Four.Abbreviation, stocks.Stock_Four.Price));
  }else if(stocks.Stock_Four.Price == 0)
  {
    stockChangeEmbed.addField(response.stock_num_title.format(stocks.Stock_Four.Number), response.stock_purchasable.format(stocks.Stock_Four.Number));
  }else if(stockFourEvent == 0 && stockFourNormalChange == 0)
  {
    stockChangeEmbed.addField(stocks.Stock_Four.Name, response.stock_system_nochange_message.format(stocks.Stock_Four.Abbreviation, stocks.Stock_Four.Price));
  }else if(stockFourPosOrNeg == 1)
  {
    if(stockFourEvent > 5)
    {
      stockFourChange = stockFourEventChange1;

      stocks.Stock_Four.Price += stockFourChange;

      if(stocks.Stock_Four.Price > 5000)
      {
        stocks.Stock_Four.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Four.Name, response.stock_system_change_good_message.format(stocks.Stock_Four.Abbreviation, stocks.Stock_Four.Price, stockFourChange));
      stockChangeEmbed.addField(response.stock_system_event_good_1_title, response.stock_system_event_good_1_message.format(stocks.Stock_Four.Name));
    }else if(stockFourEvent > 1)
    {
      stockFourChange = stockFourEventChange2;

      stocks.Stock_Four.Price += stockFourChange;

      if(stocks.Stock_Four.Price > 5000)
      {
        stocks.Stock_Four.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Four.Name, response.stock_system_change_good_message.format(stocks.Stock_Four.Abbreviation, stocks.Stock_Four.Price, stockFourChange));
      stockChangeEmbed.addField(response.stock_system_event_good_2_title, response.stock_system_event_good_2_message.format(stocks.Stock_Four.Name));
    }else if(stockFourEvent == 1)
    {
      stockFourChange = stockFourEventChange3;

      stocks.Stock_Four.Price += stockFourChange;

      if(stocks.Stock_Four.Price > 5000)
      {
        stocks.Stock_Four.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Four.Name, response.stock_system_change_good_message.format(stocks.Stock_Four.Abbreviation, stocks.Stock_Four.Price, stockFourChange));
      stockChangeEmbed.addField(response.stock_system_event_good_3_title, response.stock_system_event_good_3_message.format(stocks.Stock_Four.Name));
    }else
    {
      if(stockFourNormalChange == 0)
      {
        stockChangeEmbed.addField(stocks.Stock_Four.Name, response.stock_system_nochange_message.format(stocks.Stock_Four.Abbreviation, stocks.Stock_Four.Price));
      }else
      {
        stockFourChange = stockFourNormalChange;

        stocks.Stock_Four.Price += stockFourChange;

        if(stocks.Stock_Four.Price > 5000)
        {
stocks.Stock_Four.Price = 5000
stocks.Legendary_Stocks.push(stocks.Stock_Four.Name);

        }

        stockChangeEmbed.addField(stocks.Stock_Four.Name, response.stock_system_change_good_message.format(stocks.Stock_Four.Abbreviation, stocks.Stock_Four.Price, stockFourChange));
      }
    }
  }else{
    if(stockFourEvent > 5)
    {
      stockFourChange = stockFourEventChange1;

      stocks.Stock_Four.Price -= stockFourChange;

      stockChangeEmbed.addField(stocks.Stock_Four.Name, response.stock_system_change_bad_message.format(stocks.Stock_Four.Abbreviation, stocks.Stock_Four.Price, stockFourChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_1_title, response.stock_system_event_bad_1_message.format(stocks.Stock_Four.Name));

      if(stocks.Stock_Four.Price <= 0)
      {
        stocks.Stock_Four.Price = 0;
        for (x in users)
        {
          if(!mystocks[x]){
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
          }
          mystocks[users[x].Id].Stocks_Four_Amount = 0;
        }


        let stock4DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Four.Owner_Name), bot.fetchUser(stocks.Stock_Four.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Four.Name), response.stock_death_message.format(stocks.Stock_Four.Name, stocks.Stock_Four.Abbreviation, stocks.Stock_Four.Owner_Name, stocks.Stock_Four.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock4DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Four.Name);

        stocks.Stock_Four.Name = "None";
        stocks.Stock_Four.Abbreviation = "None";
        stocks.Stock_Four.Info = "None";
        stocks.Stock_Four.Image = "None";
        stocks.Stock_Four.Owner_Name = "None";
        stocks.Stock_Four.Owner_Id = "None";
      }
    }else if(stockFourEvent > 1)
    {
      stockFourChange = stockFourEventChange2;

      stocks.Stock_Four.Price -= stockFourChange;

      stockChangeEmbed.addField(stocks.Stock_Four.Name, response.stock_system_change_bad_message.format(stocks.Stock_Four.Abbreviation, stocks.Stock_Four.Price, stockFourChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_2_title, response.stock_system_event_bad_2_message.format(stocks.Stock_Four.Name));

      if(stocks.Stock_Four.Price <= 0)
      {
        stocks.Stock_Four.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Four_Amount = 0;
        }


        let stock4DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Four.Owner_Name), bot.fetchUser(stocks.Stock_Four.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Four.Name), response.stock_death_message.format(stocks.Stock_Four.Name, stocks.Stock_Four.Abbreviation, stocks.Stock_Four.Owner_Name, stocks.Stock_Four.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock4DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Four.Name);

        stocks.Stock_Four.Name = "None";
        stocks.Stock_Four.Abbreviation = "None";
        stocks.Stock_Four.Info = "None";
        stocks.Stock_Four.Image = "None";
        stocks.Stock_Four.Owner_Name = "None";
        stocks.Stock_Four.Owner_Id = "None";
      }
    }else if(stockFourEvent == 1)
    {
      stockFourChange = stockFourEventChange3;

      stocks.Stock_Four.Price -= stockFourChange;

      stockChangeEmbed.addField(stocks.Stock_Four.Name, response.stock_system_change_bad_message.format(stocks.Stock_Four.Abbreviation, stocks.Stock_Four.Price, stockFourChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_3_title, response.stock_system_event_bad_3_message.format(stocks.Stock_Four.Name));

      if(stocks.Stock_Four.Price <= 0)
      {
        stocks.Stock_Four.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Four_Amount = 0;
        }


        let stock4DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Four.Owner_Name), bot.fetchUser(stocks.Stock_Four.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Four.Name), response.stock_death_message.format(stocks.Stock_Four.Name, stocks.Stock_Four.Abbreviation, stocks.Stock_Four.Owner_Name, stocks.Stock_Four.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock4DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Four.Name);

        stocks.Stock_Four.Name = "None";
        stocks.Stock_Four.Abbreviation = "None";
        stocks.Stock_Four.Info = "None";
        stocks.Stock_Four.Image = "None";
        stocks.Stock_Four.Owner_Name = "None";
        stocks.Stock_Four.Owner_Id = "None";
      }
    }else
    {
      stockFourChange = stockFourNormalChange;

      stocks.Stock_Four.Price -= stockFourChange;

      stockChangeEmbed.addField(stocks.Stock_Four.Name, response.stock_system_change_bad_message.format(stocks.Stock_Four.Abbreviation, stocks.Stock_Four.Price, stockFourChange));

      if(stocks.Stock_Four.Price <= 0)
      {
        stocks.Stock_Four.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Four_Amount = 0;
        }


        let stock4DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Four.Owner_Name), bot.fetchUser(stocks.Stock_Four.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Four.Name), response.stock_death_message.format(stocks.Stock_Four.Name, stocks.Stock_Four.Abbreviation, stocks.Stock_Four.Owner_Name, stocks.Stock_Four.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock4DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Four.Name);

        stocks.Stock_Four.Name = "None";
        stocks.Stock_Four.Abbreviation = "None";
        stocks.Stock_Four.Info = "None";
        stocks.Stock_Four.Image = "None";
        stocks.Stock_Four.Owner_Name = "None";
        stocks.Stock_Four.Owner_Id = "None";
      }
    }
  }

  if(stocks.Stock_Five.Price == 5000)
  {
    stockChangeEmbed.addField(stocks.Stock_Five.Name, response.stock_system_nochange_message.format(stocks.Stock_Five.Abbreviation, stocks.Stock_Five.Price));
  }else if(stocks.Stock_Five.Price == 0)
  {
    stockChangeEmbed.addField(response.stock_num_title.format(stocks.Stock_Five.Number), response.stock_purchasable.format(stocks.Stock_Five.Number));
  }else if(stockFiveEvent == 0 && stockFiveNormalChange == 0)
  {
    stockChangeEmbed.addField(stocks.Stock_Five.Name, response.stock_system_nochange_message.format(stocks.Stock_Five.Abbreviation, stocks.Stock_Five.Price));
  }else if(stockFivePosOrNeg == 1)
  {
    if(stockFiveEvent > 5)
    {
      stockFiveChange = stockFiveEventChange1;

      stocks.Stock_Five.Price += stockFiveChange;

      if(stocks.Stock_Five.Price > 5000)
      {
        stocks.Stock_Five.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Five.Name, response.stock_system_change_good_message.format(stocks.Stock_Five.Abbreviation, stocks.Stock_Five.Price, stockFiveChange));
      stockChangeEmbed.addField(response.stock_system_event_good_1_title, response.stock_system_event_good_1_message.format(stocks.Stock_Five.Name));
    }else if(stockFiveEvent > 1)
    {
      stockFiveChange = stockFiveEventChange2;

      stocks.Stock_Five.Price += stockFiveChange;

      if(stocks.Stock_Five.Price > 5000)
      {
        stocks.Stock_Five.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Five.Name, response.stock_system_change_good_message.format(stocks.Stock_Five.Abbreviation, stocks.Stock_Five.Price, stockFiveChange));
      stockChangeEmbed.addField(response.stock_system_event_good_2_title, response.stock_system_event_good_2_message.format(stocks.Stock_Five.Name));
    }else if(stockFiveEvent == 1)
    {
      stockFiveChange = stockFiveEventChange3;

      stocks.Stock_Five.Price += stockFiveChange;

      if(stocks.Stock_Five.Price > 5000)
      {
        stocks.Stock_Five.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Five.Name, response.stock_system_change_good_message.format(stocks.Stock_Five.Abbreviation, stocks.Stock_Five.Price, stockFiveChange));
      stockChangeEmbed.addField(response.stock_system_event_good_3_title, response.stock_system_event_good_3_message.format(stocks.Stock_Five.Name));
    }else
    {
      if(stockFiveNormalChange == 0)
      {
        stockChangeEmbed.addField(stocks.Stock_Five.Name, response.stock_system_nochange_message.format(stocks.Stock_Five.Abbreviation, stocks.Stock_Five.Price));
      }else
      {
        stockFiveChange = stockFiveNormalChange;

        stocks.Stock_Five.Price += stockFiveChange;

        if(stocks.Stock_Five.Price > 5000)
        {
stocks.Stock_Five.Price = 5000
stocks.Legendary_Stocks.push(stocks.Stock_Five.Name);

        }

        stockChangeEmbed.addField(stocks.Stock_Five.Name, response.stock_system_change_good_message.format(stocks.Stock_Five.Abbreviation, stocks.Stock_Five.Price, stockFiveChange));
      }
    }
  }else{
    if(stockFiveEvent > 5)
    {
      stockFiveChange = stockFiveEventChange1;

      stocks.Stock_Five.Price -= stockFiveChange;

      stockChangeEmbed.addField(stocks.Stock_Five.Name, response.stock_system_change_bad_message.format(stocks.Stock_Five.Abbreviation, stocks.Stock_Five.Price, stockFiveChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_1_title, response.stock_system_event_bad_1_message.format(stocks.Stock_Five.Name));

      if(stocks.Stock_Five.Price <= 0)
      {
        stocks.Stock_Five.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Five_Amount = 0;
        }


        let stock5DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Five.Owner_Name), bot.fetchUser(stocks.Stock_Five.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Five.Name), response.stock_death_message.format(stocks.Stock_Five.Name, stocks.Stock_Five.Abbreviation, stocks.Stock_Five.Owner_Name, stocks.Stock_Five.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock5DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Five.Name);

        stocks.Stock_Five.Name = "None";
        stocks.Stock_Five.Abbreviation = "None";
        stocks.Stock_Five.Info = "None";
        stocks.Stock_Five.Image = "None";
        stocks.Stock_Five.Owner_Name = "None";
        stocks.Stock_Five.Owner_Id = "None";
      }
    }else if(stockFiveEvent > 1)
    {
      stockFiveChange = stockFiveEventChange2;

      stocks.Stock_Five.Price -= stockFiveChange;

      stockChangeEmbed.addField(stocks.Stock_Five.Name, response.stock_system_change_bad_message.format(stocks.Stock_Five.Abbreviation, stocks.Stock_Five.Price, stockFiveChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_2_title, response.stock_system_event_bad_2_message.format(stocks.Stock_Five.Name));

      if(stocks.Stock_Five.Price <= 0)
      {
        stocks.Stock_Five.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Five_Amount = 0;
        }


        let stock5DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Five.Owner_Name), bot.fetchUser(stocks.Stock_Five.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Five.Name), response.stock_death_message.format(stocks.Stock_Five.Name, stocks.Stock_Five.Abbreviation, stocks.Stock_Five.Owner_Name, stocks.Stock_Five.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock5DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Five.Name);

        stocks.Stock_Five.Name = "None";
        stocks.Stock_Five.Abbreviation = "None";
        stocks.Stock_Five.Info = "None";
        stocks.Stock_Five.Image = "None";
        stocks.Stock_Five.Owner_Name = "None";
        stocks.Stock_Five.Owner_Id = "None";
      }
    }else if(stockFiveEvent == 1)
    {
      stockFiveChange = stockFiveEventChange3;

      stocks.Stock_Five.Price -= stockFiveChange;

      stockChangeEmbed.addField(stocks.Stock_Five.Name, response.stock_system_change_bad_message.format(stocks.Stock_Five.Abbreviation, stocks.Stock_Five.Price, stockFiveChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_3_title, response.stock_system_event_bad_3_message.format(stocks.Stock_Five.Name));

      if(stocks.Stock_Five.Price <= 0)
      {
        stocks.Stock_Five.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Five_Amount = 0;
        }


        let stock5DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Five.Owner_Name), bot.fetchUser(stocks.Stock_Five.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Five.Name), response.stock_death_message.format(stocks.Stock_Five.Name, stocks.Stock_Five.Abbreviation, stocks.Stock_Five.Owner_Name, stocks.Stock_Five.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock5DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Five.Name);

        stocks.Stock_Five.Name = "None";
        stocks.Stock_Five.Abbreviation = "None";
        stocks.Stock_Five.Info = "None";
        stocks.Stock_Five.Image = "None";
        stocks.Stock_Five.Owner_Name = "None";
        stocks.Stock_Five.Owner_Id = "None";
      }
    }else
    {
      stockFiveChange = stockFiveNormalChange;

      stocks.Stock_Five.Price -= stockFiveChange;

      stockChangeEmbed.addField(stocks.Stock_Five.Name, response.stock_system_change_bad_message.format(stocks.Stock_Five.Abbreviation, stocks.Stock_Five.Price, stockFiveChange));

      if(stocks.Stock_Five.Price <= 0)
      {
        stocks.Stock_Five.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Five_Amount = 0;
        }


        let stock5DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Five.Owner_Name), bot.fetchUser(stocks.Stock_Five.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Five.Name), response.stock_death_message.format(stocks.Stock_Five.Name, stocks.Stock_Five.Abbreviation, stocks.Stock_Five.Owner_Name, stocks.Stock_Five.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock5DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Five.Name);

        stocks.Stock_Five.Name = "None";
        stocks.Stock_Five.Abbreviation = "None";
        stocks.Stock_Five.Info = "None";
        stocks.Stock_Five.Image = "None";
        stocks.Stock_Five.Owner_Name = "None";
        stocks.Stock_Five.Owner_Id = "None";
      }
    }
  }

  if(stocks.Stock_Six.Price == 5000)
  {
    stockChangeEmbed.addField(stocks.Stock_Six.Name, response.stock_system_nochange_message.format(stocks.Stock_Six.Abbreviation, stocks.Stock_Six.Price));
  }else if(stocks.Stock_Six.Price == 0)
  {
    stockChangeEmbed.addField(response.stock_num_title.format(stocks.Stock_Six.Number), response.stock_purchasable.format(stocks.Stock_Six.Number));
  }else if(stockSixEvent == 0 && stockSixNormalChange == 0)
  {
    stockChangeEmbed.addField(stocks.Stock_Six.Name, response.stock_system_nochange_message.format(stocks.Stock_Six.Abbreviation, stocks.Stock_Six.Price));
  }else if(stockSixPosOrNeg == 1)
  {
    if(stockSixEvent > 5)
    {
      stockSixChange = stockSixEventChange1;

      stocks.Stock_Six.Price += stockSixChange;

      if(stocks.Stock_Six.Price > 5000)
      {
        stocks.Stock_Six.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Six.Name, response.stock_system_change_good_message.format(stocks.Stock_Six.Abbreviation, stocks.Stock_Six.Price, stockSixChange));
      stockChangeEmbed.addField(response.stock_system_event_good_1_title, response.stock_system_event_good_1_message.format(stocks.Stock_Six.Name));
    }else if(stockSixEvent > 1)
    {
      stockSixChange = stockSixEventChange2;

      stocks.Stock_Six.Price += stockSixChange;

      if(stocks.Stock_Six.Price > 5000)
      {
        stocks.Stock_Six.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Six.Name, response.stock_system_change_good_message.format(stocks.Stock_Six.Abbreviation, stocks.Stock_Six.Price, stockSixChange));
      stockChangeEmbed.addField(response.stock_system_event_good_2_title, response.stock_system_event_good_2_message.format(stocks.Stock_Six.Name));
    }else if(stockSixEvent == 1)
    {
      stockSixChange = stockSixEventChange3;

      stocks.Stock_Six.Price += stockSixChange;

      if(stocks.Stock_Six.Price > 5000)
      {
        stocks.Stock_Six.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Six.Name, response.stock_system_change_good_message.format(stocks.Stock_Six.Abbreviation, stocks.Stock_Six.Price, stockSixChange));
      stockChangeEmbed.addField(response.stock_system_event_good_3_title, response.stock_system_event_good_3_message.format(stocks.Stock_Six.Name));
    }else
    {
      if(stockSixNormalChange == 0)
      {
        stockChangeEmbed.addField(stocks.Stock_Six.Name, response.stock_system_nochange_message.format(stocks.Stock_Six.Abbreviation, stocks.Stock_Six.Price));
      }else
      {
        stockSixChange = stockSixNormalChange;

        stocks.Stock_Six.Price += stockSixChange;

        if(stocks.Stock_Six.Price > 5000)
        {
stocks.Stock_Six.Price = 5000
stocks.Legendary_Stocks.push(stocks.Stock_Six.Name);

        }

        stockChangeEmbed.addField(stocks.Stock_Six.Name, response.stock_system_change_good_message.format(stocks.Stock_Six.Abbreviation, stocks.Stock_Six.Price, stockSixChange));
      }
    }
  }else{
    if(stockSixEvent > 5)
    {
      stockSixChange = stockSixEventChange1;

      stocks.Stock_Six.Price -= stockSixChange;

      stockChangeEmbed.addField(stocks.Stock_Six.Name, response.stock_system_change_bad_message.format(stocks.Stock_Six.Abbreviation, stocks.Stock_Six.Price, stockSixChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_1_title, response.stock_system_event_bad_1_message.format(stocks.Stock_Six.Name));

      if(stocks.Stock_Six.Price <= 0)
      {
        stocks.Stock_Six.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Six_Amount = 0;
        }


        let stock6DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Six.Owner_Name), bot.fetchUser(stocks.Stock_Six.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Six.Name), response.stock_death_message.format(stocks.Stock_Six.Name, stocks.Stock_Six.Abbreviation, stocks.Stock_Six.Owner_Name, stocks.Stock_Six.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock6DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Six.Name);

        stocks.Stock_Six.Name = "None";
        stocks.Stock_Six.Abbreviation = "None";
        stocks.Stock_Six.Info = "None";
        stocks.Stock_Six.Image = "None";
        stocks.Stock_Six.Owner_Name = "None";
        stocks.Stock_Six.Owner_Id = "None";
      }
    }else if(stockSixEvent > 1)
    {
      stockSixChange = stockSixEventChange2;

      stocks.Stock_Six.Price -= stockSixChange;

      stockChangeEmbed.addField(stocks.Stock_Six.Name, response.stock_system_change_bad_message.format(stocks.Stock_Six.Abbreviation, stocks.Stock_Six.Price, stockSixChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_2_title, response.stock_system_event_bad_2_message.format(stocks.Stock_Six.Name));

      if(stocks.Stock_Six.Price <= 0)
      {
        stocks.Stock_Six.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Six_Amount = 0;
        }


        let stock6DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Six.Owner_Name), bot.fetchUser(stocks.Stock_Six.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Six.Name), response.stock_death_message.format(stocks.Stock_Six.Name, stocks.Stock_Six.Abbreviation, stocks.Stock_Six.Owner_Name, stocks.Stock_Six.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock6DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Six.Name);

        stocks.Stock_Six.Name = "None";
        stocks.Stock_Six.Abbreviation = "None";
        stocks.Stock_Six.Info = "None";
        stocks.Stock_Six.Image = "None";
        stocks.Stock_Six.Owner_Name = "None";
        stocks.Stock_Six.Owner_Id = "None";
      }
    }else if(stockSixEvent == 1)
    {
      stockSixChange = stockSixEventChange3;

      stocks.Stock_Six.Price -= stockSixChange;

      stockChangeEmbed.addField(stocks.Stock_Six.Name, response.stock_system_change_bad_message.format(stocks.Stock_Six.Abbreviation, stocks.Stock_Six.Price, stockSixChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_3_title, response.stock_system_event_bad_3_message.format(stocks.Stock_Six.Name));

      if(stocks.Stock_Six.Price <= 0)
      {
        stocks.Stock_Six.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Six_Amount = 0;
        }


        let stock6DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Six.Owner_Name), bot.fetchUser(stocks.Stock_Six.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Six.Name), response.stock_death_message.format(stocks.Stock_Six.Name, stocks.Stock_Six.Abbreviation, stocks.Stock_Six.Owner_Name, stocks.Stock_Six.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock6DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Six.Name);

        stocks.Stock_Six.Name = "None";
        stocks.Stock_Six.Abbreviation = "None";
        stocks.Stock_Six.Info = "None";
        stocks.Stock_Six.Image = "None";
        stocks.Stock_Six.Owner_Name = "None";
        stocks.Stock_Six.Owner_Id = "None";
      }
    }else
    {
      stockSixChange = stockSixNormalChange;

      stocks.Stock_Six.Price -= stockSixChange;

      stockChangeEmbed.addField(stocks.Stock_Six.Name, response.stock_system_change_bad_message.format(stocks.Stock_Six.Abbreviation, stocks.Stock_Six.Price, stockSixChange));

      if(stocks.Stock_Six.Price <= 0)
      {
        stocks.Stock_Six.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Six_Amount = 0;
        }


        let stock6DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Six.Owner_Name), bot.fetchUser(stocks.Stock_Six.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Six.Name), response.stock_death_message.format(stocks.Stock_Six.Name, stocks.Stock_Six.Abbreviation, stocks.Stock_Six.Owner_Name, stocks.Stock_Six.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock6DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Six.Name);

        stocks.Stock_Six.Name = "None";
        stocks.Stock_Six.Abbreviation = "None";
        stocks.Stock_Six.Info = "None";
        stocks.Stock_Six.Image = "None";
        stocks.Stock_Six.Owner_Name = "None";
        stocks.Stock_Six.Owner_Id = "None";
      }
    }
  }

  if(stocks.Stock_Seven.Price == 5000)
  {
    stockChangeEmbed.addField(stocks.Stock_Seven.Name, response.stock_system_nochange_message.format(stocks.Stock_Seven.Abbreviation, stocks.Stock_Seven.Price));
  }else if(stocks.Stock_Seven.Price == 0)
  {
    stockChangeEmbed.addField(response.stock_num_title.format(stocks.Stock_Seven.Number), response.stock_purchasable.format(stocks.Stock_Seven.Number));
  }else if(stockSevenEvent == 0 && stockSevenNormalChange == 0)
  {
    stockChangeEmbed.addField(stocks.Stock_Seven.Name, response.stock_system_nochange_message.format(stocks.Stock_Seven.Abbreviation, stocks.Stock_Seven.Price));
  }else if(stockSevenPosOrNeg == 1)
  {
    if(stockSevenEvent > 5)
    {
      stockSevenChange = stockSevenEventChange1;

      stocks.Stock_Seven.Price += stockSevenChange;

      if(stocks.Stock_Seven.Price > 5000)
      {
        stocks.Stock_Seven.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Seven.Name, response.stock_system_change_good_message.format(stocks.Stock_Seven.Abbreviation, stocks.Stock_Seven.Price, stockSevenChange));
      stockChangeEmbed.addField(response.stock_system_event_good_1_title, response.stock_system_event_good_1_message.format(stocks.Stock_Seven.Name));
    }else if(stockSevenEvent > 1)
    {
      stockSevenChange = stockSevenEventChange2;

      stocks.Stock_Seven.Price += stockSevenChange;

      if(stocks.Stock_Seven.Price > 5000)
      {
        stocks.Stock_Seven.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Seven.Name, response.stock_system_change_good_message.format(stocks.Stock_Seven.Abbreviation, stocks.Stock_Seven.Price, stockSevenChange));
      stockChangeEmbed.addField(response.stock_system_event_good_2_title, response.stock_system_event_good_2_message.format(stocks.Stock_Seven.Name));
    }else if(stockSevenEvent == 1)
    {
      stockSevenChange = stockSevenEventChange3;

      stocks.Stock_Seven.Price += stockSevenChange;

      if(stocks.Stock_Seven.Price > 5000)
      {
        stocks.Stock_Seven.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Seven.Name, response.stock_system_change_good_message.format(stocks.Stock_Seven.Abbreviation, stocks.Stock_Seven.Price, stockSevenChange));
      stockChangeEmbed.addField(response.stock_system_event_good_3_title, response.stock_system_event_good_3_message.format(stocks.Stock_Seven.Name));
    }else
    {
      if(stockSevenNormalChange == 0)
      {
        stockChangeEmbed.addField(stocks.Stock_Seven.Name, response.stock_system_nochange_message.format(stocks.Stock_Seven.Abbreviation, stocks.Stock_Seven.Price));
      }else
      {
        stockSevenChange = stockSevenNormalChange;

        stocks.Stock_Seven.Price += stockSevenChange;

        if(stocks.Stock_Seven.Price > 5000)
        {
stocks.Stock_Seven.Price = 5000
stocks.Legendary_Stocks.push(stocks.Stock_Seven.Name);

        }

        stockChangeEmbed.addField(stocks.Stock_Seven.Name, response.stock_system_change_good_message.format(stocks.Stock_Seven.Abbreviation, stocks.Stock_Seven.Price, stockSevenChange));
      }
    }
  }else{
    if(stockSevenEvent > 5)
    {
      stockSevenChange = stockSevenEventChange1;

      stocks.Stock_Seven.Price -= stockSevenChange;

      stockChangeEmbed.addField(stocks.Stock_Seven.Name, response.stock_system_change_bad_message.format(stocks.Stock_Seven.Abbreviation, stocks.Stock_Seven.Price, stockSevenChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_1_title, response.stock_system_event_bad_1_message.format(stocks.Stock_Seven.Name));

      if(stocks.Stock_Seven.Price <= 0)
      {
        stocks.Stock_Seven.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Seven_Amount = 0;
        }


        let stock7DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Seven.Owner_Name), bot.fetchUser(stocks.Stock_Seven.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Seven.Name), response.stock_death_message.format(stocks.Stock_Seven.Name, stocks.Stock_Seven.Abbreviation, stocks.Stock_Seven.Owner_Name, stocks.Stock_Seven.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock7DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Seven.Name);

        stocks.Stock_Seven.Name = "None";
        stocks.Stock_Seven.Abbreviation = "None";
        stocks.Stock_Seven.Info = "None";
        stocks.Stock_Seven.Image = "None";
        stocks.Stock_Seven.Owner_Name = "None";
        stocks.Stock_Seven.Owner_Id = "None";
      }
    }else if(stockSevenEvent > 1)
    {
      stockSevenChange = stockSevenEventChange2;

      stocks.Stock_Seven.Price -= stockSevenChange;

      stockChangeEmbed.addField(stocks.Stock_Seven.Name, response.stock_system_change_bad_message.format(stocks.Stock_Seven.Abbreviation, stocks.Stock_Seven.Price, stockSevenChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_2_title, response.stock_system_event_bad_2_message.format(stocks.Stock_Seven.Name));

      if(stocks.Stock_Seven.Price <= 0)
      {
        stocks.Stock_Seven.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Seven_Amount = 0;
        }


        let stock7DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Seven.Owner_Name), bot.fetchUser(stocks.Stock_Seven.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Seven.Name), response.stock_death_message.format(stocks.Stock_Seven.Name, stocks.Stock_Seven.Abbreviation, stocks.Stock_Seven.Owner_Name, stocks.Stock_Seven.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock7DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Seven.Name);

        stocks.Stock_Seven.Name = "None";
        stocks.Stock_Seven.Abbreviation = "None";
        stocks.Stock_Seven.Info = "None";
        stocks.Stock_Seven.Image = "None";
        stocks.Stock_Seven.Owner_Name = "None";
        stocks.Stock_Seven.Owner_Id = "None";
      }
    }else if(stockSevenEvent == 1)
    {
      stockSevenChange = stockSevenEventChange3;

      stocks.Stock_Seven.Price -= stockSevenChange;

      stockChangeEmbed.addField(stocks.Stock_Seven.Name, response.stock_system_change_bad_message.format(stocks.Stock_Seven.Abbreviation, stocks.Stock_Seven.Price, stockSevenChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_3_title, response.stock_system_event_bad_3_message.format(stocks.Stock_Seven.Name));

      if(stocks.Stock_Seven.Price <= 0)
      {
        stocks.Stock_Seven.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Seven_Amount = 0;
        }


        let stock7DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Seven.Owner_Name), bot.fetchUser(stocks.Stock_Seven.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Seven.Name), response.stock_death_message.format(stocks.Stock_Seven.Name, stocks.Stock_Seven.Abbreviation, stocks.Stock_Seven.Owner_Name, stocks.Stock_Seven.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock7DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Seven.Name);

        stocks.Stock_Seven.Name = "None";
        stocks.Stock_Seven.Abbreviation = "None";
        stocks.Stock_Seven.Info = "None";
        stocks.Stock_Seven.Image = "None";
        stocks.Stock_Seven.Owner_Name = "None";
        stocks.Stock_Seven.Owner_Id = "None";
      }
    }else
    {
      stockSevenChange = stockSevenNormalChange;

      stocks.Stock_Seven.Price -= stockSevenChange;

      stockChangeEmbed.addField(stocks.Stock_Seven.Name, response.stock_system_change_bad_message.format(stocks.Stock_Seven.Abbreviation, stocks.Stock_Seven.Price, stockSevenChange));

      if(stocks.Stock_Seven.Price <= 0)
      {
        stocks.Stock_Seven.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Seven_Amount = 0;
        }


        let stock7DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Seven.Owner_Name), bot.fetchUser(stocks.Stock_Seven.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Seven.Name), response.stock_death_message.format(stocks.Stock_Seven.Name, stocks.Stock_Seven.Abbreviation, stocks.Stock_Seven.Owner_Name, stocks.Stock_Seven.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock7DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Seven.Name);

        stocks.Stock_Seven.Name = "None";
        stocks.Stock_Seven.Abbreviation = "None";
        stocks.Stock_Seven.Info = "None";
        stocks.Stock_Seven.Image = "None";
        stocks.Stock_Seven.Owner_Name = "None";
        stocks.Stock_Seven.Owner_Id = "None";
      }
    }
  }

  if(stocks.Stock_Eight.Price == 5000)
  {
    stockChangeEmbed.addField(stocks.Stock_Eight.Name, response.stock_system_nochange_message.format(stocks.Stock_Eight.Abbreviation, stocks.Stock_Eight.Price));
  }else if(stocks.Stock_Eight.Price == 0)
  {
    stockChangeEmbed.addField(response.stock_num_title.format(stocks.Stock_Eight.Number), response.stock_purchasable.format(stocks.Stock_Eight.Number));
  }else if(stockEightEvent == 0 && stockEightNormalChange == 0)
  {
    stockChangeEmbed.addField(stocks.Stock_Eight.Name, response.stock_system_nochange_message.format(stocks.Stock_Eight.Abbreviation, stocks.Stock_Eight.Price));
  }else if(stockEightPosOrNeg == 1)
  {
    if(stockEightEvent > 5)
    {
      stockEightChange = stockEightEventChange1;

      stocks.Stock_Eight.Price += stockEightChange;

      if(stocks.Stock_Eight.Price > 5000)
      {
        stocks.Stock_Eight.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Eight.Name, response.stock_system_change_good_message.format(stocks.Stock_Eight.Abbreviation, stocks.Stock_Eight.Price, stockEightChange));
      stockChangeEmbed.addField(response.stock_system_event_good_1_title, response.stock_system_event_good_1_message.format(stocks.Stock_Eight.Name));
    }else if(stockEightEvent > 1)
    {
      stockEightChange = stockEightEventChange2;

      stocks.Stock_Eight.Price += stockEightChange;

      if(stocks.Stock_Eight.Price > 5000)
      {
        stocks.Stock_Eight.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Eight.Name, response.stock_system_change_good_message.format(stocks.Stock_Eight.Abbreviation, stocks.Stock_Eight.Price, stockEightChange));
      stockChangeEmbed.addField(response.stock_system_event_good_2_title, response.stock_system_event_good_2_message.format(stocks.Stock_Eight.Name));
    }else if(stockEightEvent == 1)
    {
      stockEightChange = stockEightEventChange3;

      stocks.Stock_Eight.Price += stockEightChange;

      if(stocks.Stock_Eight.Price > 5000)
      {
        stocks.Stock_Eight.Price = 5000
      }

      stockChangeEmbed.addField(stocks.Stock_Eight.Name, response.stock_system_change_good_message.format(stocks.Stock_Eight.Abbreviation, stocks.Stock_Eight.Price, stockEightChange));
      stockChangeEmbed.addField(response.stock_system_event_good_3_title, response.stock_system_event_good_3_message.format(stocks.Stock_Eight.Name));
    }else
    {
      if(stockEightNormalChange == 0)
      {
        stockChangeEmbed.addField(stocks.Stock_Eight.Name, response.stock_system_nochange_message.format(stocks.Stock_Eight.Abbreviation, stocks.Stock_Eight.Price));
      }else
      {
        stockEightChange = stockEightNormalChange;

        stocks.Stock_Eight.Price += stockEightChange;

        if(stocks.Stock_Eight.Price > 5000)
        {
stocks.Stock_Eight.Price = 5000
stocks.Legendary_Stocks.push(stocks.Stock_Eight.Name);

        }

        stockChangeEmbed.addField(stocks.Stock_Eight.Name, response.stock_system_change_good_message.format(stocks.Stock_Eight.Abbreviation, stocks.Stock_Eight.Price, stockEightChange));
      }
    }
  }else{
    if(stockEightEvent > 5)
    {
      stockEightChange = stockEightEventChange1;

      stocks.Stock_Eight.Price -= stockEightChange;

      stockChangeEmbed.addField(stocks.Stock_Eight.Name, response.stock_system_change_bad_message.format(stocks.Stock_Eight.Abbreviation, stocks.Stock_Eight.Price, stockEightChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_1_title, response.stock_system_event_bad_1_message.format(stocks.Stock_Eight.Name));

      if(stocks.Stock_Eight.Price <= 0)
      {
        stocks.Stock_Eight.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Eight_Amount = 0;
        }


        let stock8DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Eight.Owner_Name), bot.fetchUser(stocks.Stock_Eight.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Eight.Name), response.stock_death_message.format(stocks.Stock_Eight.Name, stocks.Stock_Eight.Abbreviation, stocks.Stock_Eight.Owner_Name, stocks.Stock_Eight.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock8DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Eight.Name);

        stocks.Stock_Eight.Name = "None";
        stocks.Stock_Eight.Abbreviation = "None";
        stocks.Stock_Eight.Info = "None";
        stocks.Stock_Eight.Image = "None";
        stocks.Stock_Eight.Owner_Name = "None";
        stocks.Stock_Eight.Owner_Id = "None";
      }
    }else if(stockEightEvent > 1)
    {
      stockEightChange = stockEightEventChange2;

      stocks.Stock_Eight.Price -= stockEightChange;

      stockChangeEmbed.addField(stocks.Stock_Eight.Name, response.stock_system_change_bad_message.format(stocks.Stock_Eight.Abbreviation, stocks.Stock_Eight.Price, stockEightChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_2_title, response.stock_system_event_bad_2_message.format(stocks.Stock_Eight.Name));

      if(stocks.Stock_Eight.Price <= 0)
      {
        stocks.Stock_Eight.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Eight_Amount = 0;
        }


        let stock8DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Eight.Owner_Name), bot.fetchUser(stocks.Stock_Eight.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Eight.Name), response.stock_death_message.format(stocks.Stock_Eight.Name, stocks.Stock_Eight.Abbreviation, stocks.Stock_Eight.Owner_Name, stocks.Stock_Eight.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock8DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Eight.Name);

        stocks.Stock_Eight.Name = "None";
        stocks.Stock_Eight.Abbreviation = "None";
        stocks.Stock_Eight.Info = "None";
        stocks.Stock_Eight.Image = "None";
        stocks.Stock_Eight.Owner_Name = "None";
        stocks.Stock_Eight.Owner_Id = "None";
      }
    }else if(stockEightEvent == 1)
    {
      stockEightChange = stockEightEventChange3;

      stocks.Stock_Eight.Price -= stockEightChange;

      stockChangeEmbed.addField(stocks.Stock_Eight.Name, response.stock_system_change_bad_message.format(stocks.Stock_Eight.Abbreviation, stocks.Stock_Eight.Price, stockEightChange));
      stockChangeEmbed.addField(response.stock_system_event_bad_3_title, response.stock_system_event_bad_3_message.format(stocks.Stock_Eight.Name));

      if(stocks.Stock_Eight.Price <= 0)
      {
        stocks.Stock_Eight.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Eight_Amount = 0;
        }


        let stock8DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Eight.Owner_Name), bot.fetchUser(stocks.Stock_Eight.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Eight.Name), response.stock_death_message.format(stocks.Stock_Eight.Name, stocks.Stock_Eight.Abbreviation, stocks.Stock_Eight.Owner_Name, stocks.Stock_Eight.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock8DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Eight.Name);

        stocks.Stock_Eight.Name = "None";
        stocks.Stock_Eight.Abbreviation = "None";
        stocks.Stock_Eight.Info = "None";
        stocks.Stock_Eight.Image = "None";
        stocks.Stock_Eight.Owner_Name = "None";
        stocks.Stock_Eight.Owner_Id = "None";
      }
    }else
    {
      stockEightChange = stockEightNormalChange;

      stocks.Stock_Eight.Price -= stockEightChange;

      stockChangeEmbed.addField(stocks.Stock_Eight.Name, response.stock_system_change_bad_message.format(stocks.Stock_Eight.Abbreviation, stocks.Stock_Eight.Price, stockEightChange));

      if(stocks.Stock_Eight.Price <= 0)
      {
        stocks.Stock_Eight.Price = 0;
        for (x in users)
        {
if(!mystocks[x]){
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
}
mystocks[users[x].Id].Stocks_Eight_Amount = 0;
        }


        let stock8DeathEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_death_author.format(stocks.Stock_Eight.Owner_Name), bot.fetchUser(stocks.Stock_Eight.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_death_title.format(stocks.Stock_Eight.Name), response.stock_death_message.format(stocks.Stock_Eight.Name, stocks.Stock_Eight.Abbreviation, stocks.Stock_Eight.Owner_Name, stocks.Stock_Eight.Number))
        .setColor(color.crimson)
        .setTimestamp();

        stockChannel.send(stock8DeathEmbed);
        stocks.Dead_Stocks.push(stocks.Stock_Eight.Name);

        stocks.Stock_Eight.Name = "None";
        stocks.Stock_Eight.Abbreviation = "None";
        stocks.Stock_Eight.Info = "None";
        stocks.Stock_Eight.Image = "None";
        stocks.Stock_Eight.Owner_Name = "None";
        stocks.Stock_Eight.Owner_Id = "None";
      }
    }
  }

  fs.writeFile("./stocks.json", JSON.stringify(stocks), (err) => {
    if(err) console.log(err)
  });
  fs.writeFile("mystocks", JSON.stringify(mystocks), (err) => {
    if(err) cosole.log(err)
  });

  return stockChannel.send(stockChangeEmbed);
}

var change = function()
{
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(response.missing_permissions);

  stocksystem(message.author.username, message.author.avatarURL);

  message.channel.send("`Stocks Changed!`")
}

var start = function()
{
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(response.missing_permissions);

  console.log("Stocks Started!");

  let stockInterval = randomInt(1080, 10800);

  console.log(stockInterval);

  setInterval(()=>
  {
    stocksystem(botconfig.botname, "https://cdn.discordapp.com/attachments/516138714745929784/622627285551415306/MrFumpleBot_2.0.png");
  }, stockInterval * 1000);

  message.channel.send("`Stocks Started.`");
}

var sell = function()
{
  if(!args[1]) return message.channel.send(response.missing_stock)
  let stock = args[1].toLowerCase();

  if(!args[2]) return message.channel.send(response.missing_stock_amount)
  let amount = parseInt(args[2]);

  switch(stock)
  {
    case "1":
    case stocks.Stock_One.Abbreviation.toLowerCase():
      if(mystocks[message.author.id].Owned_Stocks.Stock_One != stocks.Stock_One.Neme && mystocks[message.author.id].Owned_Stocks.Stock_Two != stocks.Stock_One.Neme){
        return message.channel.send(response.unowned_stock);
      }else if(stocks.Stock_One.Price < 2500)
      {
        let stock1SellEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_sold_author.format(stocks.Stock_One.Owner_Name), bot.fetchUser(stocks.Stock_One.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_sold_title.format(stocks.Stock_One.Name), response.stock_sold_message.format(stocks.Stock_One.Name, stocks.Stock_One.Abbreviation, 0, stocks.Stock_One.Owner_Name, stocks.Stock_One.Number))
        .setColor(color.Lime)
        .setTimestamp();

      for (x in users){
        if(!mystocks[x]){
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
          }
          mystocks[users[x].Id].Stocks_One_Amount = 0;
        }

        stocks.Sold_Stocks.push(stocks.Stock_One.Name);
        stocks.Stock_One.Name = "None";
        stocks.Stock_One.Abbreviation = "None";
        stocks.Stock_One.Info = "None";
        stocks.Stock_One.Image = "None";
        stocks.Stock_One.Owner_Name = "None";
        stocks.Stock_One.Owner_Id = "None";

        stockChannel.send(stock1SellEmbed);
        message.channel.send("`Stock Sold`");
      }else if(stocks.Stock_One.Price < 3000)
      {
        let stock1SellEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_sold_author.format(stocks.Stock_One.Owner_Name), bot.fetchUser(stocks.Stock_One.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_sold_title.format(stocks.Stock_One.Name), response.stock_sold_message.format(stocks.Stock_One.Name, stocks.Stock_One.Abbreviation, 1, stocks.Stock_One.Owner_Name, stocks.Stock_One.Number))
        .setColor(color.Lime)
        .setTimestamp();

      for (x in users){
        if(!mystocks[x]){
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
          }
          mystocks[users[x].Id].Stocks_One_Amount = 0;
        }

        stocks.Sold_Stocks.push(stocks.Stock_One.Name);
        stocks.Stock_One.Name = "None";
        stocks.Stock_One.Abbreviation = "None";
        stocks.Stock_One.Info = "None";
        stocks.Stock_One.Image = "None";
        stocks.Stock_One.Owner_Name = "None";
        stocks.Stock_One.Owner_Id = "None";

        fumplebucks[message.author.id].dumplings += 1;

        stockChannel.send(stock1SellEmbed);
        message.channel.send("`Stock Sold`");
      }else if(stocks.Stock_One.Price < 4000)
      {
        let stock1SellEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_sold_author.format(stocks.Stock_One.Owner_Name), bot.fetchUser(stocks.Stock_One.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_sold_title.format(stocks.Stock_One.Name), response.stock_sold_message.format(stocks.Stock_One.Name, stocks.Stock_One.Abbreviation, 2, stocks.Stock_One.Owner_Name, stocks.Stock_One.Number))
        .setColor(color.Lime)
        .setTimestamp();

      for (x in users){
        if(!mystocks[x]){
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
          }
          mystocks[users[x].Id].Stocks_One_Amount = 0;
        }

        stocks.Sold_Stocks.push(stocks.Stock_One.Name);
        stocks.Stock_One.Name = "None";
        stocks.Stock_One.Abbreviation = "None";
        stocks.Stock_One.Info = "None";
        stocks.Stock_One.Image = "None";
        stocks.Stock_One.Owner_Name = "None";
        stocks.Stock_One.Owner_Id = "None";

        fumplebucks[message.author.id].dumplings += 2;

        stockChannel.send(stock1SellEmbed);
        message.channel.send("`Stock Sold`");
      }else if(stocks.Stock_One.Price < 5000)
      {
        let stock1SellEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_sold_author.format(stocks.Stock_One.Owner_Name), bot.fetchUser(stocks.Stock_One.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_sold_title.format(stocks.Stock_One.Name), response.stock_sold_message.format(stocks.Stock_One.Name, stocks.Stock_One.Abbreviation, 3, stocks.Stock_One.Owner_Name, stocks.Stock_One.Number))
        .setColor(color.Lime)
        .setTimestamp();

      for (x in users){
        if(!mystocks[x]){
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
          }
          mystocks[users[x].Id].Stocks_One_Amount = 0;
        }

        stocks.Sold_Stocks.push(stocks.Stock_One.Name);
        stocks.Stock_One.Name = "None";
        stocks.Stock_One.Abbreviation = "None";
        stocks.Stock_One.Info = "None";
        stocks.Stock_One.Image = "None";
        stocks.Stock_One.Owner_Name = "None";
        stocks.Stock_One.Owner_Id = "None";

        fumplebucks[message.author.id].dumplings += 3;

        stockChannel.send(stock1SellEmbed);
        message.channel.send("`Stock Sold`");
      }else
      {
        let stock1SellEmbed = new Discord.RichEmbed()
        .setAuthor(response.stock_legend_sold_author.format(stocks.Stock_One.Owner_Name), bot.fetchUser(stocks.Stock_One.Owner_Id).then(u=>u.displayAvatarURL))
        .addField(response.stock_legend_sold_title.format(stocks.Stock_One.Name), response.stock_legend_sold_message.format(stocks.Stock_One.Name, stocks.Stock_One.Abbreviation, 5, stocks.Stock_One.Owner_Name, stocks.Stock_One.Number))
        .setColor(color.gold)
        .setTimestamp();

        stocks.Legendary_Stocks.push(stocks.Stock_One.Name);

      for (x in users){
        if(!mystocks[x]){
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
          }
          mystocks[users[x].Id].Stocks_One_Amount = 0;
        }

        stocks.Stock_One.Name = "None";
        stocks.Stock_One.Abbreviation = "None";
        stocks.Stock_One.Info = "None";
        stocks.Stock_One.Image = "None";
        stocks.Stock_One.Owner_Name = "None";
        stocks.Stock_One.Owner_Id = "None";

        fumplebucks[message.author.id].dumplings += 5;

        stockChannel.send(stock1SellEmbed);
        message.channel.send("`Stock Sold`");
      }
      break;
    case "2":
    case stocks.Stock_Two.Abbreviation.toLowerCase():
    if(mystocks[message.author.id].Owned_Stocks.Stock_Two != stocks.Stock_Two.Neme && mystocks[message.author.id].Owned_Stocks.Stock_Two != stocks.Stock_Two.Neme){
      return message.channel.send(response.unowned_stock);
    }else if(stocks.Stock_Two.Price < 2500)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Two.Owner_Name), bot.fetchUser(stocks.Stock_Two.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Two.Name), response.stock_sold_message.format(stocks.Stock_Two.Name, stocks.Stock_Two.Abbreviation, 0, stocks.Stock_Two.Owner_Name, stocks.Stock_Two.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Two":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Two.Name);
      stocks.Stock_Two.Name = "None";
      stocks.Stock_Two.Abbreviation = "None";
      stocks.Stock_Two.Info = "None";
      stocks.Stock_Two.Image = "None";
      stocks.Stock_Two.Owner_Name = "None";
      stocks.Stock_Two.Owner_Id = "None";

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Two.Price < 3000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Two.Owner_Name), bot.fetchUser(stocks.Stock_Two.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Two.Name), response.stock_sold_message.format(stocks.Stock_Two.Name, stocks.Stock_Two.Abbreviation, 1, stocks.Stock_Two.Owner_Name, stocks.Stock_Two.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Two":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Two.Name);
      stocks.Stock_Two.Name = "None";
      stocks.Stock_Two.Abbreviation = "None";
      stocks.Stock_Two.Info = "None";
      stocks.Stock_Two.Image = "None";
      stocks.Stock_Two.Owner_Name = "None";
      stocks.Stock_Two.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 1;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Two.Price < 4000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Two.Owner_Name), bot.fetchUser(stocks.Stock_Two.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Two.Name), response.stock_sold_message.format(stocks.Stock_Two.Name, stocks.Stock_Two.Abbreviation, 2, stocks.Stock_Two.Owner_Name, stocks.Stock_Two.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Two":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Two.Name);
      stocks.Stock_Two.Name = "None";
      stocks.Stock_Two.Abbreviation = "None";
      stocks.Stock_Two.Info = "None";
      stocks.Stock_Two.Image = "None";
      stocks.Stock_Two.Owner_Name = "None";
      stocks.Stock_Two.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 2;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Two.Price < 5000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Two.Owner_Name), bot.fetchUser(stocks.Stock_Two.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Two.Name), response.stock_sold_message.format(stocks.Stock_Two.Name, stocks.Stock_Two.Abbreviation, 3, stocks.Stock_Two.Owner_Name, stocks.Stock_Two.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Two":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Two.Name);
      stocks.Stock_Two.Name = "None";
      stocks.Stock_Two.Abbreviation = "None";
      stocks.Stock_Two.Info = "None";
      stocks.Stock_Two.Image = "None";
      stocks.Stock_Two.Owner_Name = "None";
      stocks.Stock_Two.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 3;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_legend_sold_author.format(stocks.Stock_Two.Owner_Name), bot.fetchUser(stocks.Stock_Two.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_legend_sold_title.format(stocks.Stock_Two.Name), response.stock_legend_sold_message.format(stocks.Stock_Two.Name, stocks.Stock_Two.Abbreviation, 5, stocks.Stock_Two.Owner_Name, stocks.Stock_Two.Number))
      .setColor(color.gold)
      .setTimestamp();

      stocks.Legendary_Stocks.push(stocks.Stock_Two.Name);

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Two":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Stock_Two.Name = "None";
      stocks.Stock_Two.Abbreviation = "None";
      stocks.Stock_Two.Info = "None";
      stocks.Stock_Two.Image = "None";
      stocks.Stock_Two.Owner_Name = "None";
      stocks.Stock_Two.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 5;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }
      break;
    case "3":
    case stocks.Stock_Three.Abbreviation.toLowerCase():
    if(mystocks[message.author.id].Owned_Stocks.Stock_Three != stocks.Stock_Three.Neme && mystocks[message.author.id].Owned_Stocks.Stock_Two != stocks.Stock_Three.Neme){
      return message.channel.send(response.unowned_stock);
    }else if(stocks.Stock_Three.Price < 2500)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Three.Owner_Name), bot.fetchUser(stocks.Stock_Three.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Three.Name), response.stock_sold_message.format(stocks.Stock_Three.Name, stocks.Stock_Three.Abbreviation, 0, stocks.Stock_Three.Owner_Name, stocks.Stock_Three.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Three":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Three.Name);
      stocks.Stock_Three.Name = "None";
      stocks.Stock_Three.Abbreviation = "None";
      stocks.Stock_Three.Info = "None";
      stocks.Stock_Three.Image = "None";
      stocks.Stock_Three.Owner_Name = "None";
      stocks.Stock_Three.Owner_Id = "None";

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Three.Price < 3000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Three.Owner_Name), bot.fetchUser(stocks.Stock_Three.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Three.Name), response.stock_sold_message.format(stocks.Stock_Three.Name, stocks.Stock_Three.Abbreviation, 1, stocks.Stock_Three.Owner_Name, stocks.Stock_Three.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Three":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Three.Name);
      stocks.Stock_Three.Name = "None";
      stocks.Stock_Three.Abbreviation = "None";
      stocks.Stock_Three.Info = "None";
      stocks.Stock_Three.Image = "None";
      stocks.Stock_Three.Owner_Name = "None";
      stocks.Stock_Three.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 1;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Three.Price < 4000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Three.Owner_Name), bot.fetchUser(stocks.Stock_Three.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Three.Name), response.stock_sold_message.format(stocks.Stock_Three.Name, stocks.Stock_Three.Abbreviation, 2, stocks.Stock_Three.Owner_Name, stocks.Stock_Three.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Three":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Three.Name);
      stocks.Stock_Three.Name = "None";
      stocks.Stock_Three.Abbreviation = "None";
      stocks.Stock_Three.Info = "None";
      stocks.Stock_Three.Image = "None";
      stocks.Stock_Three.Owner_Name = "None";
      stocks.Stock_Three.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 2;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Three.Price < 5000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Three.Owner_Name), bot.fetchUser(stocks.Stock_Three.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Three.Name), response.stock_sold_message.format(stocks.Stock_Three.Name, stocks.Stock_Three.Abbreviation, 3, stocks.Stock_Three.Owner_Name, stocks.Stock_Three.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Three":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Three.Name);
      stocks.Stock_Three.Name = "None";
      stocks.Stock_Three.Abbreviation = "None";
      stocks.Stock_Three.Info = "None";
      stocks.Stock_Three.Image = "None";
      stocks.Stock_Three.Owner_Name = "None";
      stocks.Stock_Three.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 3;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_legend_sold_author.format(stocks.Stock_Three.Owner_Name), bot.fetchUser(stocks.Stock_Three.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_legend_sold_title.format(stocks.Stock_Three.Name), response.stock_legend_sold_message.format(stocks.Stock_Three.Name, stocks.Stock_Three.Abbreviation, 5, stocks.Stock_Three.Owner_Name, stocks.Stock_Three.Number))
      .setColor(color.gold)
      .setTimestamp();

      stocks.Legendary_Stocks.push(stocks.Stock_Three.Name);

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Three":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Stock_Three.Name = "None";
      stocks.Stock_Three.Abbreviation = "None";
      stocks.Stock_Three.Info = "None";
      stocks.Stock_Three.Image = "None";
      stocks.Stock_Three.Owner_Name = "None";
      stocks.Stock_Three.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 5;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }
      break;
    case "4":
    case stocks.Stock_Four.Abbreviation.toLowerCase():
    if(mystocks[message.author.id].Owned_Stocks.Stock_Four != stocks.Stock_Four.Neme && mystocks[message.author.id].Owned_Stocks.Stock_Two != stocks.Stock_Four.Neme){
      return message.channel.send(response.unowned_stock);
    }else if(stocks.Stock_Four.Price < 2500)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Four.Owner_Name), bot.fetchUser(stocks.Stock_Four.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Four.Name), response.stock_sold_message.format(stocks.Stock_Four.Name, stocks.Stock_Four.Abbreviation, 0, stocks.Stock_Four.Owner_Name, stocks.Stock_Four.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Four":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Four.Name);
      stocks.Stock_Four.Name = "None";
      stocks.Stock_Four.Abbreviation = "None";
      stocks.Stock_Four.Info = "None";
      stocks.Stock_Four.Image = "None";
      stocks.Stock_Four.Owner_Name = "None";
      stocks.Stock_Four.Owner_Id = "None";

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Four.Price < 3000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Four.Owner_Name), bot.fetchUser(stocks.Stock_Four.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Four.Name), response.stock_sold_message.format(stocks.Stock_Four.Name, stocks.Stock_Four.Abbreviation, 1, stocks.Stock_Four.Owner_Name, stocks.Stock_Four.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Four":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Four.Name);
      stocks.Stock_Four.Name = "None";
      stocks.Stock_Four.Abbreviation = "None";
      stocks.Stock_Four.Info = "None";
      stocks.Stock_Four.Image = "None";
      stocks.Stock_Four.Owner_Name = "None";
      stocks.Stock_Four.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 1;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Four.Price < 4000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Four.Owner_Name), bot.fetchUser(stocks.Stock_Four.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Four.Name), response.stock_sold_message.format(stocks.Stock_Four.Name, stocks.Stock_Four.Abbreviation, 2, stocks.Stock_Four.Owner_Name, stocks.Stock_Four.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Four":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Four.Name);
      stocks.Stock_Four.Name = "None";
      stocks.Stock_Four.Abbreviation = "None";
      stocks.Stock_Four.Info = "None";
      stocks.Stock_Four.Image = "None";
      stocks.Stock_Four.Owner_Name = "None";
      stocks.Stock_Four.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 2;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Four.Price < 5000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Four.Owner_Name), bot.fetchUser(stocks.Stock_Four.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Four.Name), response.stock_sold_message.format(stocks.Stock_Four.Name, stocks.Stock_Four.Abbreviation, 3, stocks.Stock_Four.Owner_Name, stocks.Stock_Four.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Four":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Four.Name);
      stocks.Stock_Four.Name = "None";
      stocks.Stock_Four.Abbreviation = "None";
      stocks.Stock_Four.Info = "None";
      stocks.Stock_Four.Image = "None";
      stocks.Stock_Four.Owner_Name = "None";
      stocks.Stock_Four.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 3;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_legend_sold_author.format(stocks.Stock_Four.Owner_Name), bot.fetchUser(stocks.Stock_Four.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_legend_sold_title.format(stocks.Stock_Four.Name), response.stock_legend_sold_message.format(stocks.Stock_Four.Name, stocks.Stock_Four.Abbreviation, 5, stocks.Stock_Four.Owner_Name, stocks.Stock_Four.Number))
      .setColor(color.gold)
      .setTimestamp();

      stocks.Legendary_Stocks.push(stocks.Stock_Four.Name);

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Four":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Stock_Four.Name = "None";
      stocks.Stock_Four.Abbreviation = "None";
      stocks.Stock_Four.Info = "None";
      stocks.Stock_Four.Image = "None";
      stocks.Stock_Four.Owner_Name = "None";
      stocks.Stock_Four.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 5;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }
      break;
    case "5":
    case stocks.Stock_Five.Abbreviation.toLowerCase():
    if(mystocks[message.author.id].Owned_Stocks.Stock_Five != stocks.Stock_Five.Neme && mystocks[message.author.id].Owned_Stocks.Stock_Two != stocks.Stock_Five.Neme){
      return message.channel.send(response.unowned_stock);
    }else if(stocks.Stock_Five.Price < 2500)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Five.Owner_Name), bot.fetchUser(stocks.Stock_Five.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Five.Name), response.stock_sold_message.format(stocks.Stock_Five.Name, stocks.Stock_Five.Abbreviation, 0, stocks.Stock_Five.Owner_Name, stocks.Stock_Five.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Five":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Five.Name);
      stocks.Stock_Five.Name = "None";
      stocks.Stock_Five.Abbreviation = "None";
      stocks.Stock_Five.Info = "None";
      stocks.Stock_Five.Image = "None";
      stocks.Stock_Five.Owner_Name = "None";
      stocks.Stock_Five.Owner_Id = "None";

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Five.Price < 3000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Five.Owner_Name), bot.fetchUser(stocks.Stock_Five.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Five.Name), response.stock_sold_message.format(stocks.Stock_Five.Name, stocks.Stock_Five.Abbreviation, 1, stocks.Stock_Five.Owner_Name, stocks.Stock_Five.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Five":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Five.Name);
      stocks.Stock_Five.Name = "None";
      stocks.Stock_Five.Abbreviation = "None";
      stocks.Stock_Five.Info = "None";
      stocks.Stock_Five.Image = "None";
      stocks.Stock_Five.Owner_Name = "None";
      stocks.Stock_Five.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 1;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Five.Price < 4000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Five.Owner_Name), bot.fetchUser(stocks.Stock_Five.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Five.Name), response.stock_sold_message.format(stocks.Stock_Five.Name, stocks.Stock_Five.Abbreviation, 2, stocks.Stock_Five.Owner_Name, stocks.Stock_Five.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Five":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Five.Name);
      stocks.Stock_Five.Name = "None";
      stocks.Stock_Five.Abbreviation = "None";
      stocks.Stock_Five.Info = "None";
      stocks.Stock_Five.Image = "None";
      stocks.Stock_Five.Owner_Name = "None";
      stocks.Stock_Five.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 2;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Five.Price < 5000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Five.Owner_Name), bot.fetchUser(stocks.Stock_Five.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Five.Name), response.stock_sold_message.format(stocks.Stock_Five.Name, stocks.Stock_Five.Abbreviation, 3, stocks.Stock_Five.Owner_Name, stocks.Stock_Five.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Five":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Five.Name);
      stocks.Stock_Five.Name = "None";
      stocks.Stock_Five.Abbreviation = "None";
      stocks.Stock_Five.Info = "None";
      stocks.Stock_Five.Image = "None";
      stocks.Stock_Five.Owner_Name = "None";
      stocks.Stock_Five.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 3;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_legend_sold_author.format(stocks.Stock_Five.Owner_Name), bot.fetchUser(stocks.Stock_Five.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_legend_sold_title.format(stocks.Stock_Five.Name), response.stock_legend_sold_message.format(stocks.Stock_Five.Name, stocks.Stock_Five.Abbreviation, 5, stocks.Stock_Five.Owner_Name, stocks.Stock_Five.Number))
      .setColor(color.gold)
      .setTimestamp();

      stocks.Legendary_Stocks.push(stocks.Stock_Five.Name);

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Five":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Stock_Five.Name = "None";
      stocks.Stock_Five.Abbreviation = "None";
      stocks.Stock_Five.Info = "None";
      stocks.Stock_Five.Image = "None";
      stocks.Stock_Five.Owner_Name = "None";
      stocks.Stock_Five.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 5;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }
      break;
    case "6":
    case stocks.Stock_Six.Abbreviation.toLowerCase():
    if(mystocks[message.author.id].Owned_Stocks.Stock_Six != stocks.Stock_Six.Neme && mystocks[message.author.id].Owned_Stocks.Stock_Two != stocks.Stock_Six.Neme){
      return message.channel.send(response.unowned_stock);
    }else if(stocks.Stock_Six.Price < 2500)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Six.Owner_Name), bot.fetchUser(stocks.Stock_Six.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Six.Name), response.stock_sold_message.format(stocks.Stock_Six.Name, stocks.Stock_Six.Abbreviation, 0, stocks.Stock_Six.Owner_Name, stocks.Stock_Six.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Six":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Six.Name);
      stocks.Stock_Six.Name = "None";
      stocks.Stock_Six.Abbreviation = "None";
      stocks.Stock_Six.Info = "None";
      stocks.Stock_Six.Image = "None";
      stocks.Stock_Six.Owner_Name = "None";
      stocks.Stock_Six.Owner_Id = "None";

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Six.Price < 3000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Six.Owner_Name), bot.fetchUser(stocks.Stock_Six.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Six.Name), response.stock_sold_message.format(stocks.Stock_Six.Name, stocks.Stock_Six.Abbreviation, 1, stocks.Stock_Six.Owner_Name, stocks.Stock_Six.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Six":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Six.Name);
      stocks.Stock_Six.Name = "None";
      stocks.Stock_Six.Abbreviation = "None";
      stocks.Stock_Six.Info = "None";
      stocks.Stock_Six.Image = "None";
      stocks.Stock_Six.Owner_Name = "None";
      stocks.Stock_Six.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 1;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Six.Price < 4000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Six.Owner_Name), bot.fetchUser(stocks.Stock_Six.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Six.Name), response.stock_sold_message.format(stocks.Stock_Six.Name, stocks.Stock_Six.Abbreviation, 2, stocks.Stock_Six.Owner_Name, stocks.Stock_Six.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Six":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Six.Name);
      stocks.Stock_Six.Name = "None";
      stocks.Stock_Six.Abbreviation = "None";
      stocks.Stock_Six.Info = "None";
      stocks.Stock_Six.Image = "None";
      stocks.Stock_Six.Owner_Name = "None";
      stocks.Stock_Six.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 2;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Six.Price < 5000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Six.Owner_Name), bot.fetchUser(stocks.Stock_Six.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Six.Name), response.stock_sold_message.format(stocks.Stock_Six.Name, stocks.Stock_Six.Abbreviation, 3, stocks.Stock_Six.Owner_Name, stocks.Stock_Six.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Six":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Six.Name);
      stocks.Stock_Six.Name = "None";
      stocks.Stock_Six.Abbreviation = "None";
      stocks.Stock_Six.Info = "None";
      stocks.Stock_Six.Image = "None";
      stocks.Stock_Six.Owner_Name = "None";
      stocks.Stock_Six.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 3;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_legend_sold_author.format(stocks.Stock_Six.Owner_Name), bot.fetchUser(stocks.Stock_Six.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_legend_sold_title.format(stocks.Stock_Six.Name), response.stock_legend_sold_message.format(stocks.Stock_Six.Name, stocks.Stock_Six.Abbreviation, 5, stocks.Stock_Six.Owner_Name, stocks.Stock_Six.Number))
      .setColor(color.gold)
      .setTimestamp();

      stocks.Legendary_Stocks.push(stocks.Stock_Six.Name);

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Six":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Stock_Six.Name = "None";
      stocks.Stock_Six.Abbreviation = "None";
      stocks.Stock_Six.Info = "None";
      stocks.Stock_Six.Image = "None";
      stocks.Stock_Six.Owner_Name = "None";
      stocks.Stock_Six.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 5;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }
      break;
    case "7":
    case stocks.Stock_Seven.Abbreviation.toLowerCase():
    if(mystocks[message.author.id].Owned_Stocks.Stock_Seven != stocks.Stock_Seven.Neme && mystocks[message.author.id].Owned_Stocks.Stock_Two != stocks.Stock_Seven.Neme){
      return message.channel.send(response.unowned_stock);
    }else if(stocks.Stock_Seven.Price < 2500)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Seven.Owner_Name), bot.fetchUser(stocks.Stock_Seven.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Seven.Name), response.stock_sold_message.format(stocks.Stock_Seven.Name, stocks.Stock_Seven.Abbreviation, 0, stocks.Stock_Seven.Owner_Name, stocks.Stock_Seven.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Seven":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Seven.Name);
      stocks.Stock_Seven.Name = "None";
      stocks.Stock_Seven.Abbreviation = "None";
      stocks.Stock_Seven.Info = "None";
      stocks.Stock_Seven.Image = "None";
      stocks.Stock_Seven.Owner_Name = "None";
      stocks.Stock_Seven.Owner_Id = "None";

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Seven.Price < 3000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Seven.Owner_Name), bot.fetchUser(stocks.Stock_Seven.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Seven.Name), response.stock_sold_message.format(stocks.Stock_Seven.Name, stocks.Stock_Seven.Abbreviation, 1, stocks.Stock_Seven.Owner_Name, stocks.Stock_Seven.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Seven":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Seven.Name);
      stocks.Stock_Seven.Name = "None";
      stocks.Stock_Seven.Abbreviation = "None";
      stocks.Stock_Seven.Info = "None";
      stocks.Stock_Seven.Image = "None";
      stocks.Stock_Seven.Owner_Name = "None";
      stocks.Stock_Seven.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 1;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Seven.Price < 4000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Seven.Owner_Name), bot.fetchUser(stocks.Stock_Seven.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Seven.Name), response.stock_sold_message.format(stocks.Stock_Seven.Name, stocks.Stock_Seven.Abbreviation, 2, stocks.Stock_Seven.Owner_Name, stocks.Stock_Seven.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Seven":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Seven.Name);
      stocks.Stock_Seven.Name = "None";
      stocks.Stock_Seven.Abbreviation = "None";
      stocks.Stock_Seven.Info = "None";
      stocks.Stock_Seven.Image = "None";
      stocks.Stock_Seven.Owner_Name = "None";
      stocks.Stock_Seven.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 2;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Seven.Price < 5000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Seven.Owner_Name), bot.fetchUser(stocks.Stock_Seven.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Seven.Name), response.stock_sold_message.format(stocks.Stock_Seven.Name, stocks.Stock_Seven.Abbreviation, 3, stocks.Stock_Seven.Owner_Name, stocks.Stock_Seven.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Seven":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Seven.Name);
      stocks.Stock_Seven.Name = "None";
      stocks.Stock_Seven.Abbreviation = "None";
      stocks.Stock_Seven.Info = "None";
      stocks.Stock_Seven.Image = "None";
      stocks.Stock_Seven.Owner_Name = "None";
      stocks.Stock_Seven.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 3;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_legend_sold_author.format(stocks.Stock_Seven.Owner_Name), bot.fetchUser(stocks.Stock_Seven.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_legend_sold_title.format(stocks.Stock_Seven.Name), response.stock_legend_sold_message.format(stocks.Stock_Seven.Name, stocks.Stock_Seven.Abbreviation, 5, stocks.Stock_Seven.Owner_Name, stocks.Stock_Seven.Number))
      .setColor(color.gold)
      .setTimestamp();

      stocks.Legendary_Stocks.push(stocks.Stock_Seven.Name);

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Seven":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Stock_Seven.Name = "None";
      stocks.Stock_Seven.Abbreviation = "None";
      stocks.Stock_Seven.Info = "None";
      stocks.Stock_Seven.Image = "None";
      stocks.Stock_Seven.Owner_Name = "None";
      stocks.Stock_Seven.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 5;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }
      break;
    case "8":
    case stocks.Stock_Eight.Abbreviation.toLowerCase():
    if(mystocks[message.author.id].Owned_Stocks.Stock_Eight != stocks.Stock_Eight.Neme && mystocks[message.author.id].Owned_Stocks.Stock_Two != stocks.Stock_Eight.Neme){
      return message.channel.send(response.unowned_stock);
    }else if(stocks.Stock_Eight.Price < 2500)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Eight.Owner_Name), bot.fetchUser(stocks.Stock_Eight.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Eight.Name), response.stock_sold_message.format(stocks.Stock_Eight.Name, stocks.Stock_Eight.Abbreviation, 0, stocks.Stock_Eight.Owner_Name, stocks.Stock_Eight.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Eight":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Eight.Name);
      stocks.Stock_Eight.Name = "None";
      stocks.Stock_Eight.Abbreviation = "None";
      stocks.Stock_Eight.Info = "None";
      stocks.Stock_Eight.Image = "None";
      stocks.Stock_Eight.Owner_Name = "None";
      stocks.Stock_Eight.Owner_Id = "None";

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Eight.Price < 3000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Eight.Owner_Name), bot.fetchUser(stocks.Stock_Eight.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Eight.Name), response.stock_sold_message.format(stocks.Stock_Eight.Name, stocks.Stock_Eight.Abbreviation, 1, stocks.Stock_Eight.Owner_Name, stocks.Stock_Eight.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Eight":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Eight.Name);
      stocks.Stock_Eight.Name = "None";
      stocks.Stock_Eight.Abbreviation = "None";
      stocks.Stock_Eight.Info = "None";
      stocks.Stock_Eight.Image = "None";
      stocks.Stock_Eight.Owner_Name = "None";
      stocks.Stock_Eight.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 1;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Eight.Price < 4000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Eight.Owner_Name), bot.fetchUser(stocks.Stock_Eight.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Eight.Name), response.stock_sold_message.format(stocks.Stock_Eight.Name, stocks.Stock_Eight.Abbreviation, 2, stocks.Stock_Eight.Owner_Name, stocks.Stock_Eight.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Eight":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Eight.Name);
      stocks.Stock_Eight.Name = "None";
      stocks.Stock_Eight.Abbreviation = "None";
      stocks.Stock_Eight.Info = "None";
      stocks.Stock_Eight.Image = "None";
      stocks.Stock_Eight.Owner_Name = "None";
      stocks.Stock_Eight.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 2;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else if(stocks.Stock_Eight.Price < 5000)
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_sold_author.format(stocks.Stock_Eight.Owner_Name), bot.fetchUser(stocks.Stock_Eight.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_sold_title.format(stocks.Stock_Eight.Name), response.stock_sold_message.format(stocks.Stock_Eight.Name, stocks.Stock_Eight.Abbreviation, 3, stocks.Stock_Eight.Owner_Name, stocks.Stock_Eight.Number))
      .setColor(color.Lime)
      .setTimestamp();

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Eight":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Sold_Stocks.push(stocks.Stock_Eight.Name);
      stocks.Stock_Eight.Name = "None";
      stocks.Stock_Eight.Abbreviation = "None";
      stocks.Stock_Eight.Info = "None";
      stocks.Stock_Eight.Image = "None";
      stocks.Stock_Eight.Owner_Name = "None";
      stocks.Stock_Eight.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 3;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }else
    {
      let stock1SellEmbed = new Discord.RichEmbed()
      .setAuthor(response.stock_legend_sold_author.format(stocks.Stock_Eight.Owner_Name), bot.fetchUser(stocks.Stock_Eight.Owner_Id).then(u=>u.displayAvatarURL))
      .addField(response.stock_legend_sold_title.format(stocks.Stock_Eight.Name), response.stock_legend_sold_message.format(stocks.Stock_Eight.Name, stocks.Stock_Eight.Abbreviation, 5, stocks.Stock_Eight.Owner_Name, stocks.Stock_Eight.Number))
      .setColor(color.gold)
      .setTimestamp();

      stocks.Legendary_Stocks.push(stocks.Stock_Eight.Name);

    for (x in users){
      if(!mystocks[x]){
        mystocks[x] = {
            Stocks_One_Amount: 0,
            Stocks_Two_Amount: 0,
            Stocks_Three_Amount: 0,
            Stocks_Four_Amount: 0,
            Stocks_Five_Amount: 0,
            Stocks_Six_Amount: 0,
            Stocks_Seven_Amount: 0,
            Stocks_Eight_Amount: 0,
            Owned_Stocks: {"Stock_Eight":"None", "Stock_Two":"None"}
          };
        }
        mystocks[users[x].Id].Stocks_One_Amount = 0;
      }

      stocks.Stock_Eight.Name = "None";
      stocks.Stock_Eight.Abbreviation = "None";
      stocks.Stock_Eight.Info = "None";
      stocks.Stock_Eight.Image = "None";
      stocks.Stock_Eight.Owner_Name = "None";
      stocks.Stock_Eight.Owner_Id = "None";

      fumplebucks[message.author.id].dumplings += 5;

      stockChannel.send(stock1SellEmbed);
      message.channel.send("`Stock Sold`");
    }
      break;
  }
}
  switch(sInput) {
    case "info":
        stockinfo();
        break;
    case "buy":
    case "b":
        stockbuy();
        break;
    case "set":
        stockset();
        break;
    case "invest":
        invest();
        break;
    case "cashout":
        cashout();
        break;
    case "change":
        change();
        break;
    case "start":
        start();
        break;
    case "test":
        message.channel.send("bruh");
        break;
    default:
        message.channel.send(response.unknown_command);
  }
  save.SaveAll();
}
/*
case "sell":
    sell();
    break;
  */

module.exports.help = {
name: "stock",
aliases: ["stonk", "s"]
}
