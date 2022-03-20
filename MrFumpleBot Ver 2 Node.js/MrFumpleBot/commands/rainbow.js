const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const botconfig = require("../botconfig.json");
const reskins = require("../reskins.json");
const fs = require("fs");
const color = require("../colors.json");
let rainbow_Num = 1;


module.exports.run = (bot, message, args) => {
  //Logging Command
  logcommand(message, "reskin");
  //$reskin
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(response.missing_permissions)

  let server = bot.guilds.get("411715542467215362");
  let rainbow_Role = server.roles.get("625471659087888395");

  setInterval(() => {
    switch (rainbow_Num) {
      case 1:
        rainbow_Role.setColor(color.red);
        rainbow_Num = 2;
        break;
      case 2:
        rainbow_Role.setColor(color.orange);
        rainbow_Num = 3;
        break;
      case 3:
        rainbow_Role.setColor(color.yellow);
        rainbow_Num = 4;
        break;
      case 4:
        rainbow_Role.setColor(color.lime);
        rainbow_Num = 5;
        break;
      case 5:
        rainbow_Role.setColor(color.royal_blue);
        rainbow_Num = 6;
        break;
      case 6:
        rainbow_Role.setColor(color.purple);
        rainbow_Num = 7;
        break;
      case 7:
        rainbow_Role.setColor(color.violet);
        rainbow_Num = 1;
        break;
    }
  }, 10 * 1000);
  message.channel.send("`Rainbow Role has been activated.`");
}

module.exports.help = {
  name: "rainbow",
  aliases: []
}
