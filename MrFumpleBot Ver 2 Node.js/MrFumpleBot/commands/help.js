const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "help")

  //$help [Optional Command Name]
  let helpmenuEmbed = new Discord.RichEmbed()
  .setTitle(response.help_menu_title)
  .setThumbnail("https://cdn.discordapp.com/attachments/506170814622728202/516513258673405952/question-mark-1750942_960_720.png")
  .setColor(color.royal_blue)
  .addField(response.help_menu_help_title, response.help_menu_help.format(botconfig.botname))
  .addField(response.help_menu_list_title, response.list_of_commands);

  let helptopic = args.join(" ").toLowerCase();
  if(!helptopic) return message.channel.send(helpmenuEmbed)

  var helpmessage = function(command_name, command_format, command_aliases, command_description)
  {
      let helpEmbed = new Discord.RichEmbed()
      .setTitle(response.help_title.format(command_name))
      .setColor(color.royal_blue)
      .setThumbnail("https://cdn.discordapp.com/attachments/506170814622728202/516513258673405952/question-mark-1750942_960_720.png")
      .addField(response.command_format_title, command_format)
      .addField(response.command_alias_title, command_aliases)
      .addField(response.command_description_title.format(command_name), command_description);

      return message.channel.send(helpEmbed);
  }
  switch(helptopic) {
    case "8ball":
      helpmessage("8ball", response.eightball_command_format, response.no_aliases, response.eightball_command_description);
      break;
    case "addrole":
        helpmessage("addrole", response.addrole_command_format, response.no_aliases, response.addrole_command_description);
        break;
    case "ban":
        helpmessage("ban", response.ban_command_format, response.no_aliases, response.ban_command_description);
        break;
    case "botinfo":
        helpmessage("botinfo", response.botinfo_command_format, response.no_aliases, response.botinfo_command_description.format(botconfig.botname));
        break;
    case "cat":
        helpmessage("cat", response.cat_command_format, response.no_aliases, response.cat_command_description);
        break;
    case "dog":
        helpmessage("dog", response.dog_command_format, response.no_aliases, response.dog_command_description);
        break;
    case "the n word":
    case "greetings":
    case "salutations":
    case "sup":
    case "hiya":
    case "howdy":
    case "yo":
    case "hey":
    case "hi":
    case "hello":
        helpmessage("hello", response.hello_command_format, response.hello_command_aliases, response.hello_command_description);
        break;
    case "help":
        helpmessage("help", response.help_command_format, response.no_aliases, response.help_command_description.format(botconfig.botname));
        break;
    case "kick":
        helpmessage("kick", response.kick_command_format, response.no_aliases, response.kick_command_description.format(botconfig.botname));
        break;
    case "removerole":
        helpmessage("removerole", response.removerole_command_format, response.no_aliases, response.removerole_command_description.format(botconfig.botname));
        break;
    case "report":
        helpmessage("report", response.report_command_format, response.no_aliases, response.report_command_description.format(botconfig.botname));
        break;
    case "serverinfo":
        helpmessage("serverinfo", response.serverinfo_command_format, response.no_aliases, response.serverinfo_command_description.format(botconfig.botname));
        break;
    case "tempmute":
        helpmessage("tempmute", response.tempmute_command_format, response.no_aliases, response.tempmutecommand_description.format(botconfig.botname));
        break;
    case "testcommand":
        helpmessage("testcommand", response.testcommand_command_format, response.no_aliases, response.testcommand_command_description.format(botconfig.botname));
        break;
    case "tweet":
        helpmessage("tweet", response.tweet_command_format, response.no_aliases, response.tweet_command_description.format(botconfig.botname));
        break;
    case "warn":
        helpmessage("warn", response.warn_command_format, response.no_aliases, response.warn_command_description.format(botconfig.botname));
        break;
    case "warnlevel":
        helpmessage("warnlevel", response.warnlevel_command_format, response.no_aliases, response.warnlevel_command_description.format(botconfig.botname));
        break;
    default:
        return message.channel.send(response.help_unknown_commmand);
 }
}

module.exports.help = {
  name: "help",
  aliases: []
}
