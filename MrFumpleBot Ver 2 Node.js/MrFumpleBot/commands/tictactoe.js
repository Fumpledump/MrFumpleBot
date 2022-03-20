const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const fs = require("fs");
let game = require("../game.json");

module.exports.run = async (bot, message, args) => {
//Logging Command
logcommand(message, "tictactoe");

//$tictactoe [input]
function getRandomInt(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}
function detectEnd(){
  let topleft = game[message.author.id].Tictactoe[0];
  let top = game[message.author.id].Tictactoe[1];
  let topright = game[message.author.id].Tictactoe[2];
  let left = game[message.author.id].Tictactoe[3];
  let middle = game[message.author.id].Tictactoe[4];
  let right = game[message.author.id].Tictactoe[5];
  let bottomleft = game[message.author.id].Tictactoe[6];
  let bottom = game[message.author.id].Tictactoe[7];
  let bottomright = game[message.author.id].Tictactoe[8];

  let cUser = message.guild.member(game[message.author.id].Playing);

  if(topleft != " " && topleft == left && left == bottomleft || top != " " && top == middle && middle == bottom || topright != " " && topright == right && right == bottomright || topleft != " " && topleft == top && top == topright || topleft != " " && topleft == middle && middle == bottomright || topright != " " && topright == middle && middle == bottomleft || left != " " && left == middle && middle == right || bottomleft != " " && bottomleft == bottom && bottom == bottomright){
    message.channel.send("```|{0}|{1}|{2}|\n-------\n|{3}|{4}|{5}|\n-------\n|{6}|{7}|{8}|```".format(topleft, top, topright, left, middle, right, bottomleft, bottom, bottomright));

    game[cUser.id] = {
      Tictactoe_Wins: game[cUser.id].Tictactoe_Wins,
      Tictactoe_Losses: game[cUser.id].Tictactoe_Losses + 1,
      Tictactoe: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      Symbol: "None",
      Turn: "Next",
      Playing: "Nobody",
      Game: "None",
      Status: "Closed"
    };
    game[message.author.id] = {
      Tictactoe_Wins: game[message.author.id].Tictactoe_Wins + 1,
      Tictactoe_Losses: game[message.author.id].Tictactoe_Losses,
      Tictactoe: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      Symbol: "None",
      Turn: "Next",
      Playing: "Nobody",
      Game: "None",
      Status: "Closed"
    };
    message.channel.send("<@{0}> has won the game of TicTacToe!".format(message.author.id));
    message.channel.send("<@{0}> you lost the game of TicTacToe!".format(cUser.id));
  }else if(topleft != " " && top != " " && topright != " " && left != " " && middle != " " && right != " " && bottomleft != " " && bottom != " " && bottomright != " "){
    message.channel.send("```|{0}|{1}|{2}|\n-------\n|{3}|{4}|{5}|\n-------\n|{6}|{7}|{8}|```".format(topleft, top, topright, left, middle, right, bottomleft, bottom, bottomright));
    game[cUser.id] = {
      Tictactoe_Wins: game[cUser.id].Tictactoe_Wins,
      Tictactoe_Losses: game[cUser.id].Tictactoe_Losses,
      Tictactoe: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      Symbol: "None",
      Turn: "Next",
      Playing: "Nobody",
      Game: "None",
      Status: "Closed"
    };
    game[message.author.id] = {
      Tictactoe_Wins: game[message.author.id].Tictactoe_Wins,
      Tictactoe_Losses: game[message.author.id].Tictactoe_Losses,
      Tictactoe: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      Symbol: "None",
      Turn: "Next",
      Playing: "Nobody",
      Game: "None",
      Status: "Closed"
    };
    message.channel.send("The game has ended in a draw, nobody wins!");
  }else{
    message.channel.send("```|{0}|{1}|{2}|\n-------\n|{3}|{4}|{5}|\n-------\n|{6}|{7}|{8}|```".format(topleft, top, topright, left, middle, right, bottomleft, bottom, bottomright));
    message.channel.send("{0}, it is now your turn.".format(cUser.user.username));
  }
}

if(!args[0]) return message.channel.send(response.missing_input);
let tInput = args[0].toLowerCase();

if(!game[message.author.id]){
  game[message.author.id] = {
    ECard_Played: "None",
    ECard_Character: "None",
    ECard_Deck: ["Blank", "Blank", "Blank", "Blank", "Blank"],
    Tictactoe_Wins: 0,
    Tictactoe_Losses: 0,
    Tictactoe: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    Symbol: "None",
    Turn: "Next",
    Playing: "Nobody",
    Game: "None",
    Status: "Closed"
  };
}

if(tInput == "open"){
  if(game[message.author.id].Status == "InGame"){
    message.channel.send("`You are already in a Tic Tac Toe Game!`");
  }else{
    game[message.author.id].Game = "TicTacToe";
    game[message.author.id].Status = "Open";
    message.channel.send("`You are now open to a game of Tic Tac Toe.`");
  }
}else if(tInput == "close"){
  if(game[message.author.id].Status == "InGame"){
    message.channel.send("`You are already in a Tic Tac Toe Game!`");
  }else{
    game[message.author.id].Game = "None";
    game[message.author.id].Status = "Closed";
    message.channel.send("`You are now closed to all games.`");
  }
}else if(tInput == "current"){
  if(game[message.author.id].Status != "InGame"){
    message.channel.send("`You are not in a game do $tictactoe challenge [Person] to start one.`");
  }else{
  let topleft = game[message.author.id].Tictactoe[0];
  let top = game[message.author.id].Tictactoe[1];
  let topright = game[message.author.id].Tictactoe[2];
  let left = game[message.author.id].Tictactoe[3];
  let middle = game[message.author.id].Tictactoe[4];
  let right = game[message.author.id].Tictactoe[5];
  let bottomleft = game[message.author.id].Tictactoe[6];
  let bottom = game[message.author.id].Tictactoe[7];
  let bottomright = game[message.author.id].Tictactoe[8];

  let cUser = message.guild.member(game[message.author.id].Playing);

  message.channel.send("```|{0}|{1}|{2}|\n-------\n|{3}|{4}|{5}|\n-------\n|{6}|{7}|{8}|```".format(topleft, top, topright, left, middle, right, bottomleft, bottom, bottomright));
  if(game[message.author.id].Symbol == "X"){
    message.channel.send("You are playing X and {1} is playing O.".format(message.author.username, cUser.user.username));
  }else{
    message.channel.send("You are playing O and {1} is playing X.".format(message.author.username, cUser.user.username));
  }
  if(game[message.author.id].Turn == "Current"){
    message.channel.send("It is currently <@{0}> turn.".format(message.author.id));
  }else{
    message.channel.send("It is currently <@{0}> turn.".format(cUser.id));
  }
 }
}else if (tInput == "topleft"){
  if(game[message.author.id].Status != "InGame"){
    message.channel.send("`You are not in a game do $tictactoe challenge [Person] to start one.`");
  }else if(game[message.author.id].Turn != "Current"){
    message.channel.send("`It is not your turn!`");
  }else if(game[message.author.id].Tictactoe[0] != " "){
    message.channel.send("`That space is already taken!`");
  }else{
    let cUser = message.guild.member(game[message.author.id].Playing);
    game[message.author.id].Tictactoe[0] = game[message.author.id].Symbol;
    game[cUser.id].Tictactoe[0] = game[message.author.id].Symbol;
    game[message.author.id].Turn = "Next";
    game[cUser.id].Turn = "Current";

    detectEnd();
  }
}else if (tInput == "top"){
  if(game[message.author.id].Status != "InGame"){
    message.channel.send("`You are not in a game do $tictactoe challenge [Person] to start one.`");
  }else if(game[message.author.id].Turn != "Current"){
    message.channel.send("`It is not your turn!`");
  }else if(game[message.author.id].Tictactoe[1] != " "){
    message.channel.send("`That space is already taken!`");
  }else{
    let cUser = message.guild.member(game[message.author.id].Playing);
    game[message.author.id].Tictactoe[1] = game[message.author.id].Symbol;
    game[cUser.id].Tictactoe[1] = game[message.author.id].Symbol;
    game[message.author.id].Turn = "Next";
    game[cUser.id].Turn = "Current";

    detectEnd();
  }
}else if (tInput == "topright"){
  if(game[message.author.id].Status != "InGame"){
    message.channel.send("`You are not in a game do $tictactoe challenge [Person] to start one.`");
  }else if(game[message.author.id].Turn != "Current"){
    message.channel.send("`It is not your turn!`");
  }else if(game[message.author.id].Tictactoe[2] != " "){
    message.channel.send("`That space is already taken!`");
  }else{
    let cUser = message.guild.member(game[message.author.id].Playing);
    game[message.author.id].Tictactoe[2] = game[message.author.id].Symbol;
    game[cUser.id].Tictactoe[2] = game[message.author.id].Symbol;
    game[message.author.id].Turn = "Next";
    game[cUser.id].Turn = "Current";

    detectEnd();
  }
}else if (tInput == "left"){
  if(game[message.author.id].Status != "InGame"){
    message.channel.send("`You are not in a game do $tictactoe challenge [Person] to start one.`");
  }else if(game[message.author.id].Turn != "Current"){
    message.channel.send("`It is not your turn!`");
  }else if(game[message.author.id].Tictactoe[3] != " "){
    message.channel.send("`That space is already taken!`");
  }else{
    let cUser = message.guild.member(game[message.author.id].Playing);
    game[message.author.id].Tictactoe[3] = game[message.author.id].Symbol;
    game[cUser.id].Tictactoe[3] = game[message.author.id].Symbol;
    game[message.author.id].Turn = "Next";
    game[cUser.id].Turn = "Current";

    detectEnd();
  }
}else if (tInput == "middle"){
  if(game[message.author.id].Status != "InGame"){
    message.channel.send("`You are not in a game do $tictactoe challenge [Person] to start one.`");
  }else if(game[message.author.id].Turn != "Current"){
    message.channel.send("`It is not your turn!`");
  }else if(game[message.author.id].Tictactoe[4] != " "){
    message.channel.send("`That space is already taken!`");
  }else{
    let cUser = message.guild.member(game[message.author.id].Playing);
    game[message.author.id].Tictactoe[4] = game[message.author.id].Symbol;
    game[cUser.id].Tictactoe[4] = game[message.author.id].Symbol;
    game[message.author.id].Turn = "Next";
    game[cUser.id].Turn = "Current";

    detectEnd();
  }
}else if (tInput == "right"){
  if(game[message.author.id].Status != "InGame"){
    message.channel.send("`You are not in a game do $tictactoe challenge [Person] to start one.`");
  }else if(game[message.author.id].Turn != "Current"){
    message.channel.send("`It is not your turn!`");
  }else if(game[message.author.id].Tictactoe[5] != " "){
    message.channel.send("`That space is already taken!`");
  }else{
    let cUser = message.guild.member(game[message.author.id].Playing);
    game[message.author.id].Tictactoe[5] = game[message.author.id].Symbol;
    game[cUser.id].Tictactoe[5] = game[message.author.id].Symbol;
    game[message.author.id].Turn = "Next";
    game[cUser.id].Turn = "Current";

    detectEnd();
  }
}else if (tInput == "bottomleft"){
  if(game[message.author.id].Status != "InGame"){
    message.channel.send("`You are not in a game do $tictactoe challenge [Person] to start one.`");
  }else if(game[message.author.id].Turn != "Current"){
    message.channel.send("`It is not your turn!`");
  }else if(game[message.author.id].Tictactoe[6] != " "){
    message.channel.send("`That space is already taken!`");
  }else{
    let cUser = message.guild.member(game[message.author.id].Playing);
    game[message.author.id].Tictactoe[6] = game[message.author.id].Symbol;
    game[cUser.id].Tictactoe[6] = game[message.author.id].Symbol;
    game[message.author.id].Turn = "Next";
    game[cUser.id].Turn = "Current";

    detectEnd();
  }
}else if (tInput == "bottom"){
  if(game[message.author.id].Status != "InGame"){
    message.channel.send("`You are not in a game do $tictactoe challenge [Person] to start one.`");
  }else if(game[message.author.id].Turn != "Current"){
    message.channel.send("`It is not your turn!`");
  }else if(game[message.author.id].Tictactoe[7] != " "){
    message.channel.send("`That space is already taken!`");
  }else{
    let cUser = message.guild.member(game[message.author.id].Playing);
    game[message.author.id].Tictactoe[7] = game[message.author.id].Symbol;
    game[cUser.id].Tictactoe[7] = game[message.author.id].Symbol;
    game[message.author.id].Turn = "Next";
    game[cUser.id].Turn = "Current";

    detectEnd();
  }
}else if (tInput == "bottomright"){
  if(game[message.author.id].Status != "InGame"){
    message.channel.send("`You are not in a game do $tictactoe challenge [Person] to start one.`");
  }else if(game[message.author.id].Turn != "Current"){
    message.channel.send("`It is not your turn!`");
  }else if(game[message.author.id].Tictactoe[8] != " "){
    message.channel.send("`That space is already taken!`");
  }else{
    let cUser = message.guild.member(game[message.author.id].Playing);
    game[message.author.id].Tictactoe[8] = game[message.author.id].Symbol;
    game[cUser.id].Tictactoe[8] = game[message.author.id].Symbol;
    game[message.author.id].Turn = "Next";
    game[cUser.id].Turn = "Current";

    detectEnd();
  }
}else if(tInput == "help"){
  message.channel.send("```|TopLeft   |Top   |TopRight   |\n-------------------------------\n|Left      |Middle|Right      |\n-------------------------------\n|BottomLeft|Bottom|BottomRight|```");
}else if(args[1]){
  let tInput2 = args[1].toLowerCase();
  if(tInput == "challenge"){
    let cUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!cUser) return message.channel.send(response.missing_user);

    game[cUser.id] = {
      ECard_Played: "None",
      ECard_Character: "None",
      ECard_Deck: ["Blank", "Blank", "Blank", "Blank", "Blank"],
      Tictactoe_Wins: 0,
      Tictactoe_Losses: 0,
      Tictactoe: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      Symbol: "None",
      Turn: "Next",
      Playing: "Nobody",
      Game: "None",
      Status: "Closed"
    };
  }

    cUsername = cUser.user.username;
    if(game[cUser.id].Status == "Closed"){
      message.channel.send(response.Closed.format(cUsername));
    }else if(game[cUser.id].Status == "InGame"){
      let pUser = message.guild.member(game[cUser.id].Playing)
      message.channel.send(response.InGame.format(cUsername, game[cUser.id].Game, pUser.user.username));
    }else if(game[cUser.id].Status == "Open"){
      message.channel.send(response.Open.format(cUsername, "TicTacToe"));
      game[message.author.id].Status = "InGame";
      game[cUser.id].Status = "InGame";
      game[message.author.id].Game = "TicTacToe";
      game[cUser.id].Game = "TicTacToe";
      game[message.author.id].Playing = cUser.id;
      game[cUser.id].Playing = message.author.id;
      let turnChoice = getRandomInt(1, 2);
      if(turnChoice == 1){
        game[message.author.id].Turn = "Current";
        game[message.author.id].Symbol = "X";
        game[cUser.id].Symbol = "O";


        message.channel.send(response.tictactoe_start.format(`<@${message.author.id}>`, `<@${cUser.id}>`));
      }else if(turnChoice == 2){
        game[cUser.id].Turn = "Current";
        game[cUser.id].Symbol = "X";
        game[message.author.id].Symbol = "O️";

        message.channel.send(response.tictactoe_start.format(`<@${cUser.id}>`, `<@${message.author.id}>`));
      }
      message.channel.send("```| | | |\n-------\n| | | |\n-------\n| | | |```");
    }
  }else{
    message.channel.send("`You can't do this with this command!`");
  }
  fs.writeFile("./game.json", JSON.stringify(game), (err) => {
    if(err) console.log(err)
  });
}

module.exports.help = {
name: "tictactoe",
aliases: []
}
