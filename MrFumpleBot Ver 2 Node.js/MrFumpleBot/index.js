const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const response = require("./responses.json");
const bot = new Discord.Client({
  disableEveryone: true
});
const format = require("./format.js");
const color = require("./colors.json");
let fumplebucks = require("./fumplebucks.json");
let xp = require("./xp.json");
let stats = require("./stats.json");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
let cooldown = new Set();
let cdseconds = 3;
let cooldowns = JSON.parse(fs.readFileSync('./cooldowns.json', 'utf8'));
let crime = require("./crime.json");
let random_messages = require("./random_messages.json");
let game = require("./game.json");
let save = require("./utils/save.js");
let mystocks = require("./mystocks.json");

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);

    props.help.aliases.forEach(alias => {

      bot.aliases.set(alias, props.help.name);

    });
  });
});

bot.on("ready", async () => {
  for (x in cooldowns) {
    cooldowns[x].daily_done = "No";
    cooldowns[x].tweet_done = "No";
    cooldowns[x].telegraph_done = "No";
    cooldowns[x].mug_done = "No";
  }
  fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
    if (err) cosole.log(err)
  });

  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("with your MIND", {
    type: "PLAYING"
  });

  function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low)
  }

  let msgInterval = randomInt(7200, 25200);

  function randomMessage() {
    msgInterval = randomInt(7200, 25200);
    console.log("Random Message Sent.");
    if (random_messages.do_random_messages == "true") {
      message = Math.floor((Math.random() * random_messages.random_messages.length));
      bot.guilds.get("411715542467215362").channels.get("411715542924263427").send(random_messages.random_messages[message]);
    }
  }

  //let logchannel = bot.guilds.get("411715542467215362").channels.get("489963488949567498").send("$stock start");


  setInterval(randomMessage, msgInterval * 1000);
});

bot.on('error', async (error) => {
  console.log(error)
})


bot.on("messageUpdate", async (oldMessage, newMessage) => {
  console.log(response.console_event_messageUpdated.format(oldMessage.author.username));
  let logchannel = oldMessage.guild.channels.find(c => c.name === botconfig.log_channel_name);

  if (oldMessage.author.username = botconfig.botname) return;

  let messageUpdateembed = new Discord.RichEmbed()
    .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL)
    .setTitle(response.messageUpdated_title.format(oldMessage.author.tag, oldMessage.channel.name))
    .addField(response.messageUpdated_oldMessage_title, oldMessage.content)
    .addField(response.messageUpdated_newMessage_title, newMessage.content)
    .setFooter(response.User_ID_Footer.format(oldMessage.author.id))
    .setColor(color.orange)
    .setTimestamp();

  logchannel.send(messageUpdateembed);
});

bot.on("messageDelete", async (messageDelete, channel) => {
  console.log(response.console_event_messageDelete.format(messageDelete.author.username));
  let logchannel = bot.guilds.get("411715542467215362").channels.get("497940495327035433");

  let deletedmessageembed = new Discord.RichEmbed()
    .setAuthor(messageDelete.author.username, messageDelete.author.avatarURL)
    .addField(response.messageDelete_title.format(messageDelete.author.tag, messageDelete.channel.name), messageDelete.content)
    .setFooter(response.User_ID_Footer.format(messageDelete.author.id))
    .setColor(color.crimson)
    .setTimestamp();

  logchannel.send(deletedmessageembed);
});

bot.on("channelCreate", async (channel) => {
  console.log(response.console_event_channelCreate.format(channel.name));
  let logchannel = bot.guilds.get("411715542467215362").channels.get("497940495327035433");

  let channelcreatedembed = new Discord.RichEmbed()
    .setAuthor(channel.guild.name, channel.guild.iconURL)
    .setDescription(response.channelCreate_description.format(channel))
    .setFooter(response.channelCreate_footer.format(channel.id))
    .setColor(color.lime)
    .setTimestamp();

  let channeltype = channel.type;

  if (channel.guild.id == 411715542467215362) {
    bot.guilds.get("411715542467215362").createChannel(channel.name, {
        type: 'text'
      })
      .then(console.log)
      .catch(console.error);
  }
  logchannel.send(channelcreatedembed);
});

bot.on("channelDelete", async (channel) => {
  console.log(response.console_event_channelCreate.format(channel.name));
  let logchannel = bot.guilds.get("411715542467215362").channels.get("497940495327035433");



  let channeldeletedembed = new Discord.RichEmbed()
    .setAuthor(channel.guild.name, channel.guild.iconURL)
    .setDescription(response.channelDelete_description.format(channel.name))
    .setFooter(response.channelDeletefooter.format(channel.id))
    .setColor(color.crimson)
    .setTimestamp();

  logchannel.send(channeldeletedembed);
});

