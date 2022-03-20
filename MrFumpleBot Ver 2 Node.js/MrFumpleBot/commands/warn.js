const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");
const fs = require("fs");
const ms = require("ms");
const botconfig = require("../botconfig.json");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"))

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "warn");

  //$warn [Mentioned Person] [Reason]
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(response.missing_permissions);
  let wUser = message.guild.member(message.mentions.users.first())
  if(!wUser) return message.channel.send(response.missing_user);
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(response.unwarnable);
  let reason = args.join(" ").slice(22);
  if(!reason) return message.channel.send(response.missing_reason);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription(response.warn_title)
  .setAuthor(message.author.username)
  .setColor(color.orange_red)
  .addField(response.warned_user_title, `<@${wUser.id}>`)
  .addField(response.warned_in_title, message.channel)
  .addField(response.warn_number_title, warns[wUser.id].warns)
  .addField(response.warn_reason_title, reason);

  let warnChannel = message.guild.channels.find(c => c.name === botconfig.incident_channel_name);
  if(!warnChannel) return message.channel.reply(response.missing_incidents);

  warnChannel.send(warnEmbed);

  if(warns[wUser.id].warns == 1)
  {
    message.channel.send(response.warned.format(wUser.id));
  }
  if(warns[wUser.id].warns == 2)
  {
    message.channel.send(response.warned.format(wUser.id));
    let muterole = message.guild.roles.find(r => r.name === botconfig.mute_role_name);
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: botconfig.mute_role_name,
          color: color.lightgray,
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }

    let mutetime = botconfig.warn_level_two_time_muted;
    await(wUser.addRole(muterole.id));
    message.channel.send(response.warn_muted.format(wUser));

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.channel.send(response.warn_unmuted.format(wUser.id));
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 3)
  {
    message.channel.send(response.warned.format(wUser.id));
    message.guild.member(wUser).ban(reason);
    message.channel.send(response.warn_banned);
  }
}

module.exports.help = {
  name: "warn",
  aliases: []
}
