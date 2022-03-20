const Discord = require("discord.js");
const fs = require("fs");
let config = require("../botconfig.json");

module.exports.CardGen = (number, suit, name) => {

    if(number != "Hidden"){
        card = [
          ["```"],
          [`┌─────────┐`],
          [`│${number}        │`],
          [`│         │`],
          [`│         │`],
          [`│    ${suit}    │`],
          [`│         │`],
          [`│         │`],
          [`│        ${number}│`],
          [`└─────────┘`],
          [`${name}`],
          ["```"]
      ]
    }else{
      card = [
          ["```"],
          ['┌─────────┐'],
          ['│░░░░░░░░░│'],
          ['│░░░░░░░░░│'],
          ['│░░░░░░░░░│'],
          ['│░░░░░░░░░│'],
          ['│░░░░░░░░░│'],
          ['│░░░░░░░░░│'],
          ['│░░░░░░░░░│'],
          ['└─────────┘'],
          ["```"]
      ]
    }
    return card;
}
