const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
let random_messages = require("../random_messages.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "randommessage");

  //$randommessage
  let powerRole = message.guild.roles.get("631270628024123402");
  console.log(powerRole.name);

  if (!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.roles.has(powerRole.id))
  {
    return message.channel.send(response.missing_permissions);
  }

  if (!args[0]) return message.channel.send(response.missing_value);

  if (args[0].toLowerCase() == "send") {
    msg = Math.floor((Math.random() * random_messages.random_messages.length));
    return message.channel.send(random_messages.random_messages[msg]);
  }

  if (!args[1]) return message.channel.send(response.missing_value);

  if (args[0].toLowerCase() == "add") {
    newmessage = args.slice(1).join(" ");
    random_messages.random_messages.push(newmessage);
    message.channel.send("`Message Added`");
  } else if (args[0].toLowerCase() == "delete") {
    deletemessage = args.slice(1).join(" ");
    var index = random_messages.random_messages.indexOf(deletemessage);
    if (index > -1) {
      random_messages.random_messages.splice(index, 1);
    }
    message.channel.send("`Message Deleted`");
  } else if (args[0].toLowerCase() == "turn") {
    if (args[1].toLowerCase() == "on") {
      random_messages.do_random_messages = "true";
      message.channel.send("`Random messages turned on.`");
    } else if (args[1].toLowerCase() == "off") {
      random_messages.do_random_messages = "false";
      message.channel.send("`Random messages turned off.`");
    } else {
      message.channel.send("`You can't do that with this command!`");
    }
  } else {
    message.channel.send("`You can't do that with this command!`");
  }
  fs.writeFile("./random_messages.json", JSON.stringify(random_messages), (err) => {
    if (err) cosole.log(err)
  });
}

module.exports.help = {
  name: "randommessage",
  aliases: ["rm"]
}
