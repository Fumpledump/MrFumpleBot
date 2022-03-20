const Discord = require("discord.js");
const fs = require("fs");
let config = require("../botconfig.json");
let fumplebucks = require("../fumplebucks.json");
let xp = require("../xp.json");
let stats = require("../stats.json");
let crime = require("../crime.json");
let game = require("../game.json");
let random_messages = require("../random_messages.json");
let cooldowns = JSON.parse(fs.readFileSync('./cooldowns.json', 'utf8'));
let mystocks = JSON.parse(fs.readFileSync('./mystocks.json', 'utf8'));
const response = require("../responses.json");
let users = require("../users.json");

module.exports.SaveAll = (message) => {
fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
});

fs.writeFile("./fumplebucks.json", JSON.stringify(fumplebucks), (err) => {
  if(err) console.log(err)
});

fs.writeFile("./stats.json", JSON.stringify(stats), (err) => {
  if(err) console.log(err)
});

fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
  if(err) console.log(err)
});

fs.writeFile("./crime.json", JSON.stringify(crime), (err) => {
  if(err) console.log(err)
});

fs.writeFile("./game.json", JSON.stringify(game), (err) => {
  if(err) console.log(err)
});
fs.writeFile("./random_messages.json", JSON.stringify(random_messages), (err) => {
  if(err) cosole.log(err)
});
fs.writeFile("./mystocks.json", JSON.stringify(mystocks), (err) => {
  if(err) cosole.log(err)
});
fs.writeFile("./users.json", JSON.stringify(users), (err) => {
  if(err) cosole.log(err)
});
}

module.exports.NewUser = (new_user_id) => {
  if(!fumplebucks[new_user_id]){
    fumplebucks[new_user_id] = {
      fumplebucks: 0,
      dumplings: 0,
      stash: 0
    };
  }

  if(!fumplebucks[new_user_id].dumplings){
    fumplebucks[new_user_id].dumplings = 0;
  }

  if(!xp[new_user_id]){
    xp[new_user_id] = {
      xp: 0,
      level: 1,
      skillpoints: 0
    };
  }

  if(!stats[new_user_id]){
    stats[new_user_id] = {
      bio: response.unknown_bio,
      slotmachine_pulls: 0,
      gamble_wins: 0,
      gamble_loses: 0,
      russian_roulettes_survived: 0,
      russian_roulettes_deaths: 0
    };
  }
  if(!crime[new_user_id]){
    crime[new_user_id] = {
      stolen_fumplebucks_earned: 0,
      fumplebucks_stolen: 0,
      successful_mugs: 0,
      unsuccessful_mugs: 0
    };
  }

  if(!cooldowns[new_user_id]){
    cooldowns[new_user_id] = {
      last_daily: "Never Done",
      daily_done: "No",
      last_tweet: "Never Done",
      tweet_done: "No",
      last_mug: "Never Done",
      mug_done: "No"
    };
  }

  if(!game[new_user_id]){
    game[new_user_id] = {
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

  if(!mystocks[new_user_id]){
    mystocks[new_user_id] = {
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

  if(!users[new_user_id]){
    users[new_user_id] = {
      Id: new_user_id
    };
  }
}

module.exports.SetDefaultGame = (message, userid) => {
  game[userid] = {
    ECard_Played: "None",
    ECard_Character: "None",
    ECard_Deck: ["Blank", "Blank", "Blank", "Blank", "Blank"],
    Ecard_Wins: game[userid].Ecard_Wins,
    Ecard_Losses: game[userid].Ecard_Losses,
    Tictactoe_Wins: game[userid].Tictactoe_Wins,
    Tictactoe_Losses: game[userid].Tictactoe_Losses,
    Tictactoe: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    Symbol: "None",
    Turn: "Next",
    Playing: "Nobody",
    Game: "None",
    Status: "Closed"
  };
}


module.exports.NewUserGame = (message, userid) => {
  game[userid] = {
    ECard_Played: "None",
    ECard_Character: "None",
    ECard_Deck: ["Blank", "Blank", "Blank", "Blank", "Blank"],
    ECard_Ready: "Not",
    Ecard_Wins: 0,
    Ecard_Losses: 0,
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
