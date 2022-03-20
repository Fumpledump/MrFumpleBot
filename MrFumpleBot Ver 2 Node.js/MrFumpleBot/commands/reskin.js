const Discord = require("discord.js");
const response = require("../responses.json");
const format = require("../format.js");
const logcommand = require("../logcommand.js");
const botconfig = require("../botconfig.json");
const reskins = require("../reskins.json");
const fs = require("fs");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "reskin");
  //$reskin
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(response.missing_permissions)
  //server
  let server = bot.guilds.get("411715542467215362");
  //logs
  let log_Category = server.channels.get("549444169723150336");
  let command_Logs = server.channels.get("549441481392390144");
  let bot_Logs = server.channels.get("497940495327035433");
  let dyno_Logs = server.channels.get("558167797415411712");
  let dev_Logs = server.channels.get("575536451530260480");
  //General Channels
  let general_Category = server.channels.get("411715542924263426");
  let rules = server.channels.get("411738049802928138");
  let religous_Rules = server.channels.get("427671711631147008");
  let ads = server.channels.get("443589037383483402");
  let news = server.channels.get("490952141851328522");
  let general_Chat = server.channels.get("411715542924263427");
  let memes = server.channels.get("411929664576159755");
  let suggestions = server.channels.get("412269854809391114");
  let bot_Channel = server.channels.get("421081688555388928");
  let fumplestocks = server.channels.get("489963488949567498");
  let stocks_Channel = server.channels.get("411922800895590401");
  let auction = server.channels.get("449776681776054292");
  let bids = server.channels.get("455218919884587019");
  let music_Channel = server.channels.get("411934315660967966");
  let revolution = server.channels.get("412294660950851586");
  let nsfw_Channel = server.channels.get("412270412110495756");
  //Game Channels
  let game_Category = server.channels.get("568136147956531243");
  let deals_Channel = server.channels.get("568136467281346571");
  let fire_Channel = server.channels.get("497819882558324746");
  let smash_Channel = server.channels.get("568134943025266730");
  //Kyle's Stuff
  let kyle_Category = server.channels.get("419956757956263947");
  let kyle_Stories = server.channels.get("419958199765172265");
  let appeasement = server.channels.get("419956009122005013");
  //Owned Channels
  let owned_Category = server.channels.get("450114745651953677");
  //Voice Channels
  let voice_Category = server.channels.get("411715542924263428");
  let screenshare = server.channels.get("587217902613037076");
  let community_Chat = server.channels.get("447899388430254082");
  let saloon = server.channels.get("411738274915418112");
  let admin_Chat = server.channels.get("549449979627044865");
  let music_Chat = server.channels.get("411745847995531265");
  let afk_Channel = server.channels.get("411721303461068811");
  //Game Voice Channels
  let gvoice_Category = server.channels.get("411923742525095937");
  //Admin Channels
  let admin_Category = server.channels.get("422074973566402560");
  //Roles
  let micah_Role = server.roles.get("549664884590247987");
  let john_Role = server.roles.get("548417242795212800");
  let kyle_Role = server.roles.get("548418266008125440");
  let marco_Role = server.roles.get("548419176474214403");
  let chris_Role = server.roles.get("553423942522634242");
  let bot_Role = server.roles.get("548417872393928716");
  let nic_Role = server.roles.get("623333308197240852");
  let the_Bots_Role = server.roles.get("411931736717524992");
  let nic_Rank2 = server.roles.get("569716627738722306");
  let punish_Role = server.roles.get("489653749586067456");
  let reporter_Role = server.roles.get("459476995919708172");
  let kyle_Rank2 = server.roles.get("548627777398767616");
  let kyle_Rank1 = server.roles.get("548418776887066638");
  let john_Rank2 = server.roles.get("548417724276015104");
  let nic_Rank1 = server.roles.get("548417666180841493");
  let john_Rank1 = server.roles.get("548420547671752705");
  let slaves_Role = server.roles.get("623296248384061460");
  let scarborough_Role = server.roles.get("548421742935408651");
  //command Stuff
  let timerValue = 3000

  let choice = args.slice(0).join(" ");

  function reskinSystem(inputed_Reskin) {

    setTimeout(() => {
      message.channel.send("`Starting Text Channels Reskin`");
      log_Category.setName(reskins[inputed_Reskin].log_category_Name)
    }, timerValue);

    setTimeout(() => {
      command_Logs.setName(reskins[inputed_Reskin].command_logs_Name)
    }, timerValue * 2);
    setTimeout(() => {
      command_Logs.setTopic(reskins[inputed_Reskin].command_logs_Topic)
    }, timerValue * 3);

    setTimeout(() => {
      bot_Logs.setName(reskins[inputed_Reskin].bot_logs_Name)
    }, timerValue * 4);
    setTimeout(() => {
      bot_Logs.setTopic(reskins[inputed_Reskin].bot_logs_Topic)
    }, timerValue * 5);

    setTimeout(() => {
      dyno_Logs.setName(reskins[inputed_Reskin].dyno_logs_Name)
    }, timerValue * 6);
    setTimeout(() => {
      dyno_Logs.setTopic(reskins[inputed_Reskin].dyno_logs_Topic)
    }, timerValue * 7);

    setTimeout(() => {
      dev_Logs.setName(reskins[inputed_Reskin].dev_logs_Name)
    }, timerValue * 8);
    setTimeout(() => {
      dev_Logs.setTopic(reskins[inputed_Reskin].dev_logs_Topic)
    }, timerValue * 9);

    setTimeout(() => {
      general_Category.setName(reskins[inputed_Reskin].general_category_Name)
    }, timerValue * 10);

    setTimeout(() => {
      rules.setName(reskins[inputed_Reskin].rules_Name)
    }, timerValue * 11);
    setTimeout(() => {
      rules.setTopic(reskins[inputed_Reskin].rules_Topic)
    }, timerValue * 12);

    setTimeout(() => {
      religous_Rules.setName(reskins[inputed_Reskin].religous_rules_Name)
    }, timerValue * 13);
    setTimeout(() => {
      religous_Rules.setTopic(reskins[inputed_Reskin].religous_rules_Topic)
    }, timerValue * 14);

    setTimeout(() => {
      ads.setName(reskins[inputed_Reskin].ads_Name)
    }, timerValue * 15);
    setTimeout(() => {
      ads.setTopic(reskins[inputed_Reskin].ads_Topic)
    }, timerValue * 16);

    setTimeout(() => {
      news.setName(reskins[inputed_Reskin].news_Name)
    }, timerValue * 17);

    setTimeout(() => {
      general_Chat.setName(reskins[inputed_Reskin].general_chat_Name)
    }, timerValue * 18);
    setTimeout(() => {
      general_Chat.setTopic(reskins[inputed_Reskin].general_chat_Topic)
    }, timerValue * 19);

    setTimeout(() => {
      memes.setName(reskins[inputed_Reskin].memes_Name)
    }, timerValue * 20);
    setTimeout(() => {
      memes.setTopic(reskins[inputed_Reskin].memes_Topic)
    }, timerValue * 21);

    setTimeout(() => {
      suggestions.setName(reskins[inputed_Reskin].suggestions_Name)
    }, timerValue * 22);
    setTimeout(() => {
      suggestions.setTopic(reskins[inputed_Reskin].suggestions_Topic)
    }, timerValue * 23);

    setTimeout(() => {
      bot_Channel.setName(reskins[inputed_Reskin].bot_channel_Name)
    }, timerValue * 24);
    setTimeout(() => {
      bot_Channel.setTopic(reskins[inputed_Reskin].bot_channel_Topic)
    }, timerValue * 25);

    setTimeout(() => {
      fumplestocks.setName(reskins[inputed_Reskin].fumplestocks_Name)
    }, timerValue * 26);
    setTimeout(() => {
      fumplestocks.setTopic(reskins[inputed_Reskin].fumplestocks_Topic)
    }, timerValue * 27);

    setTimeout(() => {
      stocks_Channel.setName(reskins[inputed_Reskin].stocks_channel_Name)
    }, timerValue * 28);
    setTimeout(() => {
      stocks_Channel.setTopic(reskins[inputed_Reskin].stocks_channel_Topic)
    }, timerValue * 29);

    setTimeout(() => {
      auction.setName(reskins[inputed_Reskin].auction_Name)
    }, timerValue * 30);
    setTimeout(() => {
      auction.setTopic(reskins[inputed_Reskin].auction_Topic)
    }, timerValue * 31);

    setTimeout(() => {
      bids.setName(reskins[inputed_Reskin].bids_Name)
    }, timerValue * 32);
    setTimeout(() => {
      bids.setTopic(reskins[inputed_Reskin].bids_Topic)
    }, timerValue * 33);

    setTimeout(() => {
      music_Channel.setName(reskins[inputed_Reskin].music_channel_Name)
    }, timerValue * 34);
    setTimeout(() => {
      music_Channel.setTopic(reskins[inputed_Reskin].music_channel_Topic)
    }, timerValue * 35);

    setTimeout(() => {
      revolution.setName(reskins[inputed_Reskin].revolution_Name)
    }, timerValue * 36);
    setTimeout(() => {
      revolution.setTopic(reskins[inputed_Reskin].revolution_Topic)
    }, timerValue * 37);

    setTimeout(() => {
      nsfw_Channel.setName(reskins[inputed_Reskin].nsfw_channel_Name)
    }, timerValue * 38);
    setTimeout(() => {
      nsfw_Channel.setTopic(reskins[inputed_Reskin].nsfw_channel_Topic)
    }, timerValue * 39);
    //fix
    setTimeout(() => {
      game_Category.setName(reskins[inputed_Reskin].game_category_Name)
    }, timerValue * 40);

    setTimeout(() => {
      deals_Channel.setName(reskins[inputed_Reskin].deals_channel_Name)
    }, timerValue * 41);
    setTimeout(() => {
      deals_Channel.setTopic(reskins[inputed_Reskin].deals_channel_Topic)
    }, timerValue * 42);

    setTimeout(() => {
      fire_Channel.setName(reskins[inputed_Reskin].fire_channel_Name)
    }, timerValue * 43);
    setTimeout(() => {
      nsfw_Channel.setTopic(reskins[inputed_Reskin].fire_channel_Topic)
    }, timerValue * 44);

    setTimeout(() => {
      smash_Channel.setName(reskins[inputed_Reskin].smash_channel_Name)
    }, timerValue * 45);
    setTimeout(() => {
      nsfw_Channel.setTopic(reskins[inputed_Reskin].smash_channel_Topic)
    }, timerValue * 46);

    setTimeout(() => {
      kyle_Category.setName(reskins[inputed_Reskin].kyle_category_Name)
    }, timerValue * 47);

    setTimeout(() => {
      kyle_Stories.setName(reskins[inputed_Reskin].kyle_stories_Name)
    }, timerValue * 48);
    setTimeout(() => {
      kyle_Stories.setTopic(reskins[inputed_Reskin].kyle_stories_Topic)
    }, timerValue * 49);

    setTimeout(() => {
      appeasement.setName(reskins[inputed_Reskin].appeasement_Name)
    }, timerValue * 50);
    setTimeout(() => {
      appeasement.setTopic(reskins[inputed_Reskin].appeasement_Topic)
    }, timerValue * 51);

    setTimeout(() => {
      owned_Category.setName(reskins[inputed_Reskin].owned_category_Name)
    }, timerValue * 52);

    setTimeout(() => {
      voice_Category.setName(reskins[inputed_Reskin].voice_category_Name)
    }, timerValue * 53);

    setTimeout(() => {
      screenshare.setName(reskins[inputed_Reskin].screenshare_Name)
    }, timerValue * 54);
    setTimeout(() => {
      screenshare.setTopic(reskins[inputed_Reskin].screenshare_Topic)
    }, timerValue * 55);

    setTimeout(() => {
      community_Chat.setName(reskins[inputed_Reskin].community_chat_Name)
    }, timerValue * 56);

    setTimeout(() => {
      saloon.setName(reskins[inputed_Reskin].saloon_Name)
    }, timerValue * 57);

    setTimeout(() => {
      admin_Chat.setName(reskins[inputed_Reskin].admin_chat_Name)
    }, timerValue * 58);

    setTimeout(() => {
      music_Chat.setName(reskins[inputed_Reskin].music_chat_Name)
    }, timerValue * 59);

    setTimeout(() => {
      afk_Channel.setName(reskins[inputed_Reskin].afk_channe_Name)
    }, timerValue * 60);

    setTimeout(() => {
      gvoice_Category.setName(reskins[inputed_Reskin].gvoice_category_Name)
    }, timerValue * 61);

    setTimeout(() => {
      admin_Category.setName(reskins[inputed_Reskin].admin_category_Name)
      message.channel.send("`Text Channels Reskin Complete!`");

    }, timerValue * 62);



    setTimeout(() => {
      message.channel.send("`Starting Role Names Reskin`");
      micah_Role.setName(reskins[inputed_Reskin].micah_role_Name)
    }, timerValue * 63);

    setTimeout(() => {
      john_Role.setName(reskins[inputed_Reskin].john_role_Name)
    }, timerValue * 63);

    setTimeout(() => {
      kyle_Role.setName(reskins[inputed_Reskin].kyle_role_Name)
    }, timerValue * 64);

    setTimeout(() => {
      marco_Role.setName(reskins[inputed_Reskin].marco_role_Name)
    }, timerValue * 64);

    setTimeout(() => {
      chris_Role.setName(reskins[inputed_Reskin].chris_role_Name)
    }, timerValue * 65);

    setTimeout(() => {
      bot_Role.setName(reskins[inputed_Reskin].bot_role_Name)
    }, timerValue * 66);

    setTimeout(() => {
      nic_Role.setName(reskins[inputed_Reskin].nic_role_Name)
    }, timerValue * 67);

    setTimeout(() => {
      the_Bots_Role.setName(reskins[inputed_Reskin].the_bots_role_Name)
    }, timerValue * 69);

    setTimeout(() => {
      nic_Rank2.setName(reskins[inputed_Reskin].nic_rank2_Name)
    }, timerValue * 70);

    setTimeout(() => {
      punish_Role.setName(reskins[inputed_Reskin].punish_role_Name)
    }, timerValue * 71);

    setTimeout(() => {
      reporter_Role.setName(reskins[inputed_Reskin].reporter_role_Name)
    }, timerValue * 72);

    setTimeout(() => {
      kyle_Rank2.setName(reskins[inputed_Reskin].kyle_rank2_Name)
    }, timerValue * 73);

    setTimeout(() => {
      kyle_Rank1.setName(reskins[inputed_Reskin].kyle_rank1_Name)
    }, timerValue * 74);

    setTimeout(() => {
      john_Rank2.setName(reskins[inputed_Reskin].john_rank2_Name)
    }, timerValue * 75);

    setTimeout(() => {
      nic_Rank1.setName(reskins[inputed_Reskin].nic_rank1_Name)
    }, timerValue * 76);

    setTimeout(() => {
      john_Rank1.setName(reskins[inputed_Reskin].john_rank1_Name)
    }, timerValue * 77);

    setTimeout(() => {
      slaves_Role.setName(reskins[inputed_Reskin].slaves_role_Name)
    }, timerValue * 78);

    setTimeout(() => {
      scarborough_Role.setName(reskins[inputed_Reskin].scarborough_role_Name)
      message.channel.send("`Role Names Reskin Complete!`");
    }, timerValue * 79);

    setTimeout(() => {
      message.channel.send("`Starting Role Colors Reskin`");
      micah_Role.setColor(reskins[inputed_Reskin].micah_role_Color)
    }, timerValue * 80);

    setTimeout(() => {
      john_Role.setColor(reskins[inputed_Reskin].john_role_Color)
    }, timerValue * 81);

    setTimeout(() => {
      kyle_Role.setColor(reskins[inputed_Reskin].kyle_role_Color)
    }, timerValue * 82);

    setTimeout(() => {
      marco_Role.setColor(reskins[inputed_Reskin].marco_role_Color)
    }, timerValue * 83);

    setTimeout(() => {
      chris_Role.setColor(reskins[inputed_Reskin].chris_role_Color)
    }, timerValue * 84);

    setTimeout(() => {
      bot_Role.setColor(reskins[inputed_Reskin].bot_role_Color)
    }, timerValue * 85);

    setTimeout(() => {
      nic_Role.setColor(reskins[inputed_Reskin].nic_role_Color)
    }, timerValue * 86);

    setTimeout(() => {
      the_Bots_Role.setColor(reskins[inputed_Reskin].the_bots_role_Color)
    }, timerValue * 89);

    setTimeout(() => {
      nic_Rank2.setColor(reskins[inputed_Reskin].nic_rank2_Color)
    }, timerValue * 90);

    setTimeout(() => {
      punish_Role.setColor(reskins[inputed_Reskin].punish_role_Color)
    }, timerValue * 91);

    setTimeout(() => {
      reporter_Role.setColor(reskins[inputed_Reskin].reporter_role_Color)
    }, timerValue * 92);

    setTimeout(() => {
      kyle_Rank2.setColor(reskins[inputed_Reskin].kyle_rank2_Color)
    }, timerValue * 93);

    setTimeout(() => {
      kyle_Rank1.setColor(reskins[inputed_Reskin].kyle_rank1_Color)
    }, timerValue * 94);

    setTimeout(() => {
      john_Rank2.setColor(reskins[inputed_Reskin].john_rank2_Color)
    }, timerValue * 95);

    setTimeout(() => {
      nic_Rank1.setColor(reskins[inputed_Reskin].nic_rank1_Color)
    }, timerValue * 96);

    setTimeout(() => {
      john_Rank1.setColor(reskins[inputed_Reskin].john_rank1_Color)
    }, timerValue * 97);

    setTimeout(() => {
      slaves_Role.setColor(reskins[inputed_Reskin].slaves_role_Color)
    }, timerValue * 98);

    setTimeout(() => {
      scarborough_Role.setColor(reskins[inputed_Reskin].scarborough_role_Color)
      message.channel.send("`Role Colors Complete!`");
      message.channel.send("`Reskin Process Complete!`");
    }, timerValue * 99);
  }

  reskinSystem(choice);
  return message.channel.send("`Starting Reskin Process!`");
}

module.exports.help = {
  name: "reskin",
  aliases: ["snap"]
}