bot.on("guildMemberAdd", async (member) => {
  console.log(response.console_event_guildMemberAdd.format(member.id));

  let logchannel = member.guild.channels.find(c => c.name === botconfig.log_channel_name);
  let welcomechannel = member.guild.channels.find(c => c.name === botconfig.general_channel);

  let joinembed = new Discord.RichEmbed()
    .setAuthor(response.guildMemberAdd_title.format(member.user.username), `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.jpg`)
    .setColor(color.lime)
    .setTimestamp()
    .setFooter(response.User_ID_Footer.format(member.id))
    .setImage(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.jpg`);

  let result = Math.floor((Math.random() * response.join_messages.length));
  welcomechannel.send(response.join_messages[result].format(member));
  logchannel.send(joinembed);
});

bot.on("guildMemberRemove", async (member) => {
  console.log(response.console_event_guildMemberRemove.format(member.id));

  let logchannel = member.guild.channels.find(c => c.name === botconfig.log_channel_name);
  let farewellchannel = member.guild.channels.find(c => c.name === botconfig.general_channel);

  let result = Math.floor((Math.random() * response.goodbye_messages.length));

  let leaveembed = new Discord.RichEmbed()
    .setAuthor(response.guildMemberRemove_title.format(member.user.username), `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.jpg`)
    .setColor(color.crimson)
    .setTimestamp()
    .setFooter(response.User_ID_Footer.format(member.id))
    .setImage(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.jpg`);

  farewellchannel.send(response.goodbye_messages[result].format(member));
  logchannel.send(leaveembed);
});

function hook(channel, title, message, avatar, color) {
  if (!channel) return console.log("Channel not specified!");
  if (!title) return console.log("Title not specified!");
  if (!message) return console.log("Message not specified!");
  if (!color) color = "ff0000";
  if (!avatar) avatar = 'https://cdn.discordapp.com/attachments/564274775736975390/582480995895345152/chom_choms_fumpledump.png';

  color = color.replace(/\s/g, '');
  avatar = avatar.replace(/\s/g, '');

  channel.fetchWebhooks() // This gets the webhooks in the channel
    .then(webhook => {

      // Fetches the webhook we will use for each hook
      let foundHook = webhook.find("name", "Webhook");

      // This runs if the webhook is not found.
      if (!foundHook) {
        channel.createWebhook("Webhook", "https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png")
          .then(webhook => {
            webhook.send('', {
                "username": title,
                "avatarURL": avatar,
                "embeds": [{
                  "color": parseInt(`0x${color}`),
                  "description": message
                }]
              })
              .catch(error => {
                console.log(error)
                return channel.send("**Something went wrong when sending the webhook. Please check out console.**");
              })
          })
      } else {
        foundHook.send('', {
            "username": title,
            "avatarURL": avatar,
            "embeds": [{
              "color": parseInt(`0x${color}`),
              "description": message
            }]
          })
          .catch(error => {
            console.log(error)
            return channel.send("**Something went wrong when sending the webhook. Please check out console.**");
          })


      }
    })
}

bot.on("message", async (message) => {
  if (message.channel.type === "dm") return;

  save.NewUser(message.author.id);

  let xpAdd = Math.floor(Math.random() * 7) + 5;
  if (message.guild.id == 411715542467215362 || message.guild.id == 483302549235957773) {
    xp[message.author.id].xp = xp[message.author.id].xp + xpAdd;
  }

  let nextlevel = xp[message.author.id].level * xp[message.author.id].level * 300;
  let currentxp = xp[message.author.id].xp;
  let currentlevel = xp[message.author.id].level;

  if (nextlevel <= xp[message.author.id].xp) {
    xp[message.author.id].level = currentlevel + 1;
    xp[message.author.id].skillpoints = xp[message.author.id].skillpoints + 1;
    fumplebucks[message.author.id].fumplebucks = 50 * xp[message.author.id].level + fumplebucks[message.author.id].fumplebucks;

    let levelupembed = new Discord.RichEmbed()
      .setAuthor(response.levelup_title.format(message.author.username, xp[message.author.id].level), message.author.avatarURL)
      .setDescription(response.levelup_description.format(50 * xp[message.author.id].level, fumplebucks[message.author.id].fumplebucks, xp[message.author.id].level * xp[message.author.id].level * 300))
      .setColor(color.purple)
      .setTimestamp();

    message.channel.send(levelupembed);
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if (err) console.log(err)
  });
  save.SaveAll();

  let prefix = botconfig.prefix;
  let isBotRole = message.guild.roles.get("648755508794228736");
  let mrfumplebotrole = message.guild.roles.get("648752669615325185");
  let sctext = "{0}".format(message);
  if (!message.content.startsWith(prefix)){
    if(message.author.bot)
    {
      return;
    }
    if(message.member.roles.has(isBotRole.id)){
      message.delete().catch();
      message.channel.send(sctext);
    }else{
      return;
    }
  }
  if (cooldown.has(message.author.id)) {
    message.delete();
    return message.reply(response.cooldown_unexpired.format(cdseconds))
  }
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    cooldown.add(message.author.id);
  }
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  let commandFile;
  if (bot.commands.has(command.slice(prefix.length))) {
    commandFile = bot.commands.get(command.slice(prefix.length));
  } else if (bot.aliases.has(command.slice(prefix.length))) {
    commandFile = bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
  }
  if (commandFile) commandFile.run(bot, message, args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)
});

bot.login(botconfig.token);
