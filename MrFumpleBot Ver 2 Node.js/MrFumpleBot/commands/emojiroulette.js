const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");
const emojis = require("../emojis.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "emojiroulette");

  //$emojiroulette

    if (!args[0]) return message.channel.send(response.missing_value);
  
    if (args[0].toLowerCase() == "send") {
      msg = Math.floor((Math.random() * emojis.all.length));
      return message.channel.send(emojis.all[msg]);
    }
  
    if (!args[1]) return message.channel.send(response.missing_value);
  
    if (args[0].toLowerCase() == "add") {
      let powerRole = message.guild.roles.get("631270628024123402");
      console.log(powerRole.name);
    
      if (!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.has(powerRole.id))
      {
        return message.channel.send(response.missing_permissions);
      }

      newmessage = args.slice(1).join(" ");
      emojis.all.push(newmessage);
      message.channel.send("`Message Added`");
    } else if (args[0].toLowerCase() == "delete") {
      let powerRole = message.guild.roles.get("631270628024123402");
      console.log(powerRole.name);
    
      if (!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.has(powerRole.id))
      {
        return message.channel.send(response.missing_permissions);
      }

      deletemessage = args.slice(1).join(" ");
      var index = emojis.all.indexOf(deletemessage);
      if (index > -1) {
        emojis.all.splice(index, 1);
      }
      message.channel.send("`Message Deleted`");
    }else {
      message.channel.send("`You can't do that with this command!`");
    }
    fs.writeFile("./emojis.json", JSON.stringify(emojis), (err) => {
      if (err) cosole.log(err)
    });
}

module.exports.help = {
  name: "emojiroulette",
  aliases: ["er", "newemoji"]
}
