const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");
const botconfig = require("../botconfig.json");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "tempmute");

  //$tempmute [@Mentioned Person] [Time Muted]
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(response.missing_permissions)
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.channel.send(response.missing_user);
  if(tomute.hasPermission("MANAGE_ROLES")) return message.channel.send(response.unmuteable);
  let muterole = message.guild.roles.find(r => r.name === botconfig.mute_role_name);
  //start of create role
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
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.channel.send(response.unspecified_time);

  await(tomute.addRole(muterole.id));
  message.channel.send(response.user_muted.format(tomute.id, ms(mutetime)));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(response.user_unmuted.format(tomute.id))
  }, ms(mutetime));

}

module.exports.help = {
  name: "tempmute",
  aliases: []
}
