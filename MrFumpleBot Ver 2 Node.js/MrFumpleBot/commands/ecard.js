const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const fs = require("fs");
let game = require("../game.json");
let save = require("../utils/save.js");
let gamestuff = require("../utils/gamestuff.js");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "ecard");

//$ecard [input]
function getRandomInt(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}
function displayecard(ename){
  switch(ename){
    case "Slave":
      return gamestuff.CardGen("S", "¢", "Slave");
    break;
    case "Emperor":
      return gamestuff.CardGen("E", "Ω", "Emperor");
    break;
    case "Civillian":
      return gamestuff.CardGen("C", "♥", "Civilian");
    break;
    case "Used":
      return gamestuff.CardGen("Hidden");
    break;

  }
}

if(!game[message.author.id]) save.NewUserGame(message, message.author.id);

if(!args[0]) return message.channel.send(response.missing_input);
let eInput = args[0].toLowerCase();

if(eInput == "open"){
  if(game[message.author.id].Status == "InGame"){
    message.channel.send("`You are already in a {0} Game!`".format(game[message.author.id].Game));
  }else if(game[message.author.id].Status == "Open"){
    message.channel.send("`You are already open to a game of {0}.`".format(game[message.author.id].Game));
  }else{
    game[message.author.id].Game = "ECard";
    game[message.author.id].Status = "Open";
    message.channel.send("`You are now open to a game of {0}.`".format(game[message.author.id].Game));
  }
}else if(eInput == "close"){
  if(game[message.author.id].Status == "InGame"){
    message.channel.send("`You are already in a {0} Game!`".format(game[message.author.id].Game));
  }else{
    game[message.author.id].Game = "None";
    game[message.author.id].Status = "Closed";
    message.channel.send("`You are now closed to all games.`");
  }
}else if(eInput == "quit"){
  if(game[message.author.id].Status != "InGame"){
    message.channel.send("`You are not in a game!`");
  }else{
    let cUser = message.guild.member(game[message.author.id].Playing);
    save.SetDefaultGame(message, message.author.id);
    save.SetDefaultGame(message, cUser.id);

    message.channel.send("`The game has ended!`");
  }
}else if(eInput == "slave"){
  message.channel.send(displayecard("Slave"));
}else if(eInput == "emperor"){
  message.channel.send(displayecard("Emperor"));
}else if(eInput == "civillian"){
  message.channel.send(displayecard("Civillian"));
}else if(eInput == "used"){
  message.channel.send(displayecard("Used"));
}else if(args[1]){
  if(eInput == "challenge"){
    let cUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!cUser) return message.channel.send(response.missing_user);

    if(!game[cUser.id]) save.SetDefaultGame(message, cUser.id);

    cUsername = cUser.user.username;
    if(game[cUser.id].Status == "Closed"){
      message.channel.send(response.Closed.format(cUsername));
    }else if(game[cUser.id].Status == "InGame"){
      let pUser = message.guild.member(game[cUser.id].Playing)
      message.channel.send(response.InGame.format(cUsername, game[cUser.id].Game, pUser.user.username));
    }else if(game[cUser.id].Status == "Open"){
      message.channel.send(response.Open.format(cUsername, "ECard"));
      game[message.author.id].Status = "InGame";
      game[cUser.id].Status = "InGame";
      game[message.author.id].Game = "ECard";
      game[cUser.id].Game = "ECard";
      game[message.author.id].Playing = cUser.id;
      game[cUser.id].Playing = message.author.id;
      let playerchoice = getRandomInt(1, 2);
      if(playerchoice == 1){
        game[cUser.id].ECard_Character = "Emperor";
        game[cUser.id].ECard_Deck = ["Civillian", "Civillian", "Civillian", "Civillian", "Civillian"];
        game[message.author.id].ECard_Character = "Slave";
        game[message.author.id].ECard_Deck = ["Civillian", "Civillian", "Civillian", "Civillian", "Civillian"];

        let cresult = getRandomInt(1, 5);
        game[cUser.id].ECard_Deck[cresult] = "Emperor";

        let aresult = getRandomInt(1, 5);
        game[message.author.id].ECard_Deck[aresult] = "Slave";
      }else if(playerchoice == 2){
        game[cUser.id].ECard_Character = "Slave";
        game[cUser.id].ECard_Deck = ["Civillian", "Civillian", "Civillian", "Civillian", "Civillian"];
        game[message.author.id].ECard_Character = "Emperor";
        game[message.author.id].ECard_Deck = ["Civillian", "Civillian", "Civillian", "Civillian", "Civillian"];

        let cresult = getRandomInt(1, 5);
        game[cUser.id].ECard_Deck[cresult] = "Slave";

        let aresult = getRandomInt(1, 5);
        game[message.author.id].ECard_Deck[aresult] = "Emperor";
      }
      message.channel.send(response.ecard_start.format(message.author.username, game[message.author.id].ECard_Character, cUser.user.username, game[cUser.id].ECard_Character));

      message.author.send("*==== Your ECard Deck ====*");
      message.author.send(displayecard(game[message.author.id].ECard_Deck[0]));
      message.author.send(displayecard(game[message.author.id].ECard_Deck[1]));
      message.author.send(displayecard(game[message.author.id].ECard_Deck[2]));
      message.author.send(displayecard(game[message.author.id].ECard_Deck[3]));
      message.author.send(displayecard(game[message.author.id].ECard_Deck[4]));

      cUser.send("*==== Your ECard Deck ====*");
      cUser.send(displayecard(game[cUser.id].ECard_Deck[0]));
      cUser.send(displayecard(game[cUser.id].ECard_Deck[1]));
      cUser.send(displayecard(game[cUser.id].ECard_Deck[2]));
      cUser.send(displayecard(game[cUser.id].ECard_Deck[3]));
      cUser.send(displayecard(game[cUser.id].ECard_Deck[4]));
    }
  }else if(eInput == "pick"){
    if(game[message.author.id].Status != "InGame" || game[message.author.id].Game != "ECard"){
      message.channel.send("`You are not in an ECard Game!`");
    }else if(Number.isInteger(args[1])){
      let cardnum = args[1] - 1;
      let cardChosen = game[message.author.id].ECard_Deck[cardnum];
      let cUser = message.guild.member(game[message.author.id].Playing);

      if(game[cUser.id].ECard_Ready == "Ready"){

      }else{
        
      }
    }else{
      message.channel.send("`That is not a number!`");
    }
  }
}//magn0897

save.SaveAll(message);
}

module.exports.help = {
name: "ecard",
aliases: []
}
