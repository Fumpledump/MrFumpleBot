const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "removerole");

  //$removerole [@Mentioned Person] [RoleName]
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.send(response.missing_permissions);
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.channel.send(response.missing_user);
  let role = args.join(" ").slice(22);
  if(!role) return message.channel.send(response.unspecified_role);
  let gRole = message.guild.roles.find(r => r.name === role);
  if (!gRole) return message.channel.send(response.missing_role);

  if(!rMember.roles.has(gRole.id)) return message.channel.send(response.role_not_achieved);
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(response.role_lost.format(gRole.name))
  }catch(e){
    message.channel.send(response.role_lost_locked.format(rMember.id, gRole.name))
  }
}

module.exports.help = {
  name: "removerole",
  aliases: []
}
