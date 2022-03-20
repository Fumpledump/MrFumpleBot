using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Discord;
using Discord.Commands;
using Discord.WebSocket;
using DiscordMrFumpleBot.Core.UserAccounts;
using NReco.ImageGenerator;
using System.Net;
using Newtonsoft.Json;
using Discord.Rest;
using System.Timers;

namespace DiscordMrFumpleBot.Modules
{
    public class Misc : ModuleBase<SocketCommandContext>
    {
        #region Helping Commands
        [Command("Help")]
        public async Task Help([Remainder] string MixTopic = "")
        {
            string topic = MixTopic.ToLower();
            if (topic == "")
            {
                var embed = new EmbedBuilder();
                embed.WithTitle("Help");
                embed.WithColor(new Color(0, 0, 255));
                embed.WithDescription($"Hello {Context.User.Username}! It looks like you need some help using the bots on the server. The commands on the server into many diffrent sections to access the diffrent sections simple type $help [The section you want to access].");
                embed.AddField("MrFumplebot", "MrFumplebot is the primary bot on the server that does many things and is sort of a fun project for the creator to work on.");
                await Context.Channel.SendMessageAsync("", false, embed);
            }
            else if (topic == "mrfumplebot")
            {
                var embed = new EmbedBuilder();
                embed.WithTitle("Command sections for MrFumplebot");
                embed.WithColor(new Color(0, 0, 255));
                embed.WithDescription($"MrFumplebot is the primary bot on the server that does many things and is sort of a fun project for the creator to work on. It's commands also has many sections.");
                embed.AddField("Help Commands", "These are commands that help you with the server.");
                embed.AddField("Admin Commands", "These are commands that only the server creator and his admins/moderators can use.");
                embed.AddField("Decision Commands", "These commands work with helping you decide what to do by using a magic eight ball or letting the bot pick for you.");
                embed.AddField("Stat Commands", "These commands deal with the various stats in the server and tell you more about how they work");
                embed.AddField("Gamming Commands", "These commands are fun games that people can play.");
                embed.AddField("Joke Commands", "These commands are just jokes...");
                embed.AddField("Miscellaneous Commands", "These commands are too different to be in the other sections but would be the only one if given its own.");
                await Context.Channel.SendMessageAsync("", false, embed);
            }
            else if (topic == "help commands" || topic == "help")
            {
                var embed = new EmbedBuilder();
                embed.WithTitle("Commands for help");
                embed.WithColor(new Color(0, 0, 255));
                embed.WithDescription($"These are commands that help you with the server.");
                embed.AddField("$Help [Topic]", "This command you are literally useing right now helps you with the servers bots. This command also does not need a [Topic] to process and if not given one will tell you what to do.");
                embed.AddField("$Info", "Gives you info on MrFumplebot.");
                embed.AddField("$Test", "An easy way to test if the bot is up.");
                embed.AddField("$are you online?", "A not so easy way to test if the bot is up.");
                await Context.Channel.SendMessageAsync("", false, embed);
            }
            else if (topic == "admin commands" || topic == "admin")
            {
                var embed = new EmbedBuilder();
                embed.WithTitle("Commands for Admins");
                embed.WithColor(new Color(0, 0, 255));
                embed.WithDescription($"These are commands that only the server creator and his admins/moderators can use. They also have sections of their own.");
                embed.AddField("$SetGame [GameTitle]", "This command sets the game title for the bot and will show up for what the bot is playing. (Only Requires Administrator powers)");
                embed.AddField("$Reset [Mentioned person]", "Resets the persons stats to as if they just joined. (Only Requires Administrator powers) (If you do not put a person it will reset your own so be careful!)");
                embed.AddField("$AddFumpleBucks [Amount of Fumplebucks]", "This command adds fumplebucks to your account. (Only Requires Administrator powers)");
                embed.AddField("$AddSlaves [Mentioned person] [Amount of Slaves]", "This command adds slaves to a person's account. (Only Requires Administrator powers)");
                embed.AddField("$SetBid [Bid]", "This command sets the starting bid for auctions. (Only Requires Administrator powers)");
                embed.AddField("$SetJackpot [Jackpot]", "Sets the jackpot for the pachinko machine. (Only Requires Administrator powers)");
                embed.AddField("$Data", "Tells you how many data pairs are in the bot. (Only Requires Administrator powers)");
                await Context.Channel.SendMessageAsync("", false, embed);
            }
            else if (topic == "decision commands" || topic == "decision")
            {
                var embed = new EmbedBuilder();
                embed.WithTitle("Commands for Decisions");
                embed.WithColor(new Color(0, 0, 255));
                embed.WithDescription($"These are commands that help you with the server.");
                embed.AddField("$Pick [Option1|Option2|Option3...ect]", "This command randomly picks a random option for you out of the ones you gave it.");
                embed.AddField("$Magic8Ball [Question]", "Shekes a virtual magic 8 ball that tells you the answer to your question.");
                await Context.Channel.SendMessageAsync("", false, embed);
            }
            else
            {
                await Context.Channel.SendMessageAsync("It seems like that topic is not in the directory. You may have misspelled it but if you did not please notify the admins.");
            }
        }
        [Command("Info")]
        public async Task Info()
        {
            var embed = new EmbedBuilder();
            embed.WithTitle("Info on MrFumpleBot");
            embed.WithAuthor("Bot made by: Mr.Fumpledump", "https://cdn.discordapp.com/attachments/420406882964996116/421151124712587265/Mr.Fumpledump_profile.png");
            embed.WithColor(new Color(0, 255, 0));
            embed.WithDescription("Hi! I am MrFumpleBot, and I was made for the sole purpose of serving my evil master Mr.Fumpledump.");
            embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/420406882964996116/421150676064665600/Mr.FumpleBot9000.png");
            embed.AddField("Command list", "For info on how to use the bot go to use the $help MrFumplebot.");

            await Context.Channel.SendMessageAsync("", false, embed);
        }
        [Command("Who are you?")]
        public async Task Youquestionmark()
        {
            await Context.Channel.SendMessageAsync("I'm Mr.Fumpledump but better.");
        }
        [Command("test")]
        public async Task Test()
        {
            await Context.Channel.SendMessageAsync("Don't you test me now!");
        }
        #endregion
        #region Admin Commands
        [Command("SetGame")]
        [Summary("Sets a 'Game' for the bot :videogame: (Only Moderators can use this command)")]
        [RequireUserPermission(GuildPermission.Administrator)] //Needed User Permission ///
        public async Task setgame([Remainder] string game)
        {
            await (Context.Client as DiscordSocketClient).SetGameAsync(game);
            await Context.Channel.SendMessageAsync($"Successfully set the game to '**{game}**'");
            Console.WriteLine($"{DateTime.Now}: Game was changed to {game}");
        }
        [Command("QueenDecree")]
        [RequireUserPermission(GuildPermission.Administrator)]
        public async Task QueenDecree([Remainder] string msg)
        {
            SocketTextChannel channel;
            channel = Global.Client.GetGuild(411715542467215362).GetTextChannel(434162285863370762);
            await channel.SendMessageAsync(msg);
        }
        [Command("VillageMsg")]
        [RequireUserPermission(GuildPermission.Administrator)]
        public async Task VillageMsg([Remainder] string msg)
        {
            SocketTextChannel channel;
            channel = Global.Client.GetGuild(411715542467215362).GetTextChannel(411715542924263427);
            await channel.SendMessageAsync(msg);
        }
        [Command("reset")]
        [RequireUserPermission(GuildPermission.Administrator)]
        public async Task reset([Remainder]string arg = "")
        {
            SocketUser target = null;
            var mentionedUser = Context.Message.MentionedUsers.First();
            target = mentionedUser;
            var account = UserAccounts.GetAccount(target);
            account.COINS = 100;
            account.XP = 0;

            await Context.Channel.SendMessageAsync($"``{target.Username} has been reset!``");
        }
        [Command("addfumplebucks")]
        [RequireUserPermission(GuildPermission.Administrator)]
        public async Task addfumplebucks(uint amount)
        {
                var account = UserAccounts.GetAccount(Context.User);

                account.COINS += amount;

                await Context.Channel.SendMessageAsync($"fumplebucks added!");
        }
        [Command("addslaves")]
        [RequireUserPermission(GuildPermission.Administrator)]
        public async Task addslaves([Remainder] string message)
        {
                string[] gift = message.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

                string arg = gift[0];
                uint amount = Convert.ToUInt32(gift[1]);

                SocketUser target = null;
                var mentionedUser = Context.Message.MentionedUsers.First();
                target = mentionedUser;
                var account = UserAccounts.GetAccount(target);

                account.SLAVES += amount;

                await Context.Channel.SendMessageAsync($"Slaves added!");
        }
        [Command("setbid")]
        [RequireUserPermission(GuildPermission.Administrator)]
        public async Task setbid(uint amount)
        {
            if (Context.User.Id == 246813230205370379)
            {
                var bidmaker = UserAccounts.GetAccount(Global.Client.GetUser(246813230205370379));
                bidmaker.BID = amount;
                await Context.Channel.SendMessageAsync("Starting bid set.");
            }
        }
        [Command("setjackpot")]
        [RequireUserPermission(GuildPermission.Administrator)]
        public async Task setjackpot(uint amount)
        {
            if (Context.User.Id == 246813230205370379)
            {
                var bidmaker = UserAccounts.GetAccount(Global.Client.GetUser(184405311681986560));
                bidmaker.BID = amount;
                await Context.Channel.SendMessageAsync("jackpot set.");
            }
        }
        [Command("data")]
        [RequireUserPermission(GuildPermission.Administrator)]
        public async Task GetData()
        {
            await Context.Channel.SendMessageAsync("Data has " + DataStorage.GetPairsCount() + " pairs.");
        }
        #endregion
        #region Question Commands
        [Command("are traps gay?")]
        public async Task GAY()
        {
            Random r = new Random();
            string[] Answer = new string[] { "Yes", "Definitely", "Absolutely" };
            string Answerselection = Answer[r.Next(0, Answer.Length)];

            await Context.Channel.SendMessageAsync(Answerselection);
        }
        [Command("pick")]
        public async Task PickOne([Remainder]string message)
        {
            string[] options = message.Split(new char[] { '|' }, StringSplitOptions.RemoveEmptyEntries);

            Random r = new Random();
            string OPselection = options[r.Next(0, options.Length)];

            await Context.Channel.SendMessageAsync("I pick " + OPselection);
        }
        [Command("Magic8Ball")]
        public async Task Ball([Remainder] string question)
        {
            Random r = new Random();
            string[] BallAnswer = new string[] { "It is certain", "As I see it, yes", "Reply hazy try again", "Don't count on it", "It is decidedly so", "Most likely", "Ask again later", "My reply is no", "Without a doubt", "Outlook good", "Better not tell you now", "My sources say no", "Yes definitely", "Yep", "Cannot predict now", "Outlook not so good", "You may rely on it", "Signs point to yes", "Concentrate and ask again", "Very doubtful" };
            string BallAnswerselection = BallAnswer[r.Next(0, BallAnswer.Length)];
            var embed = new EmbedBuilder();
            embed.WithTitle(question);
            embed.WithDescription(BallAnswerselection);
            embed.WithColor(1, 1, 1);
            embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/419979598818836491/421496636301377573/8-ball-pool-wall-sticker-1387.png");

            await Context.Channel.SendMessageAsync("", false, embed);
        }
        #endregion
        #region Stat Commands
        [Command("stats")]
        public async Task Stats([Remainder]string arg = "")
        {
            SocketUser target = null;
            var mentionedUser = Context.Message.MentionedUsers.FirstOrDefault();
            target = mentionedUser ?? Context.User;
            var account = UserAccounts.GetAccount(target);
            await Context.Channel.SendMessageAsync($"{target.Username} is level {account.LevelNumber} with {account.XP} Xp, {account.SLAVES} slave(s), {account.COINS} fumplebuck(s) in their wallet, and {account.STASH} in their stash.");
        }
        [Command("What level is")]
        public async Task WhatLevelIs(uint xp)
        {
            uint level = (uint)Math.Sqrt(xp / 50);
            await Context.Channel.SendMessageAsync($"The level is {level}.");
        }
        [Command("set name")]
        public async Task Setname(string NewName)
        {
            var account = UserAccounts.GetAccount(Context.User);
            account.NAME = NewName;
            await Context.Channel.SendMessageAsync($"{Context.User.Username} your name has now been set as {NewName}.");
        }
        [Command("Who is")]
        public async Task Whois([Remainder] string message)
        {
            SocketUser target = null;
            var mentionedUser = Context.Message.MentionedUsers.First();
            target = mentionedUser;
            var account = UserAccounts.GetAccount(target);

            await Context.Channel.SendMessageAsync($"{target.Username} name is {account.NAME}.");
        }
        [Command("check jackpot")]
        [RequireUserPermission(GuildPermission.Administrator)]
        public async Task checkjackpot()
        {
            var bidmaker = UserAccounts.GetAccount(Global.Client.GetUser(184405311681986560));
            await Context.Channel.SendMessageAsync($"The jackpot for The FOG is {bidmaker.BID}");
        }
        [Command("bal")]
        public async Task Bal()
        {
            var account = UserAccounts.GetAccount(Context.User);
            if (account.COINS == 1)
            {
                await Context.Channel.SendMessageAsync($"{Context.User.Username} you currently have {account.COINS} fumplebuck!");
                await Context.Channel.SendMessageAsync($"You are fucking poor dude...");
            }
            else
            {
                await Context.Channel.SendMessageAsync($"{Context.User.Username} you currently have {account.COINS} fumplebucks!");
            }
        }
        [Command("stash")]
        public async Task countstash()
        {
            var account = UserAccounts.GetAccount(Context.User);
            if (account.STASH == 1)
            {
                await Context.Channel.SendMessageAsync($"{Context.User.Username} you currently have {account.STASH} fumplebuck in your stash.");
                await Context.Channel.SendMessageAsync($"You are fucking poor dude...");
            }
            else
            {
                await Context.Channel.SendMessageAsync($"{Context.User.Username} you currently have {account.STASH} fumplebucks in your stash.");
            }
        }
        [Command("deposit")]
        public async Task Deposit(uint amount)
        {
            var account = UserAccounts.GetAccount(Context.User);
            if (account.COINS < amount)
            {
                await Context.Channel.SendMessageAsync($"You do not have that amount of money!!!");
            }
            else if (amount == 0)
            {
                await Context.Channel.SendMessageAsync($"You can't deposit 0 fumplebucks!!!");
            }
            else
            {
                account.COINS -= amount;
                account.STASH += amount;
                await Context.Channel.SendMessageAsync($"{Context.User.Username} your deposit of {amount} fumplebuck(s) has been added to your stash.");
            }
        }
        [Command("withdraw")]
        public async Task withdraw(uint amount)
        {
            var account = UserAccounts.GetAccount(Context.User);
            if (account.STASH < amount)
            {
                await Context.Channel.SendMessageAsync($"You do not have that amount of money!!!");
            }
            else if (amount == 0)
            {
                await Context.Channel.SendMessageAsync($"You can't withdraw 0 fumplebucks!!!");
            }
            else
            {
                account.COINS += amount;
                account.STASH -= amount;
                await Context.Channel.SendMessageAsync($"{Context.User.Username} withdrew {amount} fumplebuck(s).");
            }
        }
        [Command("Pay")]
        public async Task Pay([Remainder]string message)
        {
            string[] gift = message.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

            string arg = gift[0];
            uint amount = Convert.ToUInt32(gift[1]);
            //string paymentmessage = gift[2];
            var embed = new EmbedBuilder();

            SocketUser target = null;
            var mentionedUser = Context.Message.MentionedUsers.First();
            target = mentionedUser;
            var account = UserAccounts.GetAccount(target);
            var User = UserAccounts.GetAccount(Context.User);
            if (account == User)
            {
                await Context.Channel.SendMessageAsync("You can't give fumplebucks to yourself!");
            }
            else if (amount > User.COINS)
            {
                await Context.Channel.SendMessageAsync("You don't have that amount of fumplebucks!");
            }
            else if (amount <= 0)
            {
                await Context.Channel.SendMessageAsync("You can't pay that amount of fumplebucks!");
            }
            else
            {
                account.COINS += amount;
                User.COINS -= amount;
                string UserImage = Context.User.GetAvatarUrl();

                embed.WithTitle($"Donation");
                embed.WithAuthor($"Donation made by {Context.User.Username}!", UserImage);
                embed.WithDescription($"{Context.User.Username} paid {mentionedUser.Username} {amount} fumplebuck(s)!");
                embed.WithColor(new Color(0, 255, 0));
                //embed.AddField("Message", paymentmessage);
                await Context.Channel.SendMessageAsync("", false, embed);
            }
        }
        [Command("Tithe")]
        public async Task Tithe(uint amount)
        {
            var account = UserAccounts.GetAccount(Context.User);
            if (amount <= 0)
            {
                await Context.Channel.SendMessageAsync($"You can't donate that amount of fumplebucks!");
            }
            else if (amount > account.COINS)
            {
                await Context.Channel.SendMessageAsync($"You do not have that amount of fumplebucks!");
            }
            else
            {
                var ChurchFunds = UserAccounts.GetAccount(Global.Client.GetUser(439896715781210115));
                account.COINS -= amount;
                ChurchFunds.STASH += amount;
                if (amount == 1)
                {
                    await Context.Channel.SendMessageAsync($"```{Context.User.Username} donated {amount} fumplebuck to the church!```");
                    await Context.Channel.SendMessageAsync($"That's a dick move if you ask me.");
                }
                else
                {
                    await Context.Channel.SendMessageAsync($"```{Context.User.Username} donated {amount} fumplebucks to the church!```");
                } 
            }
        }
        [Command("Can I have a dollar")]
        public async Task DOLLAR(uint amount)
        {
            var ChurchFunds = UserAccounts.GetAccount(Global.Client.GetUser(439896715781210115));
            var account = UserAccounts.GetAccount(Context.User);
            Console.WriteLine(account);
            if (amount <= 0)
            {
                await Context.Channel.SendMessageAsync($"You can't take less than 0!");
                return;
            }
            else if (account.ID == 204028118602612736)
            {
                ChurchFunds.STASH -= amount;
                account.COINS += amount;
                if (amount == 1)
                {
                    await Context.Channel.SendMessageAsync($"You took {amount} fumplebuck from the church my dear Sage/Oracle.");
                    await Context.Channel.SendMessageAsync($"do you really need that one fumplebuck...");
                }
                else
                {
                    await Context.Channel.SendMessageAsync($"You took {amount} fumplebucks from the church my dear Sage/Oracle.");
                }
            }
            else if (account.ID == 170950166013018113)
            {
                ChurchFunds.STASH -= amount;
                account.COINS += amount;
                if (amount == 1)
                {
                    await Context.Channel.SendMessageAsync($"You took {amount} fumplebuck from the church my dear Sage/Oracle.");
                    await Context.Channel.SendMessageAsync($"do you really need that one fumplebuck...");
                }
                else
                {
                    await Context.Channel.SendMessageAsync($"You took {amount} fumplebucks from the church my dear Sage/Oracle.");
                }
            }
            else
            {
                await Context.Channel.SendMessageAsync($"You must be the Sage/Oracle in order to take from the church.");
            }
        }
        [Command("bid")]
        public async Task bid(uint amount)
        {
            var account = UserAccounts.GetAccount(Context.User);
            var bidmaker = UserAccounts.GetAccount(Global.Client.GetUser(246813230205370379));
            SocketTextChannel channel;
            channel = Global.Client.GetGuild(411715542467215362).GetTextChannel(455218919884587019);

            if (account.COINS < amount)
            {
                await Context.Channel.SendMessageAsync($"You do not own that much money!");
            }
            else if (account.COINS < 0)
            {
                await Context.Channel.SendMessageAsync($"You can't bid that!");
            }
            else if (amount <= bidmaker.BID)
            {
                await Context.Channel.SendMessageAsync($"That bid is under the highest bid!!!");
            }
            else
            {
                await Context.Channel.SendMessageAsync($"{Context.User.Username} bid {amount}.");
                Console.Write($"{Context.User.Username} bid {amount}.");
                await channel.SendMessageAsync($"{Context.User.Username} bid {amount}.");
                account.BID = amount;
                bidmaker.BID = amount;
            }
        }
        [Command("whip")]
        public async Task whip()
        {
            var account = UserAccounts.GetAccount(Context.User);

            if (account.SLAVES <= 0)
            {
                await Context.Channel.SendMessageAsync($"You don't own any slaves!");
            }
            else if (account.SLAVES == 1)
            {
                await Context.Channel.SendMessageAsync($"{Context.User.Username} whipped their slave");
            }
            else
            {
                await Context.Channel.SendMessageAsync($"{Context.User.Username} whipped their slaves");
            }
        }
        [Command("advertise")]
        public async Task advertise([Remainder] string msg)
        {
            var account = UserAccounts.GetAccount(Context.User);
            if (account.COINS >= 5000)
            {
                account.COINS -= 5000;
                if (Context.User.Id != 246813230205370379)
                {
                    var fumpledump = UserAccounts.GetAccount(Global.Client.GetUser(246813230205370379));
                    fumpledump.COINS += 5000;
                }
                SocketTextChannel channel;
                channel = Global.Client.GetGuild(411715542467215362).GetTextChannel(443589037383483402);
                string UserImage = Context.User.GetAvatarUrl();

                var embed = new EmbedBuilder();
                embed.WithTitle("Ad");
                embed.WithAuthor($"brought to you by {Context.User.Username}.", UserImage);
                embed.WithColor(new Color(220, 220, 220));
                embed.WithDescription($"{msg}");

                await channel.SendMessageAsync("", false, embed);
            }
            else
            {
                await Context.Channel.SendMessageAsync("You don't have enough fumplebucks! You need 5000 to advertise!");
            }
        }
        [Command("art request")]
        public async Task artrequest([Remainder] string msg)
        {
            var account = UserAccounts.GetAccount(Context.User);
            if (account.COINS >= 88888)
            {
                account.COINS -= 88888;
                if (Context.User.Id != 246813230205370379)
                {
                    var fumpledump = UserAccounts.GetAccount(Global.Client.GetUser(246813230205370379));
                    fumpledump.COINS += 88888;
                }
                SocketTextChannel channel;
                channel = Global.Client.GetGuild(411715542467215362).GetTextChannel(445019618663464960);
                string UserImage = Context.User.GetAvatarUrl();

                var embed = new EmbedBuilder();
                embed.WithTitle("Art Request");
                embed.WithAuthor($"Requested to you by {Context.User.Username}.", UserImage);
                embed.WithColor(new Color(220, 220, 220));
                embed.WithDescription($"{msg}");

                await channel.SendMessageAsync("", false, embed);
                await Context.Channel.SendMessageAsync("request sent");
            }
            else
            {
                await Context.Channel.SendMessageAsync("You don't have enough fumplebucks! You need 88888 to do art request!");
            }
        }
        #endregion
        #region FumpleStocks

        private static void ResetStock(int StockNum)
        {
            var accounts = UserAccounts.GetAllAccounts();

            if (StockNum == 1)
            {
                foreach (var a in accounts)
                {
                    a.STOCK1 = 0;
                }
            }
            else if (StockNum == 2)
            {
                foreach (var a in accounts)
                {
                    a.STOCK2 = 0;
                }
            }
            else if (StockNum == 3)
            {
                foreach (var a in accounts)
                {
                    a.STOCK3 = 0;
                }
            }
            else if (StockNum == 4)
            {
                foreach (var a in accounts)
                {
                    a.STOCK4 = 0;
                }
            }
            else if (StockNum == 5)
            {
                foreach (var a in accounts)
                {
                    a.STOCK5 = 0;
                }
            }
            else if (StockNum == 6)
            {
                foreach (var a in accounts)
                {
                    a.STOCK6 = 0;
                }
            }
            else if (StockNum == 7)
            {
                foreach (var a in accounts)
                {
                    a.STOCK7 = 0;
                }
            }
            else if (StockNum == 8)
            {
                foreach (var a in accounts)
                {
                    a.STOCK8 = 0;
                }

            }
            else if (StockNum == 9)
            {
                foreach (var a in accounts)
                {
                    a.STOCK9 = 0;
                }
            }
        }
        private static Timer loopingTimer;
        private static SocketTextChannel StockTextChannel;
        [Command("StartStockTimer")]
        [RequireUserPermission(GuildPermission.Administrator)]
        public async Task StartStockTimer()
        {
            StockTextChannel = Global.Client.GetGuild(411715542467215362).GetTextChannel(489963488949567498);
            Random r = new Random();
            int TimeInterval = r.Next(1800000, 3600000);
            loopingTimer = new Timer()
            {
                Interval = TimeInterval,
                AutoReset = true,
                Enabled = true
            };
            loopingTimer.Elapsed += OnTimerTicked;
            await Context.Channel.SendMessageAsync("Stock timer Started.");
        }
        private static async void OnTimerTicked(object sender, ElapsedEventArgs e)
        {
            #region StockMarketCode
            Console.WriteLine("Stock Market Change!");
            StockTextChannel = Global.Client.GetGuild(411715542467215362).GetTextChannel(489963488949567498);

            var StockHolder = UserAccounts.GetAccount(Global.Client.GetUser(439896715781210115));

            var embed = new EmbedBuilder();
            Random r = new Random();

            string Stock1Name = StockHolder.STOCK1NAME;
            string Stock2Name = StockHolder.STOCK2NAME;
            string Stock3Name = StockHolder.STOCK3NAME;
            string Stock4Name = StockHolder.STOCK4NAME;
            string Stock5Name = StockHolder.STOCK5NAME;
            string Stock6Name = StockHolder.STOCK6NAME;
            string Stock7Name = StockHolder.STOCK7NAME;
            string Stock8Name = StockHolder.STOCK8NAME;
            string Stock9Name = StockHolder.STOCK9NAME;

            string Stock1Acronym = StockHolder.STOCK1ABBREVIATION;
            string Stock2Acronym = StockHolder.STOCK2ABBREVIATION;
            string Stock3Acronym = StockHolder.STOCK3ABBREVIATION;
            string Stock4Acronym = StockHolder.STOCK4ABBREVIATION;
            string Stock5Acronym = StockHolder.STOCK5ABBREVIATION;
            string Stock6Acronym = StockHolder.STOCK6ABBREVIATION;
            string Stock7Acronym = StockHolder.STOCK7ABBREVIATION;
            string Stock8Acronym = StockHolder.STOCK8ABBREVIATION;
            string Stock9Acronym = StockHolder.STOCK9ABBREVIATION;

            int Stock1SpecialEvent = r.Next(1, 301);
            int Stock2SpecialEvent = r.Next(1, 301);
            int Stock3SpecialEvent = r.Next(1, 301);
            int Stock4SpecialEvent = r.Next(1, 301);
            int Stock5SpecialEvent = r.Next(1, 301);
            int Stock6SpecialEvent = r.Next(1, 301);
            int Stock7SpecialEvent = r.Next(1, 301);
            int Stock8SpecialEvent = r.Next(1, 301);
            int Stock9SpecialEvent = r.Next(1, 301);


            uint Stock1SpecialEvent1Change = StockHolder.STOCK1/ Convert.ToUInt32(1.5);
            uint Stock2SpecialEvent1Change = StockHolder.STOCK2 / Convert.ToUInt32(1.5);
            uint Stock3SpecialEvent1Change = StockHolder.STOCK3 / Convert.ToUInt32(1.5);
            uint Stock4SpecialEvent1Change = StockHolder.STOCK4 / Convert.ToUInt32(1.5);
            uint Stock5SpecialEvent1Change = StockHolder.STOCK5 / Convert.ToUInt32(1.5);
            uint Stock6SpecialEvent1Change = StockHolder.STOCK6 / Convert.ToUInt32(1.5);
            uint Stock7SpecialEvent1Change = StockHolder.STOCK7 / Convert.ToUInt32(1.5);
            uint Stock8SpecialEvent1Change = StockHolder.STOCK8 / Convert.ToUInt32(1.5);
            uint Stock9SpecialEvent1Change = StockHolder.STOCK9 / Convert.ToUInt32(1.5);

            uint Stock1SpecialEvent2Change = StockHolder.STOCK1 / Convert.ToUInt32(2);
            uint Stock2SpecialEvent2Change = StockHolder.STOCK2 / Convert.ToUInt32(2);
            uint Stock3SpecialEvent2Change = StockHolder.STOCK3 / Convert.ToUInt32(2);
            uint Stock4SpecialEvent2Change = StockHolder.STOCK4 / Convert.ToUInt32(2);
            uint Stock5SpecialEvent2Change = StockHolder.STOCK5 / Convert.ToUInt32(2);
            uint Stock6SpecialEvent2Change = StockHolder.STOCK6 / Convert.ToUInt32(2);
            uint Stock7SpecialEvent2Change = StockHolder.STOCK7 / Convert.ToUInt32(2);
            uint Stock8SpecialEvent2Change = StockHolder.STOCK8 / Convert.ToUInt32(2);
            uint Stock9SpecialEvent2Change = StockHolder.STOCK9 / Convert.ToUInt32(2);

            uint Stock1SpecialEvent3Change = StockHolder.STOCK1 / Convert.ToUInt32(3);
            uint Stock2SpecialEvent3Change = StockHolder.STOCK2 / Convert.ToUInt32(3);
            uint Stock3SpecialEvent3Change = StockHolder.STOCK3 / Convert.ToUInt32(3);
            uint Stock4SpecialEvent3Change = StockHolder.STOCK4 / Convert.ToUInt32(3);
            uint Stock5SpecialEvent3Change = StockHolder.STOCK5 / Convert.ToUInt32(3);
            uint Stock6SpecialEvent3Change = StockHolder.STOCK6 / Convert.ToUInt32(3);
            uint Stock7SpecialEvent3Change = StockHolder.STOCK7 / Convert.ToUInt32(3);
            uint Stock8SpecialEvent3Change = StockHolder.STOCK8 / Convert.ToUInt32(3);
            uint Stock9SpecialEvent3Change = StockHolder.STOCK9 / Convert.ToUInt32(3);


            int StockSecurity = r.Next(1, 4);

            Console.WriteLine("~First Special Stock Changes~");
            Console.WriteLine("~Event 3 Changes~");
            Console.WriteLine(Stock1SpecialEvent3Change);
            Console.WriteLine(Stock2SpecialEvent3Change);
            Console.WriteLine(Stock3SpecialEvent3Change);
            Console.WriteLine(Stock4SpecialEvent3Change);
            Console.WriteLine(Stock5SpecialEvent3Change);
            Console.WriteLine(Stock6SpecialEvent3Change);
            Console.WriteLine(Stock7SpecialEvent3Change);
            Console.WriteLine(Stock8SpecialEvent3Change);
            Console.WriteLine(Stock9SpecialEvent3Change);
            Console.WriteLine("~Event 2 Changes~");
            Console.WriteLine(Stock1SpecialEvent2Change);
            Console.WriteLine(Stock2SpecialEvent2Change);
            Console.WriteLine(Stock3SpecialEvent2Change);
            Console.WriteLine(Stock4SpecialEvent2Change);
            Console.WriteLine(Stock5SpecialEvent2Change);
            Console.WriteLine(Stock6SpecialEvent2Change);
            Console.WriteLine(Stock7SpecialEvent2Change);
            Console.WriteLine(Stock8SpecialEvent2Change);
            Console.WriteLine(Stock9SpecialEvent2Change);
            Console.WriteLine("~Event 1 Changes~");
            Console.WriteLine(Stock1SpecialEvent1Change);
            Console.WriteLine(Stock2SpecialEvent1Change);
            Console.WriteLine(Stock3SpecialEvent1Change);
            Console.WriteLine(Stock4SpecialEvent1Change);
            Console.WriteLine(Stock5SpecialEvent1Change);
            Console.WriteLine(Stock6SpecialEvent1Change);
            Console.WriteLine(Stock7SpecialEvent1Change);
            Console.WriteLine(Stock8SpecialEvent1Change);
            Console.WriteLine(Stock9SpecialEvent1Change);

            uint Stock1Change = Convert.ToUInt32(r.Next(0, 26));
            uint Stock2Change = Convert.ToUInt32(r.Next(0, 26));
            uint Stock3Change = Convert.ToUInt32(r.Next(0, 26));
            uint Stock4Change = Convert.ToUInt32(r.Next(0, 26));
            uint Stock5Change = Convert.ToUInt32(r.Next(0, 26));
            uint Stock6Change = Convert.ToUInt32(r.Next(0, 26));
            uint Stock7Change = Convert.ToUInt32(r.Next(0, 26));
            uint Stock8Change = Convert.ToUInt32(r.Next(0, 26));
            uint Stock9Change = Convert.ToUInt32(r.Next(0, 26));

            int Stock1POSORNEG = r.Next(0, 2);
            int Stock2POSORNEG = r.Next(0, 2);
            int Stock3POSORNEG = r.Next(0, 2);
            int Stock4POSORNEG = r.Next(0, 2);
            int Stock5POSORNEG = r.Next(0, 2);
            int Stock6POSORNEG = r.Next(0, 2);
            int Stock7POSORNEG = r.Next(0, 2);
            int Stock8POSORNEG = r.Next(0, 2);
            int Stock9POSORNEG = r.Next(0, 2);

            uint Stock1ChangePos = 0;
            uint Stock2ChangePos = 0;
            uint Stock3ChangePos = 0;
            uint Stock4ChangePos = 0;
            uint Stock5ChangePos = 0;
            uint Stock6ChangePos = 0;
            uint Stock7ChangePos = 0;
            uint Stock8ChangePos = 0;
            uint Stock9ChangePos = 0;

            uint Stock1ChangeNeg = 0;
            uint Stock2ChangeNeg = 0;
            uint Stock3ChangeNeg = 0;
            uint Stock4ChangeNeg = 0;
            uint Stock5ChangeNeg = 0;
            uint Stock6ChangeNeg = 0;
            uint Stock7ChangeNeg = 0;
            uint Stock8ChangeNeg = 0;
            uint Stock9ChangeNeg = 0;

            bool Stock1Gone = false;
            bool Stock2Gone = false;
            bool Stock3Gone = false;
            bool Stock4Gone = false;
            bool Stock5Gone = false;
            bool Stock6Gone = false;
            bool Stock7Gone = false;
            bool Stock8Gone = false;
            bool Stock9Gone = false;

            embed.WithFooter("If you want to participate in the stock market use $invest [AbbreviatedNameOfStock] [Amount] to buy a stock and $sell [AbbreviatedNameOfStock] [Amount] to sell a stock.", "https://cdn.discordapp.com/attachments/483302550666346498/492014432692731922/question_mark_good.png");
            embed.WithCurrentTimestamp();

            Console.WriteLine($"{Stock1POSORNEG}");
            Console.WriteLine($"{Stock2POSORNEG}");
            Console.WriteLine($"{Stock3POSORNEG}");
            Console.WriteLine($"{Stock4POSORNEG}");
            Console.WriteLine($"{Stock5POSORNEG}");
            Console.WriteLine($"{Stock6POSORNEG}");
            Console.WriteLine($"{Stock7POSORNEG}");
            Console.WriteLine($"{Stock8POSORNEG}");
            Console.WriteLine($"{Stock9POSORNEG}");

            var accounts = UserAccounts.GetAllAccounts();

            if (StockHolder.STOCK1 <= 0 || StockHolder.STOCK1 >= 1000)
            {
                Stock1Change = 0;
                Stock1Gone = true;
                Stock1SpecialEvent = 300;
            }
            if (StockHolder.STOCK2 <= 0 || StockHolder.STOCK2 >= 1000)
            {
                Stock2Change = 0;
                Stock2Gone = true;
                Stock2SpecialEvent = 300;
            }
            if (StockHolder.STOCK3 <= 0 || StockHolder.STOCK3 >= 1000)
            {
                Stock3Change = 0;
                Stock3Gone = true;
                Stock3SpecialEvent = 300;
            }
            if (StockHolder.STOCK4 <= 0 || StockHolder.STOCK4 >= 1000)
            {
                Stock4Change = 0;
                Stock4Gone = true;
                Stock4SpecialEvent = 300;
            }
            if (StockHolder.STOCK5 <= 0 || StockHolder.STOCK5 >= 1000)
            {
                Stock5Change = 0;
                Stock5Gone = true;
                Stock5SpecialEvent = 300;
            }
            if (StockHolder.STOCK6 <= 0 || StockHolder.STOCK6 >= 1000)
            {
                Stock6Change = 0;
                Stock6Gone = true;
                Stock6SpecialEvent = 300;
            }
            if (StockHolder.STOCK7 <= 0 || StockHolder.STOCK7 >= 1000)
            {
                Stock7Change = 0;
                Stock7Gone = true;
                Stock7SpecialEvent = 300;
            }
            if (StockHolder.STOCK8 <= 0 || StockHolder.STOCK8 >= 1000)
            {
                Stock8Change = 0;
                Stock8Gone = true;
                Stock8SpecialEvent = 300;
            }
            if (StockHolder.STOCK9 <= 0 || StockHolder.STOCK9 >= 1000)
            {
                Stock9Change = 0;
                Stock9Gone = true;
                Stock9SpecialEvent = 300;
            }
            if (Stock1POSORNEG == 0)
            {
                Stock1ChangePos = Stock1Change;
            }
            else
            {
                Stock1ChangeNeg = Stock1Change;
            }
            if (Stock2POSORNEG == 0)
            {
                Stock2ChangePos = Stock2Change;
            }
            else
            {
                Stock2ChangeNeg = Stock2Change;
            }
            if (Stock3POSORNEG == 0)
            {
                Stock3ChangePos = Stock3Change;
            }
            else
            {
                Stock3ChangeNeg = Stock3Change;
            }
            if (Stock4POSORNEG == 0)
            {
                Stock4ChangePos = Stock4Change;
            }
            else
            {
                Stock4ChangeNeg = Stock4Change;
            }
            if (Stock5POSORNEG == 0)
            {
                Stock5ChangePos = Stock5Change;
            }
            else
            {
                Stock5ChangeNeg = Stock5Change;
            }
            if (Stock6POSORNEG == 0)
            {
                Stock6ChangePos = Stock6Change;
            }
            else
            {
                Stock6ChangeNeg = Stock6Change;
            }
            if (Stock7POSORNEG == 0)
            {
                Stock7ChangePos = Stock7Change;
            }
            else
            {
                Stock7ChangeNeg = Stock7Change;
            }
            if (Stock8POSORNEG == 0)
            {
                Stock8ChangePos = Stock8Change;
            }
            else
            {
                Stock8ChangeNeg = Stock8Change;
            }
            if (Stock9POSORNEG == 0)
            {
                Stock9ChangePos = Stock9Change;
            }
            else
            {
                Stock9ChangeNeg = Stock9Change;
            }

            if (Stock1Gone = true && Stock2Gone == true && Stock3Gone == true && Stock4Gone == true && Stock5Gone == true && Stock6Gone == true && Stock7Gone == true && Stock8Gone == true && Stock9Gone == true)
            {
                embed.WithTitle($"John should fix Fumplestocks™");
                embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/483302550666346498/492027769396396032/RainFumpledump.png");
                embed.WithColor(0, 255, 0);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg");
            }
            else if (Stock1SpecialEvent <= 7 && Stock2SpecialEvent <= 7 && Stock3SpecialEvent <= 7 && Stock4SpecialEvent <= 7 && Stock5SpecialEvent <= 7 && Stock6SpecialEvent <= 7 && Stock7SpecialEvent <= 7 && Stock8SpecialEvent <= 7 && Stock9SpecialEvent <= 7)
            {
                embed.WithTitle($"BREAKING NEWS FOR FUMPLESTOCKS™");
                embed.WithColor(127, 0, 255);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491438753273872384/Breaking_News_Fumplestocks.jpg");
            }
            else if (Stock1SpecialEvent <= 7 || Stock2SpecialEvent <= 7 || Stock3SpecialEvent <= 7 || Stock4SpecialEvent <= 7 || Stock5SpecialEvent <= 7 || Stock6SpecialEvent <= 7 || Stock7SpecialEvent <= 7 || Stock8SpecialEvent <= 7 || Stock9SpecialEvent <= 7)
            {
                embed.WithTitle($"BREAKING NEWS FOR FUMPLESTOCKS™!");
                embed.WithColor(255, 255, 0);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491438753273872384/Breaking_News_Fumplestocks.jpg");
            }
            else if (Stock1ChangeNeg + Stock2ChangeNeg + Stock3ChangeNeg + Stock4ChangeNeg + Stock5ChangeNeg + Stock6ChangeNeg + Stock7ChangeNeg + Stock8ChangeNeg + Stock9ChangeNeg + Stock1ChangePos + Stock2ChangePos + Stock3ChangePos + Stock4ChangePos + Stock5ChangePos + Stock6ChangePos + Stock7ChangePos + Stock8ChangePos + Stock9ChangePos == 0)
            {
                embed.WithTitle($"Boring day for Fumplestocks™");
                embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/483302550666346498/492027769396396032/RainFumpledump.png");
                embed.WithColor(0, 255, 0);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg");
            }
            else if (Stock1ChangeNeg + Stock2ChangeNeg + Stock3ChangeNeg + Stock4ChangeNeg + Stock5ChangeNeg + Stock6ChangeNeg + Stock7ChangeNeg + Stock8ChangeNeg + Stock9ChangeNeg == 0)
            {
                embed.WithTitle($"Great day for Fumplestocks™");
                embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/483302550666346498/492027770256228362/SunFumple.png");
                embed.WithColor(0, 255, 154);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg");
            }
            else if (Stock1ChangePos + Stock2ChangePos + Stock3ChangePos + Stock4ChangePos + Stock5ChangePos + Stock6ChangePos + Stock7ChangePos + Stock8ChangePos + Stock9ChangePos == 0)
            {
                embed.WithTitle($"Horrible day for Fumplestocks™");
                embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/483302550666346498/492027771657125899/ThunderFumpledump.png");
                embed.WithColor(178, 34, 34);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg");
            }
            else if (Stock1ChangePos + Stock2ChangePos + Stock3ChangePos + Stock4ChangePos + Stock5ChangePos + Stock6ChangePos + Stock7ChangePos + Stock8ChangePos + Stock9ChangePos > Stock1ChangeNeg + Stock2ChangeNeg + Stock3ChangeNeg + Stock4ChangeNeg + Stock5ChangeNeg + Stock6ChangeNeg + Stock7ChangeNeg + Stock8ChangeNeg + Stock9ChangeNeg)
            {
                embed.WithTitle($"Good day for Fumplestocks™");
                embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/483302550666346498/492027767932715028/PartlyCloudyFumple.png");
                embed.WithColor(0, 255, 0);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg");
            }
            else if (Stock1ChangePos + Stock2ChangePos + Stock3ChangePos + Stock4ChangePos + Stock5ChangePos + Stock6ChangePos + Stock7ChangePos + Stock8ChangePos + Stock9ChangePos < Stock1ChangeNeg + Stock2ChangeNeg + Stock3ChangeNeg + Stock4ChangeNeg + Stock5ChangeNeg + Stock6ChangeNeg + Stock7ChangeNeg + Stock8ChangeNeg + Stock9ChangeNeg)
            {
                embed.WithTitle($"Rough day for Fumplestocks™");
                embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/483302550666346498/492027769396396032/RainFumpledump.png");
                embed.WithColor(255, 0, 0);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg");
            }
            else
            {
                embed.WithTitle($"Fumplestocks™");
                embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/483302550666346498/492027769396396032/RainFumpledump.png");
                embed.WithColor(0, 255, 0);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg");
            }

            #region Stock1

            if (StockHolder.STOCK1 == 0)
            {
                embed.AddField($"{Stock1Name}", $"💀 {Stock1Acronym} 💀 {StockHolder.STOCK1} ---");
            }
            else if (StockHolder.STOCK1 >= 1000)
            {
                embed.AddField($"{Stock1Name}", $"👑 {Stock1Acronym} 👑 {StockHolder.STOCK1} ---");
            }
            else if (Stock1SpecialEvent == 1)
            {
                if (Stock1POSORNEG == 0)
                {
                    StockHolder.STOCK1 += Stock1SpecialEvent1Change;
                    embed.AddField($"{Stock1Name}", $"🔺 {Stock1Acronym} --- {StockHolder.STOCK1} +{Stock1SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock1Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK1 < Stock1SpecialEvent1Change)
                    {
                        StockHolder.STOCK1 = 0;
                        embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} 🔻 {StockHolder.STOCK1} -{Stock1SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock1Name} JUST CRASHED!!!");
                        ResetStock(1);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock1Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK1 -= Stock1SpecialEvent1Change;
                        embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} 🔻 {StockHolder.STOCK1} -{Stock1SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock1Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock1SpecialEvent <= 3)
            {
                if (Stock1POSORNEG == 0)
                {
                    StockHolder.STOCK1 += Stock1SpecialEvent2Change;
                    embed.AddField($"{Stock1Name}", $"🔺 {Stock1Acronym} --- {StockHolder.STOCK1} +{Stock1SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock1Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK1 < Stock1SpecialEvent2Change)
                    {
                        StockHolder.STOCK1 = 0;
                        embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} 🔻 {StockHolder.STOCK1} -{Stock1SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock1Name} just went into a Depression!!");
                        ResetStock(1);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock1Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK1 -= Stock1SpecialEvent2Change;
                        embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} 🔻 {StockHolder.STOCK1} -{Stock1SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock1Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock1SpecialEvent <= 7)
            {
                if (Stock1POSORNEG == 0)
                {
                    StockHolder.STOCK1 += Stock1SpecialEvent3Change;
                    embed.AddField($"{Stock1Name}", $"🔺 {Stock1Acronym} --- {StockHolder.STOCK1} +{Stock1SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock1Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK1 < Stock1SpecialEvent3Change)
                    {
                        StockHolder.STOCK1 = 0;
                        embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} 🔻 {StockHolder.STOCK1} -{Stock1SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock1Name} just Recessed!");
                        ResetStock(1);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock1Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK1 -= Stock1SpecialEvent3Change;
                        embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} 🔻 {StockHolder.STOCK1} -{Stock1SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock1Name} just Recessed!");
                    }
                }
            }
            else if (Stock1Change == 0)
            {
                embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} --- {StockHolder.STOCK1} ---");
            }
            else
            {
                if (Stock1POSORNEG == 0)
                {
                    StockHolder.STOCK1 += Stock1Change;
                    embed.AddField($"{Stock1Name}", $"🔺 {Stock1Acronym} --- {StockHolder.STOCK1} +{Stock1Change}");
                }
                else
                {
                    if (StockHolder.STOCK1 < Stock1Change)
                    {
                        StockHolder.STOCK1 = 0;
                        embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} 🔻 {StockHolder.STOCK1} -{Stock1Change}");
                        ResetStock(1);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock1Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK1 -= Stock1Change;
                        embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} 🔻 {StockHolder.STOCK1} -{Stock1Change}");
                    }
                }
            }
            #endregion

            #region Stock2
            if (StockHolder.STOCK2 == 0)
            {
                embed.AddField($"{Stock2Name}", $"💀 {Stock2Acronym} 💀 {StockHolder.STOCK2} ---");
            }
            else if (StockHolder.STOCK2 >= 1000)
            {
                embed.AddField($"{Stock2Name}", $"👑 {Stock2Acronym} 👑 {StockHolder.STOCK2} ---");
            }
            else if (Stock2SpecialEvent == 1)
            {
                if (Stock2POSORNEG == 0)
                {
                    StockHolder.STOCK2 += Stock2SpecialEvent1Change;
                    embed.AddField($"{Stock2Name}", $"🔺 {Stock2Acronym} --- {StockHolder.STOCK2} +{Stock2SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock2Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK2 < Stock2SpecialEvent1Change)
                    {
                        StockHolder.STOCK2 = 0;
                        embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} 🔻 {StockHolder.STOCK2} -{Stock2SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock2Name} JUST CRASHED!!!");
                        ResetStock(2);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock2Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK2 -= Stock2SpecialEvent1Change;
                        embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} 🔻 {StockHolder.STOCK2} -{Stock2SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock2Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock2SpecialEvent <= 3)
            {
                if (Stock2POSORNEG == 0)
                {
                    StockHolder.STOCK2 += Stock2SpecialEvent2Change;
                    embed.AddField($"{Stock2Name}", $"🔺 {Stock2Acronym} --- {StockHolder.STOCK2} +{Stock2SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock2Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK2 < Stock2SpecialEvent2Change)
                    {
                        StockHolder.STOCK2 = 0;
                        embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} 🔻 {StockHolder.STOCK2} -{Stock2SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock2Name} just went into a Depression!!");
                        ResetStock(2);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock2Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK2 -= Stock2SpecialEvent2Change;
                        embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} 🔻 {StockHolder.STOCK2} -{Stock2SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock2Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock2SpecialEvent <= 7)
            {
                if (Stock2POSORNEG == 0)
                {
                    StockHolder.STOCK2 += Stock2SpecialEvent3Change;
                    embed.AddField($"{Stock2Name}", $"🔺 {Stock2Acronym} --- {StockHolder.STOCK2} +{Stock2SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock2Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK2 < Stock1SpecialEvent3Change)
                    {
                        StockHolder.STOCK2 = 0;
                        embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} 🔻 {StockHolder.STOCK2} -{Stock2SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock2Name} just Recessed!");
                        ResetStock(2);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock2Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK2 -= Stock2SpecialEvent3Change;
                        embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} 🔻 {StockHolder.STOCK2} -{Stock2SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock2Name} just Recessed!");
                    }
                }
            }
            else if (Stock2Change == 0)
            {
                embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} --- {StockHolder.STOCK2} ---");
            }
            else
            {
                if (Stock2POSORNEG == 0)
                {
                    StockHolder.STOCK2 += Stock2Change;
                    embed.AddField($"{Stock2Name}", $"🔺 {Stock2Acronym} --- {StockHolder.STOCK2} +{Stock2Change}");
                }
                else
                {
                    if (StockHolder.STOCK2 < Stock2Change)
                    {
                        StockHolder.STOCK2 = 0;
                        embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} 🔻 {StockHolder.STOCK2} -{Stock2Change}");
                        ResetStock(2);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock2Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK2 -= Stock2Change;
                        embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} 🔻 {StockHolder.STOCK2} -{Stock2Change}");
                    }
                }
            }
            #endregion

            #region Stock3
            if (StockHolder.STOCK3 == 0)
            {
                embed.AddField($"{Stock3Name}", $"💀 {Stock3Acronym} 💀 {StockHolder.STOCK3} ---");
            }
            else if (StockHolder.STOCK3 >= 1000)
            {
                embed.AddField($"{Stock3Name}", $"👑 {Stock3Acronym} 👑 {StockHolder.STOCK3} ---");
            }
            else if (Stock3SpecialEvent == 1)
            {
                if (Stock3POSORNEG == 0)
                {
                    StockHolder.STOCK3 += Stock3SpecialEvent1Change;
                    embed.AddField($"{Stock3Name}", $"🔺 {Stock3Acronym} --- {StockHolder.STOCK3} +{Stock3SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock3Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK3 < Stock3SpecialEvent1Change)
                    {
                        StockHolder.STOCK3 = 0;
                        embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} 🔻 {StockHolder.STOCK3} -{Stock3SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock3Name} JUST CRASHED!!!");
                        ResetStock(3);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock3Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK3 -= Stock3SpecialEvent1Change;
                        embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} 🔻 {StockHolder.STOCK3} -{Stock2SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock3Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock3SpecialEvent <= 3)
            {
                if (Stock3POSORNEG == 0)
                {
                    StockHolder.STOCK3 += Stock3SpecialEvent2Change;
                    embed.AddField($"{Stock3Name}", $"🔺 {Stock3Acronym} --- {StockHolder.STOCK3} +{Stock3SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock3Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK3 < Stock3SpecialEvent2Change)
                    {
                        StockHolder.STOCK3 = 0;
                        embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} 🔻 {StockHolder.STOCK3} -{Stock3SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock3Name} just went into a Depression!!");
                        ResetStock(3);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock3Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK3 -= Stock3SpecialEvent2Change;
                        embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} 🔻 {StockHolder.STOCK3} -{Stock3SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock3Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock3SpecialEvent <= 7)
            {
                if (Stock3POSORNEG == 0)
                {
                    StockHolder.STOCK3 += Stock3SpecialEvent3Change;
                    embed.AddField($"{Stock3Name}", $"🔺 {Stock3Acronym} --- {StockHolder.STOCK3} +{Stock3SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock3Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK3 < Stock1SpecialEvent3Change)
                    {
                        StockHolder.STOCK3 = 0;
                        embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} 🔻 {StockHolder.STOCK3} -{Stock3SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock3Name} just Recessed!");
                        ResetStock(3);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock3Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK3 -= Stock3SpecialEvent3Change;
                        embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} 🔻 {StockHolder.STOCK3} -{Stock3SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock3Name} just Recessed!");
                    }
                }
            }
            else if (Stock3Change == 0)
            {
                embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} --- {StockHolder.STOCK3} ---");
            }
            else
            {
                if (Stock3POSORNEG == 0)
                {
                    StockHolder.STOCK3 += Stock3Change;
                    embed.AddField($"{Stock3Name}", $"🔺 {Stock3Acronym} --- {StockHolder.STOCK3} +{Stock3Change}");
                }
                else
                {
                    if (StockHolder.STOCK3 < Stock3Change)
                    {
                        StockHolder.STOCK3 = 0;
                        embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} 🔻 {StockHolder.STOCK3} -{Stock3Change}");
                        ResetStock(3);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock3Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK3 -= Stock3Change;
                        embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} 🔻 {StockHolder.STOCK3} -{Stock3Change}");
                    }
                }
            }
            #endregion

            #region Stock4

            if (StockHolder.STOCK4 == 0)
            {
                embed.AddField($"{Stock4Name}", $"💀 {Stock4Acronym} 💀 {StockHolder.STOCK4} ---");
            }
            else if (StockHolder.STOCK4 >= 1000)
            {
                embed.AddField($"{Stock4Name}", $"👑 {Stock4Acronym} 👑 {StockHolder.STOCK4} ---");
            }
            else if (Stock4SpecialEvent == 1)
            {
                if (Stock4POSORNEG == 0)
                {
                    StockHolder.STOCK4 += Stock4SpecialEvent1Change;
                    embed.AddField($"{Stock4Name}", $"🔺 {Stock4Acronym} --- {StockHolder.STOCK4} +{Stock4SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock4Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK4 < Stock4SpecialEvent1Change)
                    {
                        StockHolder.STOCK4 = 0;
                        embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} 🔻 {StockHolder.STOCK4} -{Stock4SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock4Name} JUST CRASHED!!!");
                        ResetStock(4);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock4Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK4 -= Stock4SpecialEvent1Change;
                        embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} 🔻 {StockHolder.STOCK4} -{Stock4SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock4Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock4SpecialEvent <= 3)
            {
                if (Stock4POSORNEG == 0)
                {
                    StockHolder.STOCK4 += Stock4SpecialEvent2Change;
                    embed.AddField($"{Stock4Name}", $"🔺 {Stock4Acronym} --- {StockHolder.STOCK4} +{Stock4SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock4Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK4 < Stock4SpecialEvent2Change)
                    {
                        StockHolder.STOCK4 = 0;
                        embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} 🔻 {StockHolder.STOCK4} -{Stock4SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock4Name} just went into a Depression!!");
                        ResetStock(4);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock4Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK4 -= Stock4SpecialEvent2Change;
                        embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} 🔻 {StockHolder.STOCK4} -{Stock4SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock4Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock4SpecialEvent <= 7)
            {
                if (Stock4POSORNEG == 0)
                {
                    StockHolder.STOCK4 += Stock4SpecialEvent3Change;
                    embed.AddField($"{Stock4Name}", $"🔺 {Stock4Acronym} --- {StockHolder.STOCK4} +{Stock4SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock4Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK4 < Stock4SpecialEvent3Change)
                    {
                        StockHolder.STOCK4 = 0;
                        embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} 🔻 {StockHolder.STOCK4} -{Stock4SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock4Name} just Recessed!");
                        ResetStock(4);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock4Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK4 -= Stock4SpecialEvent3Change;
                        embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} 🔻 {StockHolder.STOCK4} -{Stock4SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock4Name} just Recessed!");
                    }
                }
            }
            else if (Stock4Change == 0)
            {
                embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} --- {StockHolder.STOCK4} ---");
            }
            else
            {
                if (Stock4POSORNEG == 0)
                {
                    StockHolder.STOCK4 += Stock4Change;
                    embed.AddField($"{Stock4Name}", $"🔺 {Stock4Acronym} --- {StockHolder.STOCK4} +{Stock4Change}");
                }
                else
                {
                    if (StockHolder.STOCK4 < Stock4Change)
                    {
                        StockHolder.STOCK4 = 0;
                        embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} 🔻 {StockHolder.STOCK4} -{Stock4Change}");
                        ResetStock(4);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock4Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK4 -= Stock4Change;
                        embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} 🔻 {StockHolder.STOCK4} -{Stock4Change}");
                    }
                }
            }
            #endregion

            #region Stock5

            if (StockHolder.STOCK5 == 0)
            {
                embed.AddField($"{Stock5Name}", $"💀 {Stock5Acronym} 💀 {StockHolder.STOCK5} ---");
            }
            else if (StockHolder.STOCK5 >= 1000)
            {
                embed.AddField($"{Stock5Name}", $"👑 {Stock5Acronym} 👑 {StockHolder.STOCK5} ---");
            }
            else if (Stock5SpecialEvent == 1)
            {
                if (Stock5POSORNEG == 0)
                {
                    StockHolder.STOCK5 += Stock5SpecialEvent1Change;
                    embed.AddField($"{Stock5Name}", $"🔺 {Stock5Acronym} --- {StockHolder.STOCK5} +{Stock5SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock5Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK5 < Stock5SpecialEvent1Change)
                    {
                        StockHolder.STOCK5 = 0;
                        embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} 🔻 {StockHolder.STOCK5} -{Stock5SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock5Name} JUST CRASHED!!!");
                        ResetStock(5);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock5Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK5 -= Stock5SpecialEvent1Change;
                        embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} 🔻 {StockHolder.STOCK5} -{Stock5SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock5Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock5SpecialEvent <= 3)
            {
                if (Stock5POSORNEG == 0)
                {
                    StockHolder.STOCK5 += Stock5SpecialEvent2Change;
                    embed.AddField($"{Stock5Name}", $"🔺 {Stock5Acronym} --- {StockHolder.STOCK5} +{Stock5SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock5Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK5 < Stock5SpecialEvent2Change)
                    {
                        StockHolder.STOCK5 = 0;
                        embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} 🔻 {StockHolder.STOCK5} -{Stock5SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock5Name} just went into a Depression!!");
                        ResetStock(5);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock5Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK5 -= Stock5SpecialEvent2Change;
                        embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} 🔻 {StockHolder.STOCK5} -{Stock5SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock5Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock5SpecialEvent <= 7)
            {
                if (Stock5POSORNEG == 0)
                {
                    StockHolder.STOCK5 += Stock5SpecialEvent3Change;
                    embed.AddField($"{Stock5Name}", $"🔺 {Stock5Acronym} --- {StockHolder.STOCK5} +{Stock5SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock5Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK5 < Stock5SpecialEvent3Change)
                    {
                        StockHolder.STOCK5 = 0;
                        embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} 🔻 {StockHolder.STOCK5} -{Stock5SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock5Name} just Recessed!");
                        ResetStock(5);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock5Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK5 -= Stock5SpecialEvent3Change;
                        embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} 🔻 {StockHolder.STOCK5} -{Stock5SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock5Name} just Recessed!");
                    }
                }
            }
            else if (Stock5Change == 0)
            {
                embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} --- {StockHolder.STOCK5} ---");
            }
            else
            {
                if (Stock5POSORNEG == 0)
                {
                    StockHolder.STOCK5 += Stock5Change;
                    embed.AddField($"{Stock5Name}", $"🔺 {Stock5Acronym} --- {StockHolder.STOCK5} +{Stock5Change}");
                }
                else
                {
                    if (StockHolder.STOCK5 < Stock5Change)
                    {
                        StockHolder.STOCK5 = 0;
                        embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} 🔻 {StockHolder.STOCK5} -{Stock5Change}");
                        ResetStock(5);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock5Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK5 -= Stock5Change;
                        embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} 🔻 {StockHolder.STOCK5} -{Stock5Change}");
                    }
                }
            }
            #endregion

            #region Stock6

            if (StockHolder.STOCK6 == 0)
            {
                embed.AddField($"{Stock6Name}", $"💀 {Stock6Acronym} 💀 {StockHolder.STOCK6} ---");
            }
            else if (StockHolder.STOCK6 >= 1000)
            {
                embed.AddField($"{Stock6Name}", $"👑 {Stock6Acronym} 👑 {StockHolder.STOCK6} ---");
            }
            else if (Stock6SpecialEvent == 1)
            {
                if (Stock6POSORNEG == 0)
                {
                    StockHolder.STOCK6 += Stock6SpecialEvent1Change;
                    embed.AddField($"{Stock6Name}", $"🔺 {Stock6Acronym} --- {StockHolder.STOCK6} +{Stock6SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock6Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK6 < Stock6SpecialEvent1Change)
                    {
                        StockHolder.STOCK6 = 0;
                        embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} 🔻 {StockHolder.STOCK6} -{Stock6SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock6Name} JUST CRASHED!!!");
                        ResetStock(6);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock6Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK6 -= Stock6SpecialEvent1Change;
                        embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} 🔻 {StockHolder.STOCK6} -{Stock6SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock6Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock6SpecialEvent <= 3)
            {
                if (Stock6POSORNEG == 0)
                {
                    StockHolder.STOCK6 += Stock6SpecialEvent2Change;
                    embed.AddField($"{Stock6Name}", $"🔺 {Stock6Acronym} --- {StockHolder.STOCK6} +{Stock6SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock6Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK6 < Stock6SpecialEvent2Change)
                    {
                        StockHolder.STOCK6 = 0;
                        embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} 🔻 {StockHolder.STOCK6} -{Stock6SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock6Name} just went into a Depression!!");
                        ResetStock(6);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock6Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK6 -= Stock6SpecialEvent2Change;
                        embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} 🔻 {StockHolder.STOCK6} -{Stock6SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock6Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock6SpecialEvent <= 7)
            {
                if (Stock6POSORNEG == 0)
                {
                    StockHolder.STOCK6 += Stock6SpecialEvent3Change;
                    embed.AddField($"{Stock6Name}", $"🔺 {Stock6Acronym} --- {StockHolder.STOCK6} +{Stock6SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock6Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK6 < Stock6SpecialEvent3Change)
                    {
                        StockHolder.STOCK6 = 0;
                        embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} 🔻 {StockHolder.STOCK6} -{Stock6SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock6Name} just Recessed!");
                        ResetStock(6);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock6Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK6 -= Stock6SpecialEvent3Change;
                        embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} 🔻 {StockHolder.STOCK6} -{Stock6SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock6Name} just Recessed!");
                    }
                }
            }
            else if (Stock6Change == 0)
            {
                embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} --- {StockHolder.STOCK6} ---");
            }
            else
            {
                if (Stock6POSORNEG == 0)
                {
                    StockHolder.STOCK6 += Stock6Change;
                    embed.AddField($"{Stock6Name}", $"🔺 {Stock6Acronym} --- {StockHolder.STOCK6} +{Stock6Change}");
                }
                else
                {
                    if (StockHolder.STOCK6 < Stock6Change)
                    {
                        StockHolder.STOCK6 = 0;
                        embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} 🔻 {StockHolder.STOCK6} -{Stock6Change}");
                        ResetStock(6);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock6Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK6 -= Stock6Change;
                        embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} 🔻 {StockHolder.STOCK6} -{Stock6Change}");
                    }
                }
            }
            #endregion

            #region Stock7

            if (StockHolder.STOCK7 == 0)
            {
                embed.AddField($"{Stock7Name}", $"💀 {Stock7Acronym} 💀 {StockHolder.STOCK7} ---");
            }
            else if (StockHolder.STOCK7 >= 1000)
            {
                embed.AddField($"{Stock7Name}", $"👑 {Stock7Acronym} 👑 {StockHolder.STOCK7} ---");
            }
            else if (Stock7SpecialEvent == 1)
            {
                if (Stock7POSORNEG == 0)
                {
                    StockHolder.STOCK7 += Stock7SpecialEvent1Change;
                    embed.AddField($"{Stock7Name}", $"🔺 {Stock7Acronym} --- {StockHolder.STOCK7} +{Stock7SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock7Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK7 < Stock7SpecialEvent1Change)
                    {
                        StockHolder.STOCK7 = 0;
                        embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} 🔻 {StockHolder.STOCK7} -{Stock7SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock7Name} JUST CRASHED!!!");
                        ResetStock(7);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock7Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK7 -= Stock7SpecialEvent1Change;
                        embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} 🔻 {StockHolder.STOCK7} -{Stock7SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock7Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock7SpecialEvent <= 3)
            {
                if (Stock7POSORNEG == 0)
                {
                    StockHolder.STOCK7 += Stock7SpecialEvent2Change;
                    embed.AddField($"{Stock7Name}", $"🔺 {Stock7Acronym} --- {StockHolder.STOCK7} +{Stock7SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock7Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK7 < Stock7SpecialEvent2Change)
                    {
                        StockHolder.STOCK7 = 0;
                        embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} 🔻 {StockHolder.STOCK7} -{Stock7SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock7Name} just went into a Depression!!");
                        ResetStock(7);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock7Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK7 -= Stock7SpecialEvent2Change;
                        embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} 🔻 {StockHolder.STOCK7} -{Stock7SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock7Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock7SpecialEvent <= 7)
            {
                if (Stock7POSORNEG == 0)
                {
                    StockHolder.STOCK7 += Stock7SpecialEvent3Change;
                    embed.AddField($"{Stock7Name}", $"🔺 {Stock7Acronym} --- {StockHolder.STOCK7} +{Stock7SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock7Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK7 < Stock7SpecialEvent3Change)
                    {
                        StockHolder.STOCK7 = 0;
                        embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} 🔻 {StockHolder.STOCK7} -{Stock7SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock7Name} just Recessed!");
                        ResetStock(7);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock7Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK7 -= Stock7SpecialEvent3Change;
                        embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} 🔻 {StockHolder.STOCK7} -{Stock7SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock7Name} just Recessed!");
                    }
                }
            }
            else if (Stock7Change == 0)
            {
                embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} --- {StockHolder.STOCK7} ---");
            }
            else
            {
                if (Stock7POSORNEG == 0)
                {
                    StockHolder.STOCK7 += Stock7Change;
                    embed.AddField($"{Stock7Name}", $"🔺 {Stock7Acronym} --- {StockHolder.STOCK7} +{Stock7Change}");
                }
                else
                {
                    if (StockHolder.STOCK7 < Stock7Change)
                    {
                        StockHolder.STOCK7 = 0;
                        embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} 🔻 {StockHolder.STOCK7} -{Stock7Change}");
                        ResetStock(7);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock7Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK7 -= Stock7Change;
                        embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} 🔻 {StockHolder.STOCK7} -{Stock7Change}");
                    }
                }
            }
            #endregion

            #region Stock8

            if (StockHolder.STOCK8 == 0)
            {
                embed.AddField($"{Stock8Name}", $"💀 {Stock8Acronym} 💀 {StockHolder.STOCK8} ---");
            }
            else if (StockHolder.STOCK8 >= 1000)
            {
                embed.AddField($"{Stock8Name}", $"👑 {Stock8Acronym} 👑 {StockHolder.STOCK8} ---");
            }
            else if (Stock8SpecialEvent == 1)
            {
                if (Stock8POSORNEG == 0)
                {
                    StockHolder.STOCK8 += Stock8SpecialEvent1Change;
                    embed.AddField($"{Stock8Name}", $"🔺 {Stock8Acronym} --- {StockHolder.STOCK8} +{Stock8SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock8Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK8 < Stock8SpecialEvent1Change)
                    {
                        StockHolder.STOCK8 = 0;
                        embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} 🔻 {StockHolder.STOCK8} -{Stock8SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock8Name} JUST CRASHED!!!");
                        ResetStock(8);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock8Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK8 -= Stock8SpecialEvent1Change;
                        embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} 🔻 {StockHolder.STOCK8} -{Stock8SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock8Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock8SpecialEvent <= 3)
            {
                if (Stock8POSORNEG == 0)
                {
                    StockHolder.STOCK8 += Stock8SpecialEvent2Change;
                    embed.AddField($"{Stock8Name}", $"🔺 {Stock8Acronym} --- {StockHolder.STOCK8} +{Stock8SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock8Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK8 < Stock8SpecialEvent2Change)
                    {
                        StockHolder.STOCK8 = 0;
                        embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} 🔻 {StockHolder.STOCK8} -{Stock8SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock8Name} just went into a Depression!!");
                        ResetStock(8);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock8Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK8 -= Stock8SpecialEvent2Change;
                        embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} 🔻 {StockHolder.STOCK8} -{Stock8SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock8Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock8SpecialEvent <= 7)
            {
                if (Stock8POSORNEG == 0)
                {
                    StockHolder.STOCK8 += Stock8SpecialEvent3Change;
                    embed.AddField($"{Stock8Name}", $"🔺 {Stock8Acronym} --- {StockHolder.STOCK8} +{Stock8SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock8Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK8 < Stock8SpecialEvent3Change)
                    {
                        StockHolder.STOCK8 = 0;
                        embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} 🔻 {StockHolder.STOCK8} -{Stock8SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock8Name} just Recessed!");
                        ResetStock(8);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock8Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK8 -= Stock8SpecialEvent3Change;
                        embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} 🔻 {StockHolder.STOCK8} -{Stock8SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock8Name} just Recessed!");
                    }
                }
            }
            else if (Stock8Change == 0)
            {
                embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} --- {StockHolder.STOCK8} ---");
            }
            else
            {
                if (Stock8POSORNEG == 0)
                {
                    StockHolder.STOCK8 += Stock8Change;
                    embed.AddField($"{Stock8Name}", $"🔺 {Stock8Acronym} --- {StockHolder.STOCK8} +{Stock8Change}");
                }
                else
                {
                    if (StockHolder.STOCK8 < Stock8Change)
                    {
                        StockHolder.STOCK8 = 0;
                        embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} 🔻 {StockHolder.STOCK8} -{Stock8Change}");
                        ResetStock(8);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock8Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK8 -= Stock8Change;
                        embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} 🔻 {StockHolder.STOCK8} -{Stock8Change}");
                    }
                }
            }
            #endregion

            #region Stock9

            if (StockHolder.STOCK9 == 0)
            {
                embed.AddField($"{Stock9Name}", $"💀 {Stock9Acronym} 💀 {StockHolder.STOCK9} ---");
            }
            else if (StockHolder.STOCK9 >= 1000)
            {
                embed.AddField($"{Stock9Name}", $"👑 {Stock9Acronym} 👑 {StockHolder.STOCK9} ---");
            }
            else if (Stock9SpecialEvent == 1)
            {
                if (Stock9POSORNEG == 0)
                {
                    StockHolder.STOCK9 += Stock9SpecialEvent1Change;
                    embed.AddField($"{Stock9Name}", $"🔺 {Stock9Acronym} --- {StockHolder.STOCK9} +{Stock9SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock9Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK9 < Stock9SpecialEvent1Change)
                    {
                        StockHolder.STOCK9 = 0;
                        embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} 🔻 {StockHolder.STOCK9} -{Stock9SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock9Name} JUST CRASHED!!!");
                        ResetStock(9);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock9Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK9 -= Stock9SpecialEvent1Change;
                        embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} 🔻 {StockHolder.STOCK9} -{Stock9SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock9Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock9SpecialEvent <= 3)
            {
                if (Stock9POSORNEG == 0)
                {
                    StockHolder.STOCK9 += Stock9SpecialEvent2Change;
                    embed.AddField($"{Stock9Name}", $"🔺 {Stock9Acronym} --- {StockHolder.STOCK9} +{Stock9SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock9Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK9 < Stock9SpecialEvent2Change)
                    {
                        StockHolder.STOCK9 = 0;
                        embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} 🔻 {StockHolder.STOCK9} -{Stock9SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock9Name} just went into a Depression!!");
                        ResetStock(9);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock9Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK9 -= Stock9SpecialEvent2Change;
                        embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} 🔻 {StockHolder.STOCK9} -{Stock9SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock9Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock9SpecialEvent <= 7)
            {
                if (Stock9POSORNEG == 0)
                {
                    StockHolder.STOCK9 += Stock9SpecialEvent3Change;
                    embed.AddField($"{Stock9Name}", $"🔺 {Stock9Acronym} --- {StockHolder.STOCK9} +{Stock9SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock9Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK9 < Stock9SpecialEvent3Change)
                    {
                        StockHolder.STOCK9 = 0;
                        embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} 🔻 {StockHolder.STOCK9} -{Stock9SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock9Name} just Recessed!");
                        ResetStock(9);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock9Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK9 -= Stock9SpecialEvent3Change;
                        embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} 🔻 {StockHolder.STOCK9} -{Stock9SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock9Name} just Recessed!");
                    }
                }
            }
            else if (Stock9Change == 0)
            {
                embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} --- {StockHolder.STOCK9} ---");
            }
            else
            {
                if (Stock9POSORNEG == 0)
                {
                    StockHolder.STOCK9 += Stock9Change;
                    embed.AddField($"{Stock9Name}", $"🔺 {Stock9Acronym} --- {StockHolder.STOCK9} +{Stock9Change}");
                }
                else
                {
                    if (StockHolder.STOCK9 < Stock9Change)
                    {
                        StockHolder.STOCK9 = 0;
                        embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} 🔻 {StockHolder.STOCK9} -{Stock9Change}");
                        ResetStock(9);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock9Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK9 -= Stock9Change;
                        embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} 🔻 {StockHolder.STOCK9} -{Stock9Change}");
                    }
                }
            }
            #endregion

            #endregion
            embed.WithAuthor($"Stock change caused by MrFumpleBot.", "https://cdn.discordapp.com/attachments/483302550666346498/491796117919629349/Mr.FumpleBot9000.png");
            await StockTextChannel.SendMessageAsync("", embed: embed);
        }
        [Command("Set Stock Price")]
        [RequireUserPermission(GuildPermission.Administrator)]
        public async Task SetStock([Remainder]string message)
        {
            string[] stockmessage = message.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            string stock = stockmessage[0];
            uint value = Convert.ToUInt32(stockmessage[1]);

            string stocknamelowered = stock.ToLower();

            var StockHolder = UserAccounts.GetAccount(Global.Client.GetUser(439896715781210115));

            string Stock1LoweredAcronym = StockHolder.STOCK1ABBREVIATION.ToLower();
            string Stock2LoweredAcronym = StockHolder.STOCK2ABBREVIATION.ToLower();
            string Stock3LoweredAcronym = StockHolder.STOCK3ABBREVIATION.ToLower();
            string Stock4LoweredAcronym = StockHolder.STOCK4ABBREVIATION.ToLower();
            string Stock5LoweredAcronym = StockHolder.STOCK5ABBREVIATION.ToLower();
            string Stock6LoweredAcronym = StockHolder.STOCK6ABBREVIATION.ToLower();
            string Stock7LoweredAcronym = StockHolder.STOCK7ABBREVIATION.ToLower();
            string Stock8LoweredAcronym = StockHolder.STOCK8ABBREVIATION.ToLower();
            string Stock9LoweredAcronym = StockHolder.STOCK9ABBREVIATION.ToLower();

            if (stocknamelowered == $"{Stock1LoweredAcronym}")
            {
                StockHolder.STOCK1 = value;
            }
            else if (stocknamelowered == $"{Stock2LoweredAcronym}")
            {
                StockHolder.STOCK2 = value;
            }
            else if (stocknamelowered == $"{Stock3LoweredAcronym}")
            {
                StockHolder.STOCK3 = value;
            }
            else if (stocknamelowered == $"{Stock4LoweredAcronym}")
            {
                StockHolder.STOCK4 = value;
            }
            else if (stocknamelowered == $"{Stock5LoweredAcronym}")
            {
                StockHolder.STOCK5 = value;
            }
            else if (stocknamelowered == $"{Stock6LoweredAcronym}")
            {
                StockHolder.STOCK6 = value;
            }
            else if (stocknamelowered == $"{Stock7LoweredAcronym}")
            {
                StockHolder.STOCK7 = value;
            }
            else if (stocknamelowered == $"{Stock8LoweredAcronym}")
            {
                StockHolder.STOCK8 = value;
            }
            else if (stocknamelowered == $"{Stock9LoweredAcronym}")
            {
                StockHolder.STOCK9 = value;
            }
            else
            {
                await Context.Channel.SendMessageAsync("That is not a stock!");
                return;
            }

            await Context.Channel.SendMessageAsync("Stock price set.");
        }
        [Command("Set Stock Abbreviation")]
        [RequireUserPermission(GuildPermission.Administrator)]
        public async Task SetStockAbbreviation([Remainder]string message)
        {
            string[] stockmessage = message.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            string stock = stockmessage[0];
            string NewAbbreviation = stockmessage[1];

            string stocknamelowered = stock.ToLower();

            var StockHolder = UserAccounts.GetAccount(Global.Client.GetUser(439896715781210115));

            string Stock1LoweredAcronym = StockHolder.STOCK1ABBREVIATION.ToLower();
            string Stock2LoweredAcronym = StockHolder.STOCK2ABBREVIATION.ToLower();
            string Stock3LoweredAcronym = StockHolder.STOCK3ABBREVIATION.ToLower();
            string Stock4LoweredAcronym = StockHolder.STOCK4ABBREVIATION.ToLower();
            string Stock5LoweredAcronym = StockHolder.STOCK5ABBREVIATION.ToLower();
            string Stock6LoweredAcronym = StockHolder.STOCK6ABBREVIATION.ToLower();
            string Stock7LoweredAcronym = StockHolder.STOCK7ABBREVIATION.ToLower();
            string Stock8LoweredAcronym = StockHolder.STOCK8ABBREVIATION.ToLower();
            string Stock9LoweredAcronym = StockHolder.STOCK9ABBREVIATION.ToLower();

            if (stocknamelowered == $"{Stock1LoweredAcronym}")
            {
                StockHolder.STOCK1ABBREVIATION = NewAbbreviation;
            }
            else if (stocknamelowered == $"{Stock2LoweredAcronym}")
            {
                StockHolder.STOCK2ABBREVIATION = NewAbbreviation;
            }
            else if (stocknamelowered == $"{Stock3LoweredAcronym}")
            {
                StockHolder.STOCK3ABBREVIATION = NewAbbreviation;
            }
            else if (stocknamelowered == $"{Stock4LoweredAcronym}")
            {
                StockHolder.STOCK4ABBREVIATION = NewAbbreviation;
            }
            else if (stocknamelowered == $"{Stock5LoweredAcronym}")
            {
                StockHolder.STOCK5ABBREVIATION = NewAbbreviation;
            }
            else if (stocknamelowered == $"{Stock6LoweredAcronym}")
            {
                StockHolder.STOCK6ABBREVIATION = NewAbbreviation;
            }
            else if (stocknamelowered == $"{Stock7LoweredAcronym}")
            {
                StockHolder.STOCK7ABBREVIATION = NewAbbreviation;
            }
            else if (stocknamelowered == $"{Stock8LoweredAcronym}")
            {
                StockHolder.STOCK8ABBREVIATION = NewAbbreviation;
            }
            else if (stocknamelowered == $"{Stock9LoweredAcronym}")
            {
                StockHolder.STOCK9ABBREVIATION = NewAbbreviation;
            }
            else
            {
                await Context.Channel.SendMessageAsync("That is not a stock!");
                return;
            }

            await Context.Channel.SendMessageAsync("Stock abbreviation set.");
        }
        [Command("Set Stock Name")]
        [RequireUserPermission(GuildPermission.Administrator)]
        public async Task SetStockName([Remainder]string message)
        {
            string[] stockmessage = message.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            string stock = stockmessage[0];

            string NewName = stockmessage[1].Replace("_", " ");

            string stocknamelowered = stock.ToLower();

            var StockHolder = UserAccounts.GetAccount(Global.Client.GetUser(439896715781210115));

            string Stock1LoweredAcronym = StockHolder.STOCK1ABBREVIATION.ToLower();
            string Stock2LoweredAcronym = StockHolder.STOCK2ABBREVIATION.ToLower();
            string Stock3LoweredAcronym = StockHolder.STOCK3ABBREVIATION.ToLower();
            string Stock4LoweredAcronym = StockHolder.STOCK4ABBREVIATION.ToLower();
            string Stock5LoweredAcronym = StockHolder.STOCK5ABBREVIATION.ToLower();
            string Stock6LoweredAcronym = StockHolder.STOCK6ABBREVIATION.ToLower();
            string Stock7LoweredAcronym = StockHolder.STOCK7ABBREVIATION.ToLower();
            string Stock8LoweredAcronym = StockHolder.STOCK8ABBREVIATION.ToLower();
            string Stock9LoweredAcronym = StockHolder.STOCK9ABBREVIATION.ToLower();

            if (stocknamelowered == $"{Stock1LoweredAcronym}")
            {
                StockHolder.STOCK1NAME = NewName;
            }
            else if (stocknamelowered == $"{Stock2LoweredAcronym}")
            {
                StockHolder.STOCK2NAME = NewName;
            }
            else if (stocknamelowered == $"{Stock3LoweredAcronym}")
            {
                StockHolder.STOCK3NAME = NewName;
            }
            else if (stocknamelowered == $"{Stock4LoweredAcronym}")
            {
                StockHolder.STOCK4NAME = NewName;
            }
            else if (stocknamelowered == $"{Stock5LoweredAcronym}")
            {
                StockHolder.STOCK5NAME = NewName;
            }
            else if (stocknamelowered == $"{Stock6LoweredAcronym}")
            {
                StockHolder.STOCK6NAME = NewName;
            }
            else if (stocknamelowered == $"{Stock7LoweredAcronym}")
            {
                StockHolder.STOCK7NAME = NewName;
            }
            else if (stocknamelowered == $"{Stock8LoweredAcronym}")
            {
                StockHolder.STOCK8NAME = NewName;
            }
            else if (stocknamelowered == $"{Stock9LoweredAcronym}")
            {
                StockHolder.STOCK9NAME = NewName;
            }
            else
            {
                await Context.Channel.SendMessageAsync("That is not a stock!");
                return;
            }

            await Context.Channel.SendMessageAsync("Stock name set.");
        }
        [Command("invest")]
        public async Task StockTest([Remainder]string message)
        {
            string[] stockmessage = message.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            string stock = stockmessage[0];
            uint amount = Convert.ToUInt32(stockmessage[1]);
            string stocknamelowered = stock.ToLower();

            var StockHolder = UserAccounts.GetAccount(Global.Client.GetUser(439896715781210115));
            var account = UserAccounts.GetAccount(Context.User);

            string Stock1Name = StockHolder.STOCK1NAME;
            string Stock2Name = StockHolder.STOCK2NAME;
            string Stock3Name = StockHolder.STOCK3NAME;
            string Stock4Name = StockHolder.STOCK4NAME;
            string Stock5Name = StockHolder.STOCK5NAME;
            string Stock6Name = StockHolder.STOCK6NAME;
            string Stock7Name = StockHolder.STOCK7NAME;
            string Stock8Name = StockHolder.STOCK8NAME;
            string Stock9Name = StockHolder.STOCK9NAME;

            string Stock1LoweredAcronym = StockHolder.STOCK1ABBREVIATION.ToLower();
            string Stock2LoweredAcronym = StockHolder.STOCK2ABBREVIATION.ToLower();
            string Stock3LoweredAcronym = StockHolder.STOCK3ABBREVIATION.ToLower();
            string Stock4LoweredAcronym = StockHolder.STOCK4ABBREVIATION.ToLower();
            string Stock5LoweredAcronym = StockHolder.STOCK5ABBREVIATION.ToLower();
            string Stock6LoweredAcronym = StockHolder.STOCK6ABBREVIATION.ToLower();
            string Stock7LoweredAcronym = StockHolder.STOCK7ABBREVIATION.ToLower();
            string Stock8LoweredAcronym = StockHolder.STOCK8ABBREVIATION.ToLower();
            string Stock9LoweredAcronym = StockHolder.STOCK9ABBREVIATION.ToLower();

            if (amount <= 0)
            {
                await Context.Channel.SendMessageAsync($"You can't invest in nothing!");
            }
            else if (stocknamelowered == Stock1LoweredAcronym)
            {
                if (account.COINS < StockHolder.STOCK1 * amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {StockHolder.STOCK1 * amount} fumplebucks!");
                }
                else if (StockHolder.STOCK1 == 0)
                {
                    await Context.Channel.SendMessageAsync($"You can't invest in nothing!!!");
                }
                else
                {
                    account.STOCK1 += amount;
                    account.COINS -= StockHolder.STOCK1 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just invested into {Stock1Name} {amount} times.");
                }
            }
            else if (stocknamelowered == Stock2LoweredAcronym)
            {
                if (account.COINS < StockHolder.STOCK2 * amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {StockHolder.STOCK2 * amount} fumplebucks!");
                }
                else if (StockHolder.STOCK2 == 0)
                {
                    await Context.Channel.SendMessageAsync($"You can't invest in nothing!!!");
                }
                else
                {
                    account.STOCK2 += amount;
                    account.COINS -= StockHolder.STOCK2 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just invested into {Stock2Name} {amount} times.");
                }
            }
            else if (stocknamelowered == Stock3LoweredAcronym)
            {
                if (account.COINS < StockHolder.STOCK3 * amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {StockHolder.STOCK3 * amount} fumplebucks!");
                }
                else if (StockHolder.STOCK3 == 0)
                {
                    await Context.Channel.SendMessageAsync($"You can't invest in nothing!!!");
                }
                else
                {
                    account.STOCK3 += amount;
                    account.COINS -= StockHolder.STOCK3 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just invested into {Stock3Name} {amount} times.");
                }
            }
            else if (stocknamelowered == Stock4LoweredAcronym)
            {
                if (account.COINS < StockHolder.STOCK4 * amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {StockHolder.STOCK4 * amount} fumplebucks!");
                }
                else if (StockHolder.STOCK4 == 0)
                {
                    await Context.Channel.SendMessageAsync($"You can't invest in nothing!!!");
                }
                else
                {
                    account.STOCK4 += amount;
                    account.COINS -= StockHolder.STOCK4 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just invested into {Stock4Name} {amount} times.");
                }
            }
            else if (stocknamelowered == Stock5LoweredAcronym)
            {
                if (account.COINS < StockHolder.STOCK5 * amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {StockHolder.STOCK5 * amount} fumplebucks!");
                }
                else if (StockHolder.STOCK5 == 0)
                {
                    await Context.Channel.SendMessageAsync($"You can't invest in nothing!!!");
                }
                else
                {
                    account.STOCK5 += amount;
                    account.COINS -= StockHolder.STOCK5 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just invested into {Stock5Name} {amount} times.");
                }
            }
            else if (stocknamelowered == Stock6LoweredAcronym)
            {
                if (account.COINS < StockHolder.STOCK6 * amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {StockHolder.STOCK6 * amount} fumplebucks!");
                }
                else if (StockHolder.STOCK6 == 0)
                {
                    await Context.Channel.SendMessageAsync($"You can't invest in nothing!!!");
                }
                else
                {
                    account.STOCK6 += amount;
                    account.COINS -= StockHolder.STOCK6 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just invested into {Stock6Name} {amount} times.");
                }
            }
            else if (stocknamelowered == Stock7LoweredAcronym)
            {
                if (account.COINS < StockHolder.STOCK7 * amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {StockHolder.STOCK7 * amount} fumplebucks!");
                }
                else if (StockHolder.STOCK7 == 0)
                {
                    await Context.Channel.SendMessageAsync($"You can't invest in nothing!!!");
                }
                else
                {
                    account.STOCK7 += amount;
                    account.COINS -= StockHolder.STOCK7 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just invested into {Stock7Name} {amount} times.");
                }
            }
            else if (stocknamelowered == Stock8LoweredAcronym)
            {
                if (account.COINS < StockHolder.STOCK8 * amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {StockHolder.STOCK8 * amount} fumplebucks!");
                }
                else if (StockHolder.STOCK8 == 0)
                {
                    await Context.Channel.SendMessageAsync($"You can't invest in nothing!!!");
                }
                else
                {
                    account.STOCK8 += amount;
                    account.COINS -= StockHolder.STOCK8 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just invested into {Stock8Name} {amount} times.");
                }
            }
            else if (stocknamelowered == Stock9LoweredAcronym)
            {
                if (account.COINS < StockHolder.STOCK9 * amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {StockHolder.STOCK9 * amount} fumplebucks!");
                }
                else if (StockHolder.STOCK9 == 0)
                {
                    await Context.Channel.SendMessageAsync($"You can't invest in nothing!!!");
                }
                else
                {
                    account.STOCK9 += amount;
                    account.COINS -= StockHolder.STOCK9 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just invested into {Stock9Name} {amount} times.");
                }
            }
            else
            {
                await Context.Channel.SendMessageAsync("That is not a stock!");
            }
        }
        [Command("sell")]
        public async Task sell([Remainder]string message)
        {
            string[] stockmessage = message.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            string stock = stockmessage[0];
            uint amount = Convert.ToUInt32(stockmessage[1]);
            string stocknamelowered = stock.ToLower();

            var StockHolder = UserAccounts.GetAccount(Global.Client.GetUser(439896715781210115));
            var account = UserAccounts.GetAccount(Context.User);

            string Stock1Name = StockHolder.STOCK1NAME;
            string Stock2Name = StockHolder.STOCK2NAME;
            string Stock3Name = StockHolder.STOCK3NAME;
            string Stock4Name = StockHolder.STOCK4NAME;
            string Stock5Name = StockHolder.STOCK5NAME;
            string Stock6Name = StockHolder.STOCK6NAME;
            string Stock7Name = StockHolder.STOCK7NAME;
            string Stock8Name = StockHolder.STOCK8NAME;
            string Stock9Name = StockHolder.STOCK9NAME;

            string Stock1LoweredAcronym = StockHolder.STOCK1ABBREVIATION.ToLower();
            string Stock2LoweredAcronym = StockHolder.STOCK2ABBREVIATION.ToLower();
            string Stock3LoweredAcronym = StockHolder.STOCK3ABBREVIATION.ToLower();
            string Stock4LoweredAcronym = StockHolder.STOCK4ABBREVIATION.ToLower();
            string Stock5LoweredAcronym = StockHolder.STOCK5ABBREVIATION.ToLower();
            string Stock6LoweredAcronym = StockHolder.STOCK6ABBREVIATION.ToLower();
            string Stock7LoweredAcronym = StockHolder.STOCK7ABBREVIATION.ToLower();
            string Stock8LoweredAcronym = StockHolder.STOCK8ABBREVIATION.ToLower();
            string Stock9LoweredAcronym = StockHolder.STOCK9ABBREVIATION.ToLower();

            if (amount <= 0)
            {
                await Context.Channel.SendMessageAsync($"You can't sell 0 stocks!");
            }
            else if (stocknamelowered == Stock1LoweredAcronym)
            {
                if (account.STOCK1 < amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {amount} {Stock1Name} stocks!");
                }
                else
                {
                    account.STOCK1 -= amount;
                    account.COINS += StockHolder.STOCK1 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just sold {amount} {Stock1Name} stocks for {StockHolder.STOCK1 * amount}.");
                }
            }
            else if (stocknamelowered == Stock2LoweredAcronym)
            {
                if (account.STOCK2 < amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {amount} {Stock2Name} stocks!");
                }
                else
                {
                    account.STOCK2 -= amount;
                    account.COINS += StockHolder.STOCK2 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just sold {amount} {Stock2Name} stocks for {StockHolder.STOCK2 * amount}.");
                }
            }
            else if (stocknamelowered == Stock3LoweredAcronym)
            {
                if (account.STOCK3 < amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {amount} {Stock3Name} stocks!");
                }
                else
                {
                    account.STOCK3 -= amount;
                    account.COINS += StockHolder.STOCK3 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just sold {amount} {Stock3Name} stocks for {StockHolder.STOCK3 * amount}.");
                }
            }
            else if (stocknamelowered == Stock4LoweredAcronym)
            {
                if (account.STOCK4 < amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {amount} {Stock4Name} stocks!");
                }
                else
                {
                    account.STOCK4 -= amount;
                    account.COINS += StockHolder.STOCK4 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just sold {amount} {Stock4Name} stocks for {StockHolder.STOCK4 * amount}.");
                }
            }
            else if (stocknamelowered == Stock5LoweredAcronym)
            {
                if (account.STOCK5 < amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {StockHolder.STOCK5 * amount} {Stock5Name} stocks!");
                }
                else
                {
                    account.STOCK5 -= amount;
                    account.COINS += StockHolder.STOCK5 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just sold {amount} {Stock5Name} stocks for {StockHolder.STOCK5 * amount}.");
                }
            }
            else if (stocknamelowered == Stock6LoweredAcronym)
            {
                if (account.STOCK6 < amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {StockHolder.STOCK6 * amount} {Stock6Name} stocks!");
                }
                else
                {
                    account.STOCK6 -= amount;
                    account.COINS += StockHolder.STOCK6 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just sold {amount} {Stock6Name} stocks for {StockHolder.STOCK6 * amount}.");
                }
            }
            else if (stocknamelowered == Stock7LoweredAcronym)
            {
                if (account.STOCK7 < amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {StockHolder.STOCK7 * amount} {Stock7Name} stocks!");
                }
                else
                {
                    account.STOCK7 -= amount;
                    account.COINS += StockHolder.STOCK7 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just sold {amount} {Stock7Name} stocks for {StockHolder.STOCK7 * amount}.");
                }
            }
            else if (stocknamelowered == Stock8LoweredAcronym)
            {
                if (account.STOCK8 < amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {StockHolder.STOCK8 * amount} {Stock8Name} stocks!");
                }
                else
                {
                    account.STOCK8 -= amount;
                    account.COINS += StockHolder.STOCK8 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just sold {amount} {Stock8Name} stocks for {StockHolder.STOCK8 * amount}.");
                }
            }
            else if (stocknamelowered == Stock9LoweredAcronym)
            {
                if (account.STOCK9 < amount)
                {
                    await Context.Channel.SendMessageAsync($"You don't have {StockHolder.STOCK9 * amount} {Stock9Name} stocks!");
                }
                else
                {
                    account.STOCK9 -= amount;
                    account.COINS += StockHolder.STOCK9 * amount;
                    await Context.Channel.SendMessageAsync($"{Context.User.Username} just sold {amount} {Stock9Name} stocks for {StockHolder.STOCK9 * amount}.");
                }
            }
            else
            {
                await Context.Channel.SendMessageAsync("That is not a stock!");
            }
        }
        [Command("Stocks")]
        public async Task StockCheck()
        {
            var StockHolder = UserAccounts.GetAccount(Global.Client.GetUser(439896715781210115));
            var account = UserAccounts.GetAccount(Context.User);

            var embed = new EmbedBuilder();

            embed.WithTitle("Fumplestocks™ Currently");
            embed.WithColor(0, 0, 255);
            embed.AddField($"{StockHolder.STOCK1NAME}", $"{StockHolder.STOCK1NAME} ({StockHolder.STOCK1ABBREVIATION}) is currently worth {StockHolder.STOCK1} fumplebucks and you own {account.STOCK1} {StockHolder.STOCK1NAME} stocks.");
            embed.AddField($"{StockHolder.STOCK2NAME}", $"{StockHolder.STOCK2NAME} ({StockHolder.STOCK2ABBREVIATION}) is currently worth {StockHolder.STOCK2} fumplebucks and you own {account.STOCK2} {StockHolder.STOCK2NAME} stocks.");
            embed.AddField($"{StockHolder.STOCK3NAME}", $"{StockHolder.STOCK3NAME} ({StockHolder.STOCK3ABBREVIATION}) is currently worth {StockHolder.STOCK3} fumplebucks and you own {account.STOCK3} {StockHolder.STOCK3NAME} stocks.");
            embed.AddField($"{StockHolder.STOCK4NAME}", $"{StockHolder.STOCK4NAME} ({StockHolder.STOCK4ABBREVIATION}) is currently worth {StockHolder.STOCK4} fumplebucks and you own {account.STOCK4} {StockHolder.STOCK4NAME} stocks.");
            embed.AddField($"{StockHolder.STOCK5NAME}", $"{StockHolder.STOCK5NAME} ({StockHolder.STOCK5ABBREVIATION}) is currently worth {StockHolder.STOCK5} fumplebucks and you own {account.STOCK5} {StockHolder.STOCK5NAME} stocks.");
            embed.AddField($"{StockHolder.STOCK6NAME}", $"{StockHolder.STOCK6NAME} ({StockHolder.STOCK6ABBREVIATION}) is currently worth {StockHolder.STOCK6} fumplebucks and you own {account.STOCK6} {StockHolder.STOCK6NAME} stocks.");
            embed.AddField($"{StockHolder.STOCK7NAME}", $"{StockHolder.STOCK7NAME} ({StockHolder.STOCK7ABBREVIATION}) is currently worth {StockHolder.STOCK7} fumplebucks and you own {account.STOCK7} {StockHolder.STOCK7NAME} stocks.");
            embed.AddField($"{StockHolder.STOCK8NAME}", $"{StockHolder.STOCK8NAME} ({StockHolder.STOCK8ABBREVIATION}) is currently worth {StockHolder.STOCK8} fumplebucks and you own {account.STOCK8} {StockHolder.STOCK8NAME} stocks.");
            embed.AddField($"{StockHolder.STOCK9NAME}", $"{StockHolder.STOCK9NAME} ({StockHolder.STOCK9ABBREVIATION}) is currently worth {StockHolder.STOCK9} fumplebucks and you own {account.STOCK9} {StockHolder.STOCK9NAME} stocks.");

            await Context.Channel.SendMessageAsync("", embed: embed);
        }
        [Command("Cause Stock Change")]
        [RequireUserPermission(GuildPermission.Administrator)]
        public async Task CauseStockChange()
        {
            #region StockMarketCode
            Console.WriteLine("Stock Market Change!");
            StockTextChannel = Global.Client.GetGuild(411715542467215362).GetTextChannel(489963488949567498);

            var StockHolder = UserAccounts.GetAccount(Global.Client.GetUser(439896715781210115));

            var embed = new EmbedBuilder();
            Random r = new Random();

            string Stock1Name = StockHolder.STOCK1NAME;
            string Stock2Name = StockHolder.STOCK2NAME;
            string Stock3Name = StockHolder.STOCK3NAME;
            string Stock4Name = StockHolder.STOCK4NAME;
            string Stock5Name = StockHolder.STOCK5NAME;
            string Stock6Name = StockHolder.STOCK6NAME;
            string Stock7Name = StockHolder.STOCK7NAME;
            string Stock8Name = StockHolder.STOCK8NAME;
            string Stock9Name = StockHolder.STOCK9NAME;

            string Stock1Acronym = StockHolder.STOCK1ABBREVIATION;
            string Stock2Acronym = StockHolder.STOCK2ABBREVIATION;
            string Stock3Acronym = StockHolder.STOCK3ABBREVIATION;
            string Stock4Acronym = StockHolder.STOCK4ABBREVIATION;
            string Stock5Acronym = StockHolder.STOCK5ABBREVIATION;
            string Stock6Acronym = StockHolder.STOCK6ABBREVIATION;
            string Stock7Acronym = StockHolder.STOCK7ABBREVIATION;
            string Stock8Acronym = StockHolder.STOCK8ABBREVIATION;
            string Stock9Acronym = StockHolder.STOCK9ABBREVIATION;

            int Stock1SpecialEvent = r.Next(1, 301);
            int Stock2SpecialEvent = r.Next(1, 301);
            int Stock3SpecialEvent = r.Next(1, 301);
            int Stock4SpecialEvent = r.Next(1, 301);
            int Stock5SpecialEvent = r.Next(1, 301);
            int Stock6SpecialEvent = r.Next(1, 301);
            int Stock7SpecialEvent = r.Next(1, 301);
            int Stock8SpecialEvent = r.Next(1, 301);
            int Stock9SpecialEvent = r.Next(1, 301);


            uint Stock1SpecialEvent1Change = StockHolder.STOCK1 / Convert.ToUInt32(1.5);
            uint Stock2SpecialEvent1Change = StockHolder.STOCK2 / Convert.ToUInt32(1.5);
            uint Stock3SpecialEvent1Change = StockHolder.STOCK3 / Convert.ToUInt32(1.5);
            uint Stock4SpecialEvent1Change = StockHolder.STOCK4 / Convert.ToUInt32(1.5);
            uint Stock5SpecialEvent1Change = StockHolder.STOCK5 / Convert.ToUInt32(1.5);
            uint Stock6SpecialEvent1Change = StockHolder.STOCK6 / Convert.ToUInt32(1.5);
            uint Stock7SpecialEvent1Change = StockHolder.STOCK7 / Convert.ToUInt32(1.5);
            uint Stock8SpecialEvent1Change = StockHolder.STOCK8 / Convert.ToUInt32(1.5);
            uint Stock9SpecialEvent1Change = StockHolder.STOCK9 / Convert.ToUInt32(1.5);

            uint Stock1SpecialEvent2Change = StockHolder.STOCK1 / Convert.ToUInt32(2);
            uint Stock2SpecialEvent2Change = StockHolder.STOCK2 / Convert.ToUInt32(2);
            uint Stock3SpecialEvent2Change = StockHolder.STOCK3 / Convert.ToUInt32(2);
            uint Stock4SpecialEvent2Change = StockHolder.STOCK4 / Convert.ToUInt32(2);
            uint Stock5SpecialEvent2Change = StockHolder.STOCK5 / Convert.ToUInt32(2);
            uint Stock6SpecialEvent2Change = StockHolder.STOCK6 / Convert.ToUInt32(2);
            uint Stock7SpecialEvent2Change = StockHolder.STOCK7 / Convert.ToUInt32(2);
            uint Stock8SpecialEvent2Change = StockHolder.STOCK8 / Convert.ToUInt32(2);
            uint Stock9SpecialEvent2Change = StockHolder.STOCK9 / Convert.ToUInt32(2);

            uint Stock1SpecialEvent3Change = StockHolder.STOCK1 / Convert.ToUInt32(3);
            uint Stock2SpecialEvent3Change = StockHolder.STOCK2 / Convert.ToUInt32(3);
            uint Stock3SpecialEvent3Change = StockHolder.STOCK3 / Convert.ToUInt32(3);
            uint Stock4SpecialEvent3Change = StockHolder.STOCK4 / Convert.ToUInt32(3);
            uint Stock5SpecialEvent3Change = StockHolder.STOCK5 / Convert.ToUInt32(3);
            uint Stock6SpecialEvent3Change = StockHolder.STOCK6 / Convert.ToUInt32(3);
            uint Stock7SpecialEvent3Change = StockHolder.STOCK7 / Convert.ToUInt32(3);
            uint Stock8SpecialEvent3Change = StockHolder.STOCK8 / Convert.ToUInt32(3);
            uint Stock9SpecialEvent3Change = StockHolder.STOCK9 / Convert.ToUInt32(3);


            int StockSecurity = r.Next(1, 4);

            Console.WriteLine("~First Special Stock Changes~");
            Console.WriteLine("~Event 3 Changes~");
            Console.WriteLine(Stock1SpecialEvent3Change);
            Console.WriteLine(Stock2SpecialEvent3Change);
            Console.WriteLine(Stock3SpecialEvent3Change);
            Console.WriteLine(Stock4SpecialEvent3Change);
            Console.WriteLine(Stock5SpecialEvent3Change);
            Console.WriteLine(Stock6SpecialEvent3Change);
            Console.WriteLine(Stock7SpecialEvent3Change);
            Console.WriteLine(Stock8SpecialEvent3Change);
            Console.WriteLine(Stock9SpecialEvent3Change);
            Console.WriteLine("~Event 2 Changes~");
            Console.WriteLine(Stock1SpecialEvent2Change);
            Console.WriteLine(Stock2SpecialEvent2Change);
            Console.WriteLine(Stock3SpecialEvent2Change);
            Console.WriteLine(Stock4SpecialEvent2Change);
            Console.WriteLine(Stock5SpecialEvent2Change);
            Console.WriteLine(Stock6SpecialEvent2Change);
            Console.WriteLine(Stock7SpecialEvent2Change);
            Console.WriteLine(Stock8SpecialEvent2Change);
            Console.WriteLine(Stock9SpecialEvent2Change);
            Console.WriteLine("~Event 1 Changes~");
            Console.WriteLine(Stock1SpecialEvent1Change);
            Console.WriteLine(Stock2SpecialEvent1Change);
            Console.WriteLine(Stock3SpecialEvent1Change);
            Console.WriteLine(Stock4SpecialEvent1Change);
            Console.WriteLine(Stock5SpecialEvent1Change);
            Console.WriteLine(Stock6SpecialEvent1Change);
            Console.WriteLine(Stock7SpecialEvent1Change);
            Console.WriteLine(Stock8SpecialEvent1Change);
            Console.WriteLine(Stock9SpecialEvent1Change);

            uint Stock1Change = Convert.ToUInt32(r.Next(0, 26));
            uint Stock2Change = Convert.ToUInt32(r.Next(0, 26));
            uint Stock3Change = Convert.ToUInt32(r.Next(0, 26));
            uint Stock4Change = Convert.ToUInt32(r.Next(0, 26));
            uint Stock5Change = Convert.ToUInt32(r.Next(0, 26));
            uint Stock6Change = Convert.ToUInt32(r.Next(0, 26));
            uint Stock7Change = Convert.ToUInt32(r.Next(0, 26));
            uint Stock8Change = Convert.ToUInt32(r.Next(0, 26));
            uint Stock9Change = Convert.ToUInt32(r.Next(0, 26));

            int Stock1POSORNEG = r.Next(0, 2);
            int Stock2POSORNEG = r.Next(0, 2);
            int Stock3POSORNEG = r.Next(0, 2);
            int Stock4POSORNEG = r.Next(0, 2);
            int Stock5POSORNEG = r.Next(0, 2);
            int Stock6POSORNEG = r.Next(0, 2);
            int Stock7POSORNEG = r.Next(0, 2);
            int Stock8POSORNEG = r.Next(0, 2);
            int Stock9POSORNEG = r.Next(0, 2);

            uint Stock1ChangePos = 0;
            uint Stock2ChangePos = 0;
            uint Stock3ChangePos = 0;
            uint Stock4ChangePos = 0;
            uint Stock5ChangePos = 0;
            uint Stock6ChangePos = 0;
            uint Stock7ChangePos = 0;
            uint Stock8ChangePos = 0;
            uint Stock9ChangePos = 0;

            uint Stock1ChangeNeg = 0;
            uint Stock2ChangeNeg = 0;
            uint Stock3ChangeNeg = 0;
            uint Stock4ChangeNeg = 0;
            uint Stock5ChangeNeg = 0;
            uint Stock6ChangeNeg = 0;
            uint Stock7ChangeNeg = 0;
            uint Stock8ChangeNeg = 0;
            uint Stock9ChangeNeg = 0;

            bool Stock1Gone = false;
            bool Stock2Gone = false;
            bool Stock3Gone = false;
            bool Stock4Gone = false;
            bool Stock5Gone = false;
            bool Stock6Gone = false;
            bool Stock7Gone = false;
            bool Stock8Gone = false;
            bool Stock9Gone = false;

            embed.WithFooter("If you want to participate in the stock market use $invest [AbbreviatedNameOfStock] [Amount] to buy a stock and $sell [AbbreviatedNameOfStock] [Amount] to sell a stock.", "https://cdn.discordapp.com/attachments/483302550666346498/492014432692731922/question_mark_good.png");
            embed.WithCurrentTimestamp();

            Console.WriteLine($"{Stock1POSORNEG}");
            Console.WriteLine($"{Stock2POSORNEG}");
            Console.WriteLine($"{Stock3POSORNEG}");
            Console.WriteLine($"{Stock4POSORNEG}");
            Console.WriteLine($"{Stock5POSORNEG}");
            Console.WriteLine($"{Stock6POSORNEG}");
            Console.WriteLine($"{Stock7POSORNEG}");
            Console.WriteLine($"{Stock8POSORNEG}");
            Console.WriteLine($"{Stock9POSORNEG}");

            var accounts = UserAccounts.GetAllAccounts();

            if (StockHolder.STOCK1 <= 0 || StockHolder.STOCK1 >= 1000)
            {
                Stock1Change = 0;
                Stock1Gone = true;
                Stock1SpecialEvent = 300;
            }
            if (StockHolder.STOCK2 <= 0 || StockHolder.STOCK2 >= 1000)
            {
                Stock2Change = 0;
                Stock2Gone = true;
                Stock2SpecialEvent = 300;
            }
            if (StockHolder.STOCK3 <= 0 || StockHolder.STOCK3 >= 1000)
            {
                Stock3Change = 0;
                Stock3Gone = true;
                Stock3SpecialEvent = 300;
            }
            if (StockHolder.STOCK4 <= 0 || StockHolder.STOCK4 >= 1000)
            {
                Stock4Change = 0;
                Stock4Gone = true;
                Stock4SpecialEvent = 300;
            }
            if (StockHolder.STOCK5 <= 0 || StockHolder.STOCK5 >= 1000)
            {
                Stock5Change = 0;
                Stock5Gone = true;
                Stock5SpecialEvent = 300;
            }
            if (StockHolder.STOCK6 <= 0 || StockHolder.STOCK6 >= 1000)
            {
                Stock6Change = 0;
                Stock6Gone = true;
                Stock6SpecialEvent = 300;
            }
            if (StockHolder.STOCK7 <= 0 || StockHolder.STOCK7 >= 1000)
            {
                Stock7Change = 0;
                Stock7Gone = true;
                Stock7SpecialEvent = 300;
            }
            if (StockHolder.STOCK8 <= 0 || StockHolder.STOCK8 >= 1000)
            {
                Stock8Change = 0;
                Stock8Gone = true;
                Stock8SpecialEvent = 300;
            }
            if (StockHolder.STOCK9 <= 0 || StockHolder.STOCK9 >= 1000)
            {
                Stock9Change = 0;
                Stock9Gone = true;
                Stock9SpecialEvent = 300;
            }
            if (Stock1POSORNEG == 0)
            {
                Stock1ChangePos = Stock1Change;
            }
            else
            {
                Stock1ChangeNeg = Stock1Change;
            }
            if (Stock2POSORNEG == 0)
            {
                Stock2ChangePos = Stock2Change;
            }
            else
            {
                Stock2ChangeNeg = Stock2Change;
            }
            if (Stock3POSORNEG == 0)
            {
                Stock3ChangePos = Stock3Change;
            }
            else
            {
                Stock3ChangeNeg = Stock3Change;
            }
            if (Stock4POSORNEG == 0)
            {
                Stock4ChangePos = Stock4Change;
            }
            else
            {
                Stock4ChangeNeg = Stock4Change;
            }
            if (Stock5POSORNEG == 0)
            {
                Stock5ChangePos = Stock5Change;
            }
            else
            {
                Stock5ChangeNeg = Stock5Change;
            }
            if (Stock6POSORNEG == 0)
            {
                Stock6ChangePos = Stock6Change;
            }
            else
            {
                Stock6ChangeNeg = Stock6Change;
            }
            if (Stock7POSORNEG == 0)
            {
                Stock7ChangePos = Stock7Change;
            }
            else
            {
                Stock7ChangeNeg = Stock7Change;
            }
            if (Stock8POSORNEG == 0)
            {
                Stock8ChangePos = Stock8Change;
            }
            else
            {
                Stock8ChangeNeg = Stock8Change;
            }
            if (Stock9POSORNEG == 0)
            {
                Stock9ChangePos = Stock9Change;
            }
            else
            {
                Stock9ChangeNeg = Stock9Change;
            }

            if (Stock1Gone = true && Stock2Gone == true && Stock3Gone == true && Stock4Gone == true && Stock5Gone == true && Stock6Gone == true && Stock7Gone == true && Stock8Gone == true && Stock9Gone == true)
            {
                embed.WithTitle($"John should fix Fumplestocks™");
                embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/483302550666346498/492027769396396032/RainFumpledump.png");
                embed.WithColor(0, 255, 0);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg");
            }
            else if (Stock1SpecialEvent <= 7 && Stock2SpecialEvent <= 7 && Stock3SpecialEvent <= 7 && Stock4SpecialEvent <= 7 && Stock5SpecialEvent <= 7 && Stock6SpecialEvent <= 7 && Stock7SpecialEvent <= 7 && Stock8SpecialEvent <= 7 && Stock9SpecialEvent <= 7)
            {
                embed.WithTitle($"BREAKING NEWS FOR FUMPLESTOCKS™");
                embed.WithColor(127, 0, 255);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491438753273872384/Breaking_News_Fumplestocks.jpg");
            }
            else if (Stock1SpecialEvent <= 7 || Stock2SpecialEvent <= 7 || Stock3SpecialEvent <= 7 || Stock4SpecialEvent <= 7 || Stock5SpecialEvent <= 7 || Stock6SpecialEvent <= 7 || Stock7SpecialEvent <= 7 || Stock8SpecialEvent <= 7 || Stock9SpecialEvent <= 7)
            {
                embed.WithTitle($"BREAKING NEWS FOR FUMPLESTOCKS™!");
                embed.WithColor(255, 255, 0);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491438753273872384/Breaking_News_Fumplestocks.jpg");
            }
            else if (Stock1ChangeNeg + Stock2ChangeNeg + Stock3ChangeNeg + Stock4ChangeNeg + Stock5ChangeNeg + Stock6ChangeNeg + Stock7ChangeNeg + Stock8ChangeNeg + Stock9ChangeNeg + Stock1ChangePos + Stock2ChangePos + Stock3ChangePos + Stock4ChangePos + Stock5ChangePos + Stock6ChangePos + Stock7ChangePos + Stock8ChangePos + Stock9ChangePos == 0)
            {
                embed.WithTitle($"Boring day for Fumplestocks™");
                embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/483302550666346498/492027769396396032/RainFumpledump.png");
                embed.WithColor(0, 255, 0);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg");
            }
            else if (Stock1ChangeNeg + Stock2ChangeNeg + Stock3ChangeNeg + Stock4ChangeNeg + Stock5ChangeNeg + Stock6ChangeNeg + Stock7ChangeNeg + Stock8ChangeNeg + Stock9ChangeNeg == 0)
            {
                embed.WithTitle($"Great day for Fumplestocks™");
                embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/483302550666346498/492027770256228362/SunFumple.png");
                embed.WithColor(0, 255, 154);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg");
            }
            else if (Stock1ChangePos + Stock2ChangePos + Stock3ChangePos + Stock4ChangePos + Stock5ChangePos + Stock6ChangePos + Stock7ChangePos + Stock8ChangePos + Stock9ChangePos == 0)
            {
                embed.WithTitle($"Horrible day for Fumplestocks™");
                embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/483302550666346498/492027771657125899/ThunderFumpledump.png");
                embed.WithColor(178, 34, 34);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg");
            }
            else if (Stock1ChangePos + Stock2ChangePos + Stock3ChangePos + Stock4ChangePos + Stock5ChangePos + Stock6ChangePos + Stock7ChangePos + Stock8ChangePos + Stock9ChangePos > Stock1ChangeNeg + Stock2ChangeNeg + Stock3ChangeNeg + Stock4ChangeNeg + Stock5ChangeNeg + Stock6ChangeNeg + Stock7ChangeNeg + Stock8ChangeNeg + Stock9ChangeNeg)
            {
                embed.WithTitle($"Good day for Fumplestocks™");
                embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/483302550666346498/492027767932715028/PartlyCloudyFumple.png");
                embed.WithColor(0, 255, 0);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg");
            }
            else if (Stock1ChangePos + Stock2ChangePos + Stock3ChangePos + Stock4ChangePos + Stock5ChangePos + Stock6ChangePos + Stock7ChangePos + Stock8ChangePos + Stock9ChangePos < Stock1ChangeNeg + Stock2ChangeNeg + Stock3ChangeNeg + Stock4ChangeNeg + Stock5ChangeNeg + Stock6ChangeNeg + Stock7ChangeNeg + Stock8ChangeNeg + Stock9ChangeNeg)
            {
                embed.WithTitle($"Rough day for Fumplestocks™");
                embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/483302550666346498/492027769396396032/RainFumpledump.png");
                embed.WithColor(255, 0, 0);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg");
            }
            else
            {
                embed.WithTitle($"Fumplestocks™");
                embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/483302550666346498/492027769396396032/RainFumpledump.png");
                embed.WithColor(0, 255, 0);
                embed.WithImageUrl("https://cdn.discordapp.com/attachments/422079130260209680/491293317448073229/Fumplestocks.jpg");
            }

            #region Stock1

            if (StockHolder.STOCK1 == 0)
            {
                embed.AddField($"{Stock1Name}", $"💀 {Stock1Acronym} 💀 {StockHolder.STOCK1} ---");
            }
            else if (StockHolder.STOCK1 >= 1000)
            {
                embed.AddField($"{Stock1Name}", $"👑 {Stock1Acronym} 👑 {StockHolder.STOCK1} ---");
            }
            else if (Stock1SpecialEvent == 1)
            {
                if (Stock1POSORNEG == 0)
                {
                    StockHolder.STOCK1 += Stock1SpecialEvent1Change;
                    embed.AddField($"{Stock1Name}", $"🔺 {Stock1Acronym} --- {StockHolder.STOCK1} +{Stock1SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock1Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK1 < Stock1SpecialEvent1Change)
                    {
                        StockHolder.STOCK1 = 0;
                        embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} 🔻 {StockHolder.STOCK1} -{Stock1SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock1Name} JUST CRASHED!!!");
                        ResetStock(1);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock1Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK1 -= Stock1SpecialEvent1Change;
                        embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} 🔻 {StockHolder.STOCK1} -{Stock1SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock1Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock1SpecialEvent <= 3)
            {
                if (Stock1POSORNEG == 0)
                {
                    StockHolder.STOCK1 += Stock1SpecialEvent2Change;
                    embed.AddField($"{Stock1Name}", $"🔺 {Stock1Acronym} --- {StockHolder.STOCK1} +{Stock1SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock1Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK1 < Stock1SpecialEvent2Change)
                    {
                        StockHolder.STOCK1 = 0;
                        embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} 🔻 {StockHolder.STOCK1} -{Stock1SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock1Name} just went into a Depression!!");
                        ResetStock(1);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock1Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK1 -= Stock1SpecialEvent2Change;
                        embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} 🔻 {StockHolder.STOCK1} -{Stock1SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock1Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock1SpecialEvent <= 7)
            {
                if (Stock1POSORNEG == 0)
                {
                    StockHolder.STOCK1 += Stock1SpecialEvent3Change;
                    embed.AddField($"{Stock1Name}", $"🔺 {Stock1Acronym} --- {StockHolder.STOCK1} +{Stock1SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock1Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK1 < Stock1SpecialEvent3Change)
                    {
                        StockHolder.STOCK1 = 0;
                        embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} 🔻 {StockHolder.STOCK1} -{Stock1SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock1Name} just Recessed!");
                        ResetStock(1);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock1Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK1 -= Stock1SpecialEvent3Change;
                        embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} 🔻 {StockHolder.STOCK1} -{Stock1SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock1Name} just Recessed!");
                    }
                }
            }
            else if (Stock1Change == 0)
            {
                embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} --- {StockHolder.STOCK1} ---");
            }
            else
            {
                if (Stock1POSORNEG == 0)
                {
                    StockHolder.STOCK1 += Stock1Change;
                    embed.AddField($"{Stock1Name}", $"🔺 {Stock1Acronym} --- {StockHolder.STOCK1} +{Stock1Change}");
                }
                else
                {
                    if (StockHolder.STOCK1 < Stock1Change)
                    {
                        StockHolder.STOCK1 = 0;
                        embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} 🔻 {StockHolder.STOCK1} -{Stock1Change}");
                        ResetStock(1);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock1Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK1 -= Stock1Change;
                        embed.AddField($"{Stock1Name}", $"--- {Stock1Acronym} 🔻 {StockHolder.STOCK1} -{Stock1Change}");
                    }
                }
            }
            #endregion

            #region Stock2
            if (StockHolder.STOCK2 == 0)
            {
                embed.AddField($"{Stock2Name}", $"💀 {Stock2Acronym} 💀 {StockHolder.STOCK2} ---");
            }
            else if (StockHolder.STOCK2 >= 1000)
            {
                embed.AddField($"{Stock2Name}", $"👑 {Stock2Acronym} 👑 {StockHolder.STOCK2} ---");
            }
            else if (Stock2SpecialEvent == 1)
            {
                if (Stock2POSORNEG == 0)
                {
                    StockHolder.STOCK2 += Stock2SpecialEvent1Change;
                    embed.AddField($"{Stock2Name}", $"🔺 {Stock2Acronym} --- {StockHolder.STOCK2} +{Stock2SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock2Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK2 < Stock2SpecialEvent1Change)
                    {
                        StockHolder.STOCK2 = 0;
                        embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} 🔻 {StockHolder.STOCK2} -{Stock2SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock2Name} JUST CRASHED!!!");
                        ResetStock(2);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock2Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK2 -= Stock2SpecialEvent1Change;
                        embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} 🔻 {StockHolder.STOCK2} -{Stock2SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock2Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock2SpecialEvent <= 3)
            {
                if (Stock2POSORNEG == 0)
                {
                    StockHolder.STOCK2 += Stock2SpecialEvent2Change;
                    embed.AddField($"{Stock2Name}", $"🔺 {Stock2Acronym} --- {StockHolder.STOCK2} +{Stock2SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock2Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK2 < Stock2SpecialEvent2Change)
                    {
                        StockHolder.STOCK2 = 0;
                        embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} 🔻 {StockHolder.STOCK2} -{Stock2SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock2Name} just went into a Depression!!");
                        ResetStock(2);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock2Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK2 -= Stock2SpecialEvent2Change;
                        embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} 🔻 {StockHolder.STOCK2} -{Stock2SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock2Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock2SpecialEvent <= 7)
            {
                if (Stock2POSORNEG == 0)
                {
                    StockHolder.STOCK2 += Stock2SpecialEvent3Change;
                    embed.AddField($"{Stock2Name}", $"🔺 {Stock2Acronym} --- {StockHolder.STOCK2} +{Stock2SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock2Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK2 < Stock1SpecialEvent3Change)
                    {
                        StockHolder.STOCK2 = 0;
                        embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} 🔻 {StockHolder.STOCK2} -{Stock2SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock2Name} just Recessed!");
                        ResetStock(2);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock2Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK2 -= Stock2SpecialEvent3Change;
                        embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} 🔻 {StockHolder.STOCK2} -{Stock2SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock2Name} just Recessed!");
                    }
                }
            }
            else if (Stock2Change == 0)
            {
                embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} --- {StockHolder.STOCK2} ---");
            }
            else
            {
                if (Stock2POSORNEG == 0)
                {
                    StockHolder.STOCK2 += Stock2Change;
                    embed.AddField($"{Stock2Name}", $"🔺 {Stock2Acronym} --- {StockHolder.STOCK2} +{Stock2Change}");
                }
                else
                {
                    if (StockHolder.STOCK2 < Stock2Change)
                    {
                        StockHolder.STOCK2 = 0;
                        embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} 🔻 {StockHolder.STOCK2} -{Stock2Change}");
                        ResetStock(2);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock2Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK2 -= Stock2Change;
                        embed.AddField($"{Stock2Name}", $"--- {Stock2Acronym} 🔻 {StockHolder.STOCK2} -{Stock2Change}");
                    }
                }
            }
            #endregion

            #region Stock3
            if (StockHolder.STOCK3 == 0)
            {
                embed.AddField($"{Stock3Name}", $"💀 {Stock3Acronym} 💀 {StockHolder.STOCK3} ---");
            }
            else if (StockHolder.STOCK3 >= 1000)
            {
                embed.AddField($"{Stock3Name}", $"👑 {Stock3Acronym} 👑 {StockHolder.STOCK3} ---");
            }
            else if (Stock3SpecialEvent == 1)
            {
                if (Stock3POSORNEG == 0)
                {
                    StockHolder.STOCK3 += Stock3SpecialEvent1Change;
                    embed.AddField($"{Stock3Name}", $"🔺 {Stock3Acronym} --- {StockHolder.STOCK3} +{Stock3SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock3Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK3 < Stock3SpecialEvent1Change)
                    {
                        StockHolder.STOCK3 = 0;
                        embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} 🔻 {StockHolder.STOCK3} -{Stock3SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock3Name} JUST CRASHED!!!");
                        ResetStock(3);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock3Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK3 -= Stock3SpecialEvent1Change;
                        embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} 🔻 {StockHolder.STOCK3} -{Stock2SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock3Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock3SpecialEvent <= 3)
            {
                if (Stock3POSORNEG == 0)
                {
                    StockHolder.STOCK3 += Stock3SpecialEvent2Change;
                    embed.AddField($"{Stock3Name}", $"🔺 {Stock3Acronym} --- {StockHolder.STOCK3} +{Stock3SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock3Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK3 < Stock3SpecialEvent2Change)
                    {
                        StockHolder.STOCK3 = 0;
                        embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} 🔻 {StockHolder.STOCK3} -{Stock3SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock3Name} just went into a Depression!!");
                        ResetStock(3);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock3Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK3 -= Stock3SpecialEvent2Change;
                        embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} 🔻 {StockHolder.STOCK3} -{Stock3SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock3Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock3SpecialEvent <= 7)
            {
                if (Stock3POSORNEG == 0)
                {
                    StockHolder.STOCK3 += Stock3SpecialEvent3Change;
                    embed.AddField($"{Stock3Name}", $"🔺 {Stock3Acronym} --- {StockHolder.STOCK3} +{Stock3SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock3Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK3 < Stock1SpecialEvent3Change)
                    {
                        StockHolder.STOCK3 = 0;
                        embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} 🔻 {StockHolder.STOCK3} -{Stock3SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock3Name} just Recessed!");
                        ResetStock(3);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock3Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK3 -= Stock3SpecialEvent3Change;
                        embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} 🔻 {StockHolder.STOCK3} -{Stock3SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock3Name} just Recessed!");
                    }
                }
            }
            else if (Stock3Change == 0)
            {
                embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} --- {StockHolder.STOCK3} ---");
            }
            else
            {
                if (Stock3POSORNEG == 0)
                {
                    StockHolder.STOCK3 += Stock3Change;
                    embed.AddField($"{Stock3Name}", $"🔺 {Stock3Acronym} --- {StockHolder.STOCK3} +{Stock3Change}");
                }
                else
                {
                    if (StockHolder.STOCK3 < Stock3Change)
                    {
                        StockHolder.STOCK3 = 0;
                        embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} 🔻 {StockHolder.STOCK3} -{Stock3Change}");
                        ResetStock(3);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock3Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK3 -= Stock3Change;
                        embed.AddField($"{Stock3Name}", $"--- {Stock3Acronym} 🔻 {StockHolder.STOCK3} -{Stock3Change}");
                    }
                }
            }
            #endregion

            #region Stock4

            if (StockHolder.STOCK4 == 0)
            {
                embed.AddField($"{Stock4Name}", $"💀 {Stock4Acronym} 💀 {StockHolder.STOCK4} ---");
            }
            else if (StockHolder.STOCK4 >= 1000)
            {
                embed.AddField($"{Stock4Name}", $"👑 {Stock4Acronym} 👑 {StockHolder.STOCK4} ---");
            }
            else if (Stock4SpecialEvent == 1)
            {
                if (Stock4POSORNEG == 0)
                {
                    StockHolder.STOCK4 += Stock4SpecialEvent1Change;
                    embed.AddField($"{Stock4Name}", $"🔺 {Stock4Acronym} --- {StockHolder.STOCK4} +{Stock4SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock4Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK4 < Stock4SpecialEvent1Change)
                    {
                        StockHolder.STOCK4 = 0;
                        embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} 🔻 {StockHolder.STOCK4} -{Stock4SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock4Name} JUST CRASHED!!!");
                        ResetStock(4);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock4Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK4 -= Stock4SpecialEvent1Change;
                        embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} 🔻 {StockHolder.STOCK4} -{Stock4SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock4Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock4SpecialEvent <= 3)
            {
                if (Stock4POSORNEG == 0)
                {
                    StockHolder.STOCK4 += Stock4SpecialEvent2Change;
                    embed.AddField($"{Stock4Name}", $"🔺 {Stock4Acronym} --- {StockHolder.STOCK4} +{Stock4SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock4Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK4 < Stock4SpecialEvent2Change)
                    {
                        StockHolder.STOCK4 = 0;
                        embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} 🔻 {StockHolder.STOCK4} -{Stock4SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock4Name} just went into a Depression!!");
                        ResetStock(4);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock4Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK4 -= Stock4SpecialEvent2Change;
                        embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} 🔻 {StockHolder.STOCK4} -{Stock4SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock4Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock4SpecialEvent <= 7)
            {
                if (Stock4POSORNEG == 0)
                {
                    StockHolder.STOCK4 += Stock4SpecialEvent3Change;
                    embed.AddField($"{Stock4Name}", $"🔺 {Stock4Acronym} --- {StockHolder.STOCK4} +{Stock4SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock4Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK4 < Stock4SpecialEvent3Change)
                    {
                        StockHolder.STOCK4 = 0;
                        embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} 🔻 {StockHolder.STOCK4} -{Stock4SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock4Name} just Recessed!");
                        ResetStock(4);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock4Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK4 -= Stock4SpecialEvent3Change;
                        embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} 🔻 {StockHolder.STOCK4} -{Stock4SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock4Name} just Recessed!");
                    }
                }
            }
            else if (Stock4Change == 0)
            {
                embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} --- {StockHolder.STOCK4} ---");
            }
            else
            {
                if (Stock4POSORNEG == 0)
                {
                    StockHolder.STOCK4 += Stock4Change;
                    embed.AddField($"{Stock4Name}", $"🔺 {Stock4Acronym} --- {StockHolder.STOCK4} +{Stock4Change}");
                }
                else
                {
                    if (StockHolder.STOCK4 < Stock4Change)
                    {
                        StockHolder.STOCK4 = 0;
                        embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} 🔻 {StockHolder.STOCK4} -{Stock4Change}");
                        ResetStock(4);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock4Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK4 -= Stock4Change;
                        embed.AddField($"{Stock4Name}", $"--- {Stock4Acronym} 🔻 {StockHolder.STOCK4} -{Stock4Change}");
                    }
                }
            }
            #endregion

            #region Stock5

            if (StockHolder.STOCK5 == 0)
            {
                embed.AddField($"{Stock5Name}", $"💀 {Stock5Acronym} 💀 {StockHolder.STOCK5} ---");
            }
            else if (StockHolder.STOCK5 >= 1000)
            {
                embed.AddField($"{Stock5Name}", $"👑 {Stock5Acronym} 👑 {StockHolder.STOCK5} ---");
            }
            else if (Stock5SpecialEvent == 1)
            {
                if (Stock5POSORNEG == 0)
                {
                    StockHolder.STOCK5 += Stock5SpecialEvent1Change;
                    embed.AddField($"{Stock5Name}", $"🔺 {Stock5Acronym} --- {StockHolder.STOCK5} +{Stock5SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock5Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK5 < Stock5SpecialEvent1Change)
                    {
                        StockHolder.STOCK5 = 0;
                        embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} 🔻 {StockHolder.STOCK5} -{Stock5SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock5Name} JUST CRASHED!!!");
                        ResetStock(5);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock5Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK5 -= Stock5SpecialEvent1Change;
                        embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} 🔻 {StockHolder.STOCK5} -{Stock5SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock5Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock5SpecialEvent <= 3)
            {
                if (Stock5POSORNEG == 0)
                {
                    StockHolder.STOCK5 += Stock5SpecialEvent2Change;
                    embed.AddField($"{Stock5Name}", $"🔺 {Stock5Acronym} --- {StockHolder.STOCK5} +{Stock5SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock5Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK5 < Stock5SpecialEvent2Change)
                    {
                        StockHolder.STOCK5 = 0;
                        embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} 🔻 {StockHolder.STOCK5} -{Stock5SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock5Name} just went into a Depression!!");
                        ResetStock(5);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock5Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK5 -= Stock5SpecialEvent2Change;
                        embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} 🔻 {StockHolder.STOCK5} -{Stock5SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock5Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock5SpecialEvent <= 7)
            {
                if (Stock5POSORNEG == 0)
                {
                    StockHolder.STOCK5 += Stock5SpecialEvent3Change;
                    embed.AddField($"{Stock5Name}", $"🔺 {Stock5Acronym} --- {StockHolder.STOCK5} +{Stock5SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock5Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK5 < Stock5SpecialEvent3Change)
                    {
                        StockHolder.STOCK5 = 0;
                        embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} 🔻 {StockHolder.STOCK5} -{Stock5SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock5Name} just Recessed!");
                        ResetStock(5);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock5Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK5 -= Stock5SpecialEvent3Change;
                        embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} 🔻 {StockHolder.STOCK5} -{Stock5SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock5Name} just Recessed!");
                    }
                }
            }
            else if (Stock5Change == 0)
            {
                embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} --- {StockHolder.STOCK5} ---");
            }
            else
            {
                if (Stock5POSORNEG == 0)
                {
                    StockHolder.STOCK5 += Stock5Change;
                    embed.AddField($"{Stock5Name}", $"🔺 {Stock5Acronym} --- {StockHolder.STOCK5} +{Stock5Change}");
                }
                else
                {
                    if (StockHolder.STOCK5 < Stock5Change)
                    {
                        StockHolder.STOCK5 = 0;
                        embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} 🔻 {StockHolder.STOCK5} -{Stock5Change}");
                        ResetStock(5);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock5Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK5 -= Stock5Change;
                        embed.AddField($"{Stock5Name}", $"--- {Stock5Acronym} 🔻 {StockHolder.STOCK5} -{Stock5Change}");
                    }
                }
            }
            #endregion

            #region Stock6

            if (StockHolder.STOCK6 == 0)
            {
                embed.AddField($"{Stock6Name}", $"💀 {Stock6Acronym} 💀 {StockHolder.STOCK6} ---");
            }
            else if (StockHolder.STOCK6 >= 1000)
            {
                embed.AddField($"{Stock6Name}", $"👑 {Stock6Acronym} 👑 {StockHolder.STOCK6} ---");
            }
            else if (Stock6SpecialEvent == 1)
            {
                if (Stock6POSORNEG == 0)
                {
                    StockHolder.STOCK6 += Stock6SpecialEvent1Change;
                    embed.AddField($"{Stock6Name}", $"🔺 {Stock6Acronym} --- {StockHolder.STOCK6} +{Stock6SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock6Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK6 < Stock6SpecialEvent1Change)
                    {
                        StockHolder.STOCK6 = 0;
                        embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} 🔻 {StockHolder.STOCK6} -{Stock6SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock6Name} JUST CRASHED!!!");
                        ResetStock(6);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock6Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK6 -= Stock6SpecialEvent1Change;
                        embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} 🔻 {StockHolder.STOCK6} -{Stock6SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock6Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock6SpecialEvent <= 3)
            {
                if (Stock6POSORNEG == 0)
                {
                    StockHolder.STOCK6 += Stock6SpecialEvent2Change;
                    embed.AddField($"{Stock6Name}", $"🔺 {Stock6Acronym} --- {StockHolder.STOCK6} +{Stock6SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock6Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK6 < Stock6SpecialEvent2Change)
                    {
                        StockHolder.STOCK6 = 0;
                        embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} 🔻 {StockHolder.STOCK6} -{Stock6SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock6Name} just went into a Depression!!");
                        ResetStock(6);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock6Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK6 -= Stock6SpecialEvent2Change;
                        embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} 🔻 {StockHolder.STOCK6} -{Stock6SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock6Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock6SpecialEvent <= 7)
            {
                if (Stock6POSORNEG == 0)
                {
                    StockHolder.STOCK6 += Stock6SpecialEvent3Change;
                    embed.AddField($"{Stock6Name}", $"🔺 {Stock6Acronym} --- {StockHolder.STOCK6} +{Stock6SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock6Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK6 < Stock6SpecialEvent3Change)
                    {
                        StockHolder.STOCK6 = 0;
                        embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} 🔻 {StockHolder.STOCK6} -{Stock6SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock6Name} just Recessed!");
                        ResetStock(6);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock6Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK6 -= Stock6SpecialEvent3Change;
                        embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} 🔻 {StockHolder.STOCK6} -{Stock6SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock6Name} just Recessed!");
                    }
                }
            }
            else if (Stock6Change == 0)
            {
                embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} --- {StockHolder.STOCK6} ---");
            }
            else
            {
                if (Stock6POSORNEG == 0)
                {
                    StockHolder.STOCK6 += Stock6Change;
                    embed.AddField($"{Stock6Name}", $"🔺 {Stock6Acronym} --- {StockHolder.STOCK6} +{Stock6Change}");
                }
                else
                {
                    if (StockHolder.STOCK6 < Stock6Change)
                    {
                        StockHolder.STOCK6 = 0;
                        embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} 🔻 {StockHolder.STOCK6} -{Stock6Change}");
                        ResetStock(6);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock6Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK6 -= Stock6Change;
                        embed.AddField($"{Stock6Name}", $"--- {Stock6Acronym} 🔻 {StockHolder.STOCK6} -{Stock6Change}");
                    }
                }
            }
            #endregion

            #region Stock7

            if (StockHolder.STOCK7 == 0)
            {
                embed.AddField($"{Stock7Name}", $"💀 {Stock7Acronym} 💀 {StockHolder.STOCK7} ---");
            }
            else if (StockHolder.STOCK7 >= 1000)
            {
                embed.AddField($"{Stock7Name}", $"👑 {Stock7Acronym} 👑 {StockHolder.STOCK7} ---");
            }
            else if (Stock7SpecialEvent == 1)
            {
                if (Stock7POSORNEG == 0)
                {
                    StockHolder.STOCK7 += Stock7SpecialEvent1Change;
                    embed.AddField($"{Stock7Name}", $"🔺 {Stock7Acronym} --- {StockHolder.STOCK7} +{Stock7SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock7Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK7 < Stock7SpecialEvent1Change)
                    {
                        StockHolder.STOCK7 = 0;
                        embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} 🔻 {StockHolder.STOCK7} -{Stock7SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock7Name} JUST CRASHED!!!");
                        ResetStock(7);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock7Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK7 -= Stock7SpecialEvent1Change;
                        embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} 🔻 {StockHolder.STOCK7} -{Stock7SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock7Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock7SpecialEvent <= 3)
            {
                if (Stock7POSORNEG == 0)
                {
                    StockHolder.STOCK7 += Stock7SpecialEvent2Change;
                    embed.AddField($"{Stock7Name}", $"🔺 {Stock7Acronym} --- {StockHolder.STOCK7} +{Stock7SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock7Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK7 < Stock7SpecialEvent2Change)
                    {
                        StockHolder.STOCK7 = 0;
                        embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} 🔻 {StockHolder.STOCK7} -{Stock7SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock7Name} just went into a Depression!!");
                        ResetStock(7);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock7Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK7 -= Stock7SpecialEvent2Change;
                        embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} 🔻 {StockHolder.STOCK7} -{Stock7SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock7Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock7SpecialEvent <= 7)
            {
                if (Stock7POSORNEG == 0)
                {
                    StockHolder.STOCK7 += Stock7SpecialEvent3Change;
                    embed.AddField($"{Stock7Name}", $"🔺 {Stock7Acronym} --- {StockHolder.STOCK7} +{Stock7SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock7Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK7 < Stock7SpecialEvent3Change)
                    {
                        StockHolder.STOCK7 = 0;
                        embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} 🔻 {StockHolder.STOCK7} -{Stock7SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock7Name} just Recessed!");
                        ResetStock(7);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock7Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK7 -= Stock7SpecialEvent3Change;
                        embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} 🔻 {StockHolder.STOCK7} -{Stock7SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock7Name} just Recessed!");
                    }
                }
            }
            else if (Stock7Change == 0)
            {
                embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} --- {StockHolder.STOCK7} ---");
            }
            else
            {
                if (Stock7POSORNEG == 0)
                {
                    StockHolder.STOCK7 += Stock7Change;
                    embed.AddField($"{Stock7Name}", $"🔺 {Stock7Acronym} --- {StockHolder.STOCK7} +{Stock7Change}");
                }
                else
                {
                    if (StockHolder.STOCK7 < Stock7Change)
                    {
                        StockHolder.STOCK7 = 0;
                        embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} 🔻 {StockHolder.STOCK7} -{Stock7Change}");
                        ResetStock(7);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock7Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK7 -= Stock7Change;
                        embed.AddField($"{Stock7Name}", $"--- {Stock7Acronym} 🔻 {StockHolder.STOCK7} -{Stock7Change}");
                    }
                }
            }
            #endregion

            #region Stock8

            if (StockHolder.STOCK8 == 0)
            {
                embed.AddField($"{Stock8Name}", $"💀 {Stock8Acronym} 💀 {StockHolder.STOCK8} ---");
            }
            else if (StockHolder.STOCK8 >= 1000)
            {
                embed.AddField($"{Stock8Name}", $"👑 {Stock8Acronym} 👑 {StockHolder.STOCK8} ---");
            }
            else if (Stock8SpecialEvent == 1)
            {
                if (Stock8POSORNEG == 0)
                {
                    StockHolder.STOCK8 += Stock8SpecialEvent1Change;
                    embed.AddField($"{Stock8Name}", $"🔺 {Stock8Acronym} --- {StockHolder.STOCK8} +{Stock8SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock8Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK8 < Stock8SpecialEvent1Change)
                    {
                        StockHolder.STOCK8 = 0;
                        embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} 🔻 {StockHolder.STOCK8} -{Stock8SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock8Name} JUST CRASHED!!!");
                        ResetStock(8);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock8Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK8 -= Stock8SpecialEvent1Change;
                        embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} 🔻 {StockHolder.STOCK8} -{Stock8SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock8Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock8SpecialEvent <= 3)
            {
                if (Stock8POSORNEG == 0)
                {
                    StockHolder.STOCK8 += Stock8SpecialEvent2Change;
                    embed.AddField($"{Stock8Name}", $"🔺 {Stock8Acronym} --- {StockHolder.STOCK8} +{Stock8SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock8Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK8 < Stock8SpecialEvent2Change)
                    {
                        StockHolder.STOCK8 = 0;
                        embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} 🔻 {StockHolder.STOCK8} -{Stock8SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock8Name} just went into a Depression!!");
                        ResetStock(8);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock8Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK8 -= Stock8SpecialEvent2Change;
                        embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} 🔻 {StockHolder.STOCK8} -{Stock8SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock8Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock8SpecialEvent <= 7)
            {
                if (Stock8POSORNEG == 0)
                {
                    StockHolder.STOCK8 += Stock8SpecialEvent3Change;
                    embed.AddField($"{Stock8Name}", $"🔺 {Stock8Acronym} --- {StockHolder.STOCK8} +{Stock8SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock8Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK8 < Stock8SpecialEvent3Change)
                    {
                        StockHolder.STOCK8 = 0;
                        embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} 🔻 {StockHolder.STOCK8} -{Stock8SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock8Name} just Recessed!");
                        ResetStock(8);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock8Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK8 -= Stock8SpecialEvent3Change;
                        embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} 🔻 {StockHolder.STOCK8} -{Stock8SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock8Name} just Recessed!");
                    }
                }
            }
            else if (Stock8Change == 0)
            {
                embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} --- {StockHolder.STOCK8} ---");
            }
            else
            {
                if (Stock8POSORNEG == 0)
                {
                    StockHolder.STOCK8 += Stock8Change;
                    embed.AddField($"{Stock8Name}", $"🔺 {Stock8Acronym} --- {StockHolder.STOCK8} +{Stock8Change}");
                }
                else
                {
                    if (StockHolder.STOCK8 < Stock8Change)
                    {
                        StockHolder.STOCK8 = 0;
                        embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} 🔻 {StockHolder.STOCK8} -{Stock8Change}");
                        ResetStock(8);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock8Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK8 -= Stock8Change;
                        embed.AddField($"{Stock8Name}", $"--- {Stock8Acronym} 🔻 {StockHolder.STOCK8} -{Stock8Change}");
                    }
                }
            }
            #endregion

            #region Stock9

            if (StockHolder.STOCK9 == 0)
            {
                embed.AddField($"{Stock9Name}", $"💀 {Stock9Acronym} 💀 {StockHolder.STOCK9} ---");
            }
            else if (StockHolder.STOCK9 >= 1000)
            {
                embed.AddField($"{Stock9Name}", $"👑 {Stock9Acronym} 👑 {StockHolder.STOCK9} ---");
            }
            else if (Stock9SpecialEvent == 1)
            {
                if (Stock9POSORNEG == 0)
                {
                    StockHolder.STOCK9 += Stock9SpecialEvent1Change;
                    embed.AddField($"{Stock9Name}", $"🔺 {Stock9Acronym} --- {StockHolder.STOCK9} +{Stock9SpecialEvent1Change}");
                    embed.AddField($"Fumplestock Skyrocket:", $"{Stock9Name} JUST SKYROCKETED!!!");
                }
                else
                {
                    if (StockHolder.STOCK9 < Stock9SpecialEvent1Change)
                    {
                        StockHolder.STOCK9 = 0;
                        embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} 🔻 {StockHolder.STOCK9} -{Stock9SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock9Name} JUST CRASHED!!!");
                        ResetStock(9);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock9Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK9 -= Stock9SpecialEvent1Change;
                        embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} 🔻 {StockHolder.STOCK9} -{Stock9SpecialEvent1Change}");
                        embed.AddField($"Fumplestock Crash:", $"{Stock9Name} JUST CRASHED!!!");
                    }
                }
            }
            else if (Stock9SpecialEvent <= 3)
            {
                if (Stock9POSORNEG == 0)
                {
                    StockHolder.STOCK9 += Stock9SpecialEvent2Change;
                    embed.AddField($"{Stock9Name}", $"🔺 {Stock9Acronym} --- {StockHolder.STOCK9} +{Stock9SpecialEvent2Change}");
                    embed.AddField($"Fumplestock Boom:", $"{Stock9Name} just Boomed!!");
                }
                else
                {
                    if (StockHolder.STOCK9 < Stock9SpecialEvent2Change)
                    {
                        StockHolder.STOCK9 = 0;
                        embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} 🔻 {StockHolder.STOCK9} -{Stock9SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock9Name} just went into a Depression!!");
                        ResetStock(9);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock9Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK9 -= Stock9SpecialEvent2Change;
                        embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} 🔻 {StockHolder.STOCK9} -{Stock9SpecialEvent2Change}");
                        embed.AddField($"Fumplestock Depression:", $"{Stock9Name} just went into a Depression!!");
                    }
                }
            }
            else if (Stock9SpecialEvent <= 7)
            {
                if (Stock9POSORNEG == 0)
                {
                    StockHolder.STOCK9 += Stock9SpecialEvent3Change;
                    embed.AddField($"{Stock9Name}", $"🔺 {Stock9Acronym} --- {StockHolder.STOCK9} +{Stock9SpecialEvent3Change}");
                    embed.AddField($"Fumplestock Expansion:", $"{Stock9Name} just Expanded!");
                }
                else
                {
                    if (StockHolder.STOCK9 < Stock9SpecialEvent3Change)
                    {
                        StockHolder.STOCK9 = 0;
                        embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} 🔻 {StockHolder.STOCK9} -{Stock9SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock9Name} just Recessed!");
                        ResetStock(9);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock9Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK9 -= Stock9SpecialEvent3Change;
                        embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} 🔻 {StockHolder.STOCK9} -{Stock9SpecialEvent3Change}");
                        embed.AddField($"Fumplestock Recession:", $"{Stock9Name} just Recessed!");
                    }
                }
            }
            else if (Stock9Change == 0)
            {
                embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} --- {StockHolder.STOCK9} ---");
            }
            else
            {
                if (Stock9POSORNEG == 0)
                {
                    StockHolder.STOCK9 += Stock9Change;
                    embed.AddField($"{Stock9Name}", $"🔺 {Stock9Acronym} --- {StockHolder.STOCK9} +{Stock9Change}");
                }
                else
                {
                    if (StockHolder.STOCK9 < Stock9Change)
                    {
                        StockHolder.STOCK9 = 0;
                        embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} 🔻 {StockHolder.STOCK9} -{Stock9Change}");
                        ResetStock(9);
                        embed.AddField($"Fumplestock Death:", $"💀{Stock9Name} just DIED!💀");
                    }
                    else
                    {
                        StockHolder.STOCK9 -= Stock9Change;
                        embed.AddField($"{Stock9Name}", $"--- {Stock9Acronym} 🔻 {StockHolder.STOCK9} -{Stock9Change}");
                    }
                }
            }
            #endregion

            #endregion
            if (Context.User.Id == 204028118602612736)
            {
                embed.WithAuthor($"Stock change caused by {Context.User.Username}.", $"https://cdn.discordapp.com/avatars/204028118602612736/a14f76eb52192483e1dfdc94ed90e7fd.png?size=128");
            }
            else if (Context.User.Id == 246813230205370379)
            {
                embed.WithAuthor($"Stock change caused by {Context.User.Username}.", $"https://cdn.discordapp.com/avatars/246813230205370379/6ee9c6e166f1f5d862f88f9a8baa5aa6.png?size=128");
            }
            else if (Context.User.Id == 169264940266291200)
            {
                embed.WithAuthor($"Stock change caused by {Context.User.Username}.", $"https://cdn.discordapp.com/avatars/169264940266291200/c4d2d98239a00c81381827b632a5b2c6.png?size=128");
            }
            else if (Context.User.Id == 170950166013018113)
            {
                embed.WithAuthor($"Stock change caused by {Context.User.Username}.", $"https://cdn.discordapp.com/avatars/170950166013018113/5600be212f4c03aeeda6af2cecbc8a26.png?size=128");
            }
            else
            {
                return;
            }
            await StockTextChannel.SendMessageAsync("", embed: embed);
            await Context.Channel.SendMessageAsync($"{Context.User.Username} caused a stock change!");
        }
        #endregion
        #region Gaming Commands
        [Command("BEG")]
        public async Task Beg()
        {
            var account = UserAccounts.GetAccount(Context.User);
            if (account.COINS <= 100 || account.STASH <= 100)
            {
                Random r = new Random();
                int outcome = r.Next(1, 5);
                int coins = r.Next(0, 10);
                uint fumplebucks = Convert.ToUInt32(coins);
                if(outcome == 1)
                {
                    account.COINS += fumplebucks;
                    if (fumplebucks == 1)
                    {
                        await Context.Channel.SendMessageAsync($"```Somebody only gave you a single fumplebuck...T_T (How rude!)```");
                    }
                    else
                    {
                        await Context.Channel.SendMessageAsync($"```Somebody gave you {fumplebucks} fumplebucks!```");
                    }
                    
                }
                else
                {
                    await Context.Channel.SendMessageAsync($"```Nobody gave you anything...T_T```");
                }
            }

            else if (account.COINS <= 1000 || account.STASH <= 1000)
            {
                Random r = new Random();
                int outcome = r.Next(0, 100);
                int coins = r.Next(0, 10);
                uint fumplebucks = Convert.ToUInt32(coins);
                if (outcome == 1)
                {
                    account.COINS += fumplebucks;
                    if (fumplebucks == 1)
                    {
                        await Context.Channel.SendMessageAsync($"```Somebody gave you {fumplebucks} fumplebuck...T_T```");
                    }
                    else
                    {
                        await Context.Channel.SendMessageAsync($"```Somebody gave you {fumplebucks} fumplebucks!```");
                    }

                }
                else
                {
                    await Context.Channel.SendMessageAsync($"```Nobody gave you anything...T_T```");
                }
            }
            else if (account.COINS > 1000 || account.STASH > 1000)
            {
                Random r = new Random();
                int outcome = r.Next(0, 1000);
                int coins = r.Next(0, 10);
                uint fumplebucks = Convert.ToUInt32(coins);
                if (outcome == 1)
                {
                    account.COINS += fumplebucks;
                    if (fumplebucks == 1)
                    {
                        await Context.Channel.SendMessageAsync($"```Somebody gave you {fumplebucks} fumplebuck...T_T```");
                    }
                    else
                    {
                        await Context.Channel.SendMessageAsync($"```Somebody gave you {fumplebucks} fumplebucks!```");
                    }

                }
                else
                {
                    await Context.Channel.SendMessageAsync($"```Nobody gave you anything...T_T```");
                }
            }
        }
        [Command("Pachinko")]
        public async Task PACHINKO()
        {
            
            Random r = new Random();
            int result = r.Next(0, 176);
            var account = UserAccounts.GetAccount(Context.User);
            var bidmaker = UserAccounts.GetAccount(Global.Client.GetUser(184405311681986560));
            uint price = 100;
            uint amount;
            amount = bidmaker.BID;

            var embed = new EmbedBuilder();
            if (price > account.COINS)
            {
                await Context.Channel.SendMessageAsync($"{Context.User.Username} you don't have that amount of fumplebucks it cost 100 to play!");
            }
            else if (result == 0)
            {
                account.COINS += amount;
                bidmaker.BID = 0;
                embed.WithColor(255, 0, 255);
                embed.WithTitle($"{Context.User.Username} VS THE FOG");
                embed.AddField("THE FOREST OF PINS", $"{Context.User.Username} made past the Forest Of Pins!");
                embed.AddField("THE GATE OF SORROW", $"They passed the Gate of Sorrow!");
                embed.AddField("THE 1ST PLATE", $"They passed the 1st plate!");
                embed.AddField("THE 2ND PLATE", $"They passed the 2nd plate!!");
                embed.AddField("THE 3RD PLATE", $"They passed the 3rd plate!!!");
                embed.AddField("Results", $"{Context.User.Username} won the JACKPOT!!!!!!");
                await Context.Channel.SendMessageAsync("", embed: embed);
            }
            else if (result <= 10)
            {
                account.COINS -= 100;
                bidmaker.BID += 50;
                if (Context.User.Id != 246813230205370379)
                {
                    var fumpledump = UserAccounts.GetAccount(Global.Client.GetUser(246813230205370379));
                    fumpledump.COINS += 50;
                }
                embed.WithColor(255, 0, 255);
                embed.WithTitle($"{Context.User.Username} VS THE FOG");
                embed.AddField("THE FOREST OF PINS", $"{Context.User.Username} made past the Forest Of Pins!");
                embed.AddField("THE GATE OF SORROW", $"They passed the Gate of Sorrow!");
                embed.AddField("THE 1ST PLATE", $"They passed the 1st plate!");
                embed.AddField("THE 2ND PLATE", $"They passed the 2nd plate!!");
                embed.AddField("THE 3RD PLATE", $"They failed the 3rd plate...T_T");
                embed.AddField("Results", $"{Context.User.Username} lost 100 fumplebucks...");
                await Context.Channel.SendMessageAsync("", embed: embed);
            }
            else if (result <= 25)
            {
                account.COINS -= 100;
                bidmaker.BID += 50;
                if (Context.User.Id != 246813230205370379)
                {
                    var fumpledump = UserAccounts.GetAccount(Global.Client.GetUser(246813230205370379));
                    fumpledump.COINS += 50;
                }
                embed.WithColor(255, 0, 255);
                embed.WithTitle($"{Context.User.Username} VS THE FOG");
                embed.AddField("THE FOREST OF PINS", $"{Context.User.Username} made past the Forest Of Pins!");
                embed.AddField("THE GATE OF SORROW", $"They passed the Gate of Sorrow!");
                embed.AddField("THE 1ST PLATE", $"They passed the 1st plate!");
                embed.AddField("THE 2ND PLATE", $"They failed the 2nd plate...");
                embed.AddField("Results", $"{Context.User.Username} lost 100 fumplebucks...");
                await Context.Channel.SendMessageAsync("", embed: embed);
            }
            else if (result <= 45)
            {
                account.COINS -= 100;
                bidmaker.BID += 50;
                if (Context.User.Id != 246813230205370379)
                {
                    var fumpledump = UserAccounts.GetAccount(Global.Client.GetUser(246813230205370379));
                    fumpledump.COINS += 50;
                }
                embed.WithColor(255, 0, 255);
                embed.WithTitle($"{Context.User.Username} VS THE FOG");
                embed.AddField("THE FOREST OF PINS", $"{Context.User.Username} made past the Forest Of Pins!");
                embed.AddField("THE GATE OF SORROW", $"They passed the Gate of Sorrow!");
                embed.AddField("THE 1ST PLATE", $"They failed the 1st plate...");
                embed.AddField("Results", $"{Context.User.Username} lost 100 fumplebucks...");
                await Context.Channel.SendMessageAsync("", embed: embed);
            }
            else if (result <= 88)
            {
                account.COINS -= 100;
                bidmaker.BID += 50;
                if (Context.User.Id != 246813230205370379)
                {
                    var fumpledump = UserAccounts.GetAccount(Global.Client.GetUser(246813230205370379));
                    fumpledump.COINS += 50;
                }
                embed.WithColor(255, 0, 255);
                embed.WithTitle($"{Context.User.Username} VS THE FOG");
                embed.AddField("THE FOREST OF PINS", $"{Context.User.Username} made past the Forest Of Pins!");
                embed.AddField("THE GATE OF SORROW", $"They failed the Gate of Sorrow...");
                embed.AddField("Results", $"{Context.User.Username} lost 100 fumplebucks...");
                await Context.Channel.SendMessageAsync("", embed: embed);
            }
            else if (result <= 176)
            {
                account.COINS -= 100;
                bidmaker.BID += 50;
                if (Context.User.Id != 246813230205370379)
                {
                    var fumpledump = UserAccounts.GetAccount(Global.Client.GetUser(246813230205370379));
                    fumpledump.COINS += 50;
                }
                embed.WithColor(255, 0, 255);
                embed.WithTitle($"{Context.User.Username} VS THE FOG");
                embed.AddField("THE FOREST OF PINS", $"{Context.User.Username} made failed the Forest Of Pins!");
                embed.AddField("Results", $"{Context.User.Username} lost 100 fumplebucks...");
                await Context.Channel.SendMessageAsync("", embed: embed);
            }
        }
        [Command("Gamble")]
        public async Task Gamble(uint amount)
        {
            Random r = new Random();
            int result = r.Next(0, 2);
            var account = UserAccounts.GetAccount(Context.User);
            var embed = new EmbedBuilder();
            if (amount > account.COINS)
            {
                await Context.Channel.SendMessageAsync($"{Context.User.Username} you don't have that amount of fumplebucks!");
            }
            else if (amount == 0)
            {
                await Context.Channel.SendMessageAsync($"{Context.User.Username} you can't gamble nothing!");
            }
            else if (result == 0)
            {
                account.COINS += amount;
                embed.WithColor(0, 255, 0);
                embed.WithTitle("Results");
                embed.WithDescription($"{Context.User.Username} won {amount} fumplebucks!");
                await Context.Channel.SendMessageAsync("", embed: embed);
            }
            else if (result == 1)
            {
                account.COINS -= amount;
                if (Context.User.Id != 246813230205370379)
                {
                    var fumpledump = UserAccounts.GetAccount(Global.Client.GetUser(246813230205370379));
                    fumpledump.COINS += amount;
                }

                embed.WithColor(255, 0, 0);
                embed.WithTitle("Results");
                embed.WithDescription($"{Context.User.Username} lost {amount} fumplebucks!");
                await Context.Channel.SendMessageAsync("", embed: embed);
            }
        }
        [Command("Rock Paper Scissors")]
        public async Task RPS(string Choice)
        {
            var UserAccount = UserAccounts.GetAccount(Context.User);
            var BotAccount = UserAccounts.GetAccount(Global.Client.GetUser(419981188237754368));
            if (UserAccount.COINS <= 25)
            {
                await Context.Channel.SendMessageAsync($"{Context.User.Username} you don't have that amount of fumplebucks!");
                return;
            }
            else if (BotAccount.COINS <= 25)
            {
                await Context.Channel.SendMessageAsync($"Sorry I don't have enough money...");
                return;
            }

            Random r = new Random();
            string[] BotChoiceSelection = new string[] {"Rock", "Paper", "Scissors" };
            string BotChoice = BotChoiceSelection[r.Next(0, BotChoiceSelection.Length)];

            await Context.Channel.SendMessageAsync($"{BotChoice}!");

            if (Choice == "Rock" || Choice == "rock")
            {
                if (BotChoice == "Scissors")
                {
                    UserAccount.COINS += 25;
                    BotAccount.COINS -= 25;

                    await Context.Channel.SendMessageAsync($"MY SCISSORS NOOOOOOOOOOO!");
                    await Context.Channel.SendMessageAsync($"Ugh, here is your 25 fumplebucks.");
                }
                else if (BotChoice == "Paper")
                {
                    UserAccount.COINS -= 25;
                    BotAccount.COINS += 25;

                    await Context.Channel.SendMessageAsync($"Get covered!");
                    await Context.Channel.SendMessageAsync($"I will be taking that 25 fumplebucks thx. ;)");
                }
                else
                {
                    await Context.Channel.SendMessageAsync($"Welp...looks like we will be here for a while.");
                }
            }
            else if (Choice == "Paper" || Choice == "paper")
            {
                if (BotChoice == "Rock")
                {
                    UserAccount.COINS += 25;
                    BotAccount.COINS -= 25;

                    await Context.Channel.SendMessageAsync($"I can't even see my rock anymore!");
                    await Context.Channel.SendMessageAsync($"Ugh, here is your 25 fumplebucks.");
                }
                else if (BotChoice == "Scissors")
                {
                    UserAccount.COINS -= 25;
                    BotAccount.COINS += 25;

                    await Context.Channel.SendMessageAsync($"Snip Snip!");
                    await Context.Channel.SendMessageAsync($"I will be takeing that 25 fumplebucks thx. ;)");
                }
                else
                {
                    await Context.Channel.SendMessageAsync($"Got a assignment to do or?");
                }
            }
            else if (Choice == "Scissors" || Choice == "scissors")
            {
                if (BotChoice == "Paper")
                {
                    UserAccount.COINS += 25;
                    BotAccount.COINS -= 25;

                    await Context.Channel.SendMessageAsync($"It's all in scraps now. T_T");
                    await Context.Channel.SendMessageAsync($"Ugh, here is your 25 fumplebucks.");
                }
                else if (BotChoice == "Rock")
                {
                    UserAccount.COINS -= 25;
                    BotAccount.COINS += 25;

                    await Context.Channel.SendMessageAsync($"BAM!");
                    await Context.Channel.SendMessageAsync($"I will be takeing that 25 fumplebucks thx. ;)");
                }
                else
                {
                    await Context.Channel.SendMessageAsync($"Swordfight?");
                }
            }
            else if (Choice == "Gun" || Choice == "gun")
            {
                await Context.Channel.SendMessageAsync($"🖕Fuck you!");
            }
            else
            {
                await Context.Channel.SendMessageAsync($"That's not a thing...");
            }
        }
        [Command("russian roulette")]
        public async Task Roulette()
        {
            Random r = new Random();
            string[] RouletteAnswer = new string[] { "Bang", "Click", "Click", "Click", "Click", "Click" };
            string RouletteAnswerselection = RouletteAnswer[r.Next(0, RouletteAnswer.Length)];
            if (RouletteAnswerselection == "Bang")
            {
                await Context.Channel.SendMessageAsync(RouletteAnswerselection + "! You're Dead!");
            }
            else
            {
                await Context.Channel.SendMessageAsync(RouletteAnswerselection + "! You live another day!");
            }
        }

        [Command("Slot Machine")]
        public async Task Slots()
        {
            #region Combination Values
            uint cost = 25;

            uint ThreePoop = 15;
            uint TwoPoop = 5;

            uint ThreeLem = 100;
            uint TwoLem = 25;

            uint ThreeChoms = 150;
            uint TwoChoms = 50;

            uint ThreeBacon = 250;
            uint TwoBacon = 100;

            uint ThreeHearts = 350;
            uint TwoHearts = 200;

            uint ThreeDrinks = 500;
            uint TwoDrinks = 300;

            uint ThreeGems = 750;
            uint TwoGems = 400;

            uint ThreeCrowns = 1000;
            uint TwoCrowns = 500;
            #endregion
            var account = UserAccounts.GetAccount(Context.User);
            if (account.COINS < 25)
            {
                await Context.Channel.SendMessageAsync($"You don't have enough money to play the slot machine!");
                return;
            }
            string[] Slots = new string[] { "💀", "💩", "💩", "💩", "💩", "🍋", "🍋", "🍋", "🍋", "🍋", "🍋", "🍋", "🍌", "🍌", "🍌", "🍌", "🍌", "🍌", "🥓", "🥓", "🥓", "🥓", "🥓", "💖", "💖", "💖", "💖", "🍸", "🍸", "🍸", "💎", "💎", "👑" };
            Random r = new Random();
            string Slot1 = Slots[r.Next(0, Slots.Length)];
            string Slot2 = Slots[r.Next(0, Slots.Length)];
            string Slot3 = Slots[r.Next(0, Slots.Length)];

            account.COINS -= cost;
            await Context.Channel.SendMessageAsync($"➡️{Slot1}{Slot2}{Slot3}⬅️");
            #region Combinations
            if (Slot1 == "💀" || Slot2 == "💀" || Slot3 == "💀")
            {
                if (Context.User.Id != 246813230205370379)
                {
                    var fumpledump = UserAccounts.GetAccount(Global.Client.GetUser(246813230205370379));
                    fumpledump.COINS += 25;
                }
                await Context.Channel.SendMessageAsync($"Jeez...you just got boned.");
            }
            else if (Slot1 == "💩" & Slot2 == "💩" & Slot3 == "💩")
            {
                account.COINS += ThreePoop;
                await Context.Channel.SendMessageAsync($"```{Context.User.Username} won {ThreePoop} fumplebucks!```");
                await Context.Channel.SendMessageAsync($"That's a load of 💩!");
            }
            else if (Slot1 == "💩" & Slot2 == "💩" || Slot1 == "💩" & Slot3 == "💩" || Slot2 == "💩" & Slot3 == "💩")
            {
                account.COINS += TwoPoop;
                await Context.Channel.SendMessageAsync($"```{Context.User.Username} won {TwoPoop} fumplebucks!```");
                await Context.Channel.SendMessageAsync($"Ew...");
            }
            else if (Slot1 == "🍋" & Slot2 == "🍋" & Slot3 == "🍋")
            {
                account.COINS += ThreeLem;
                await Context.Channel.SendMessageAsync($"```{Context.User.Username} won {ThreeLem} fumplebucks!```");
                await Context.Channel.SendMessageAsync($"That's some sour stuff!");
            }
            else if (Slot1 == "🍋" & Slot2 == "🍋" || Slot1 == "🍋" & Slot3 == "🍋" || Slot2 == "🍋" & Slot3 == "🍋")
            {
                account.COINS += TwoLem;
                await Context.Channel.SendMessageAsync($"```{Context.User.Username} won {TwoLem} fumplebucks!```");
                await Context.Channel.SendMessageAsync($"Better than nothing...");
            }
            else if (Slot1 == "🍌" & Slot2 == "🍌" & Slot3 == "🍌")
            {
                account.COINS += ThreeChoms;
                await Context.Channel.SendMessageAsync($"```{Context.User.Username} won {ThreeChoms} fumplebucks!```");
                await Context.Channel.SendMessageAsync($"CHOM CHOMS!");
            }
            else if (Slot1 == "🍌" & Slot2 == "🍌" || Slot1 == "🍌" & Slot3 == "🍌" || Slot2 == "🍌" & Slot3 == "🍌")
            {
                account.COINS += TwoChoms;
                await Context.Channel.SendMessageAsync($"```{Context.User.Username} won {TwoChoms} fumplebucks!```");
                await Context.Channel.SendMessageAsync($"Monkey Business!");
            }
            else if (Slot1 == "🥓" & Slot2 == "🥓" & Slot3 == "🥓")
            {
                account.COINS += ThreeBacon;
                await Context.Channel.SendMessageAsync($"```{Context.User.Username} won {ThreeBacon} fumplebucks!```");
                await Context.Channel.SendMessageAsync($"Mmmmmm...BACON!");
            }
            else if (Slot1 == "🥓" & Slot2 == "🥓" || Slot1 == "🥓" & Slot3 == "🥓" || Slot2 == "🥓" & Slot3 == "🥓")
            {
                account.COINS += TwoBacon;
                await Context.Channel.SendMessageAsync($"```{Context.User.Username} won {TwoBacon} fumplebucks!```");
                await Context.Channel.SendMessageAsync($"Two bacon is better than one!");
            }
            else if (Slot1 == "🍸" & Slot2 == "🍸" & Slot3 == "🍸")
            {
                account.COINS += ThreeDrinks;
                await Context.Channel.SendMessageAsync($"```{Context.User.Username} won {ThreeDrinks} fumplebucks!```");
                await Context.Channel.SendMessageAsync($"PARTY!");
            }
            else if (Slot1 == "🍸" & Slot2 == "🍸" || Slot1 == "🍸" & Slot3 == "🍸" || Slot2 == "🍸" & Slot3 == "🍸")
            {
                account.COINS += TwoDrinks;
                await Context.Channel.SendMessageAsync($"```{Context.User.Username} won {TwoDrinks} fumplebucks!```");
                await Context.Channel.SendMessageAsync($"Nice drinks you got there.");
            }
            else if (Slot1 == "💖" & Slot2 == "💖" & Slot3 == "💖")
            {
                account.COINS += ThreeHearts;
                await Context.Channel.SendMessageAsync($"```{Context.User.Username} won {ThreeHearts} fumplebucks!```");
                await Context.Channel.SendMessageAsync($"LOVE!");
            }
            else if (Slot1 == "💖" & Slot2 == "💖" || Slot1 == "💖" & Slot3 == "💖" || Slot2 == "💖" & Slot3 == "💖")
            {
                account.COINS += TwoHearts;
                await Context.Channel.SendMessageAsync($"```{Context.User.Username} won {TwoHearts} fumplebucks!```");
                await Context.Channel.SendMessageAsync($"Fuckin Timelords!");
            }
            else if (Slot1 == "💎" & Slot2 == "💎" & Slot3 == "💎")
            {
                account.COINS += ThreeGems;
                await Context.Channel.SendMessageAsync($"```{Context.User.Username} won {ThreeGems} fumplebucks!```");
                await Context.Channel.SendMessageAsync($"Ohhh Shiny!");
            }
            else if (Slot1 == "💎" & Slot2 == "💎" || Slot1 == "💎" & Slot3 == "💎" || Slot2 == "💎" & Slot3 == "💎")
            {
                account.COINS += TwoGems;
                await Context.Channel.SendMessageAsync($"```{Context.User.Username} won {TwoGems} fumplebucks!```");
                await Context.Channel.SendMessageAsync($"YOU'RE RICH!");
            }
            else if (Slot1 == "👑" & Slot2 == "👑" & Slot3 == "👑")
            {
                account.COINS += ThreeCrowns;
                await Context.Channel.SendMessageAsync($"```{Context.User.Username} won {ThreeCrowns} fumplebucks!```");
                await Context.Channel.SendMessageAsync($"JACKPOT!");
            }
            else if (Slot1 == "👑" & Slot2 == "👑" || Slot1 == "👑" & Slot3 == "👑" || Slot2 == "👑" & Slot3 == "👑")
            {
                account.COINS += TwoCrowns;
                await Context.Channel.SendMessageAsync($"```{Context.User.Username} won {TwoCrowns} fumplebucks!```");
                await Context.Channel.SendMessageAsync($"King and Queen!");
            }
            else
            {
                if (Context.User.Id != 246813230205370379)
                {
                    var fumpledump = UserAccounts.GetAccount(Global.Client.GetUser(246813230205370379));
                    fumpledump.COINS += 25;
                }
                await Context.Channel.SendMessageAsync($"You got nothing...");
            }
            #endregion
        }
        [Command("Payment Table")]
        public async Task PayTable()
        {
            #region Combination Values
            uint cost = 25;

            uint ThreePoop = 15;
            uint TwoPoop = 5;

            uint ThreeLem = 100;
            uint TwoLem = 25;

            uint ThreeChoms = 150;
            uint TwoChoms = 50;

            uint ThreeBacon = 250;
            uint TwoBacon = 100;

            uint ThreeHearts = 350;
            uint TwoHearts = 200;

            uint ThreeDrinks = 500;
            uint TwoDrinks = 300;

            uint ThreeGems = 750;
            uint TwoGems = 400;

            uint ThreeCrowns = 1000;
            uint TwoCrowns = 500;
            #endregion

            var embed = new EmbedBuilder();
            embed.WithTitle("Pay table for slot machine");
            embed.WithColor(new Color(255, 0, 255));
            embed.AddField("Cost", $"It cost {cost} fumplebucks to use.");
            embed.AddField("💀", "Stops you from getting money");
            embed.AddField("💩", $"2 💩s gets you {TwoPoop} fumplebucks while 3 gets you {ThreePoop}");
            embed.AddField("🍋", $"2 🍋s gets you {TwoLem} fumplebucks while 3 gets you {ThreeLem}");
            embed.AddField("🍌", $"2 🍌s gets you {TwoChoms} fumplebucks while 3 gets you {ThreeChoms}");
            embed.AddField("🥓", $"2 🥓s gets you {TwoBacon} fumplebucks while 3 gets you {ThreeBacon}");
            embed.AddField("💖", $"2 💖s gets you {TwoHearts} fumplebucks while 3 gets you {ThreeHearts}");
            embed.AddField("🍸", $"2 🍸s gets you {TwoDrinks} fumplebucks while 3 gets you {ThreeDrinks}");
            embed.AddField("💎", $"2 💎s gets you {TwoGems} fumplebucks while 3 gets you {ThreeGems}");
            embed.AddField("👑", $"2 👑s gets you {TwoCrowns} fumplebucks while 3 gets you {ThreeCrowns}");
            embed.AddField("Help", "To use the slot machine type in $slot machine");

            await Context.Channel.SendMessageAsync("", false, embed);
        }
        #endregion
        #region Roleplaying Commands
        [Command("Roll")]
        public async Task roll(int num)
        {
            Random r = new Random();
            if (num <= 0)
            {
                await Context.Channel.SendMessageAsync("I can't roll a D" + num + "!");
            }
            else
            {
                int DICEselection = r.Next(1, num + 1);
                await Context.Channel.SendMessageAsync(Context.User.Username + " rolled a " + DICEselection + "!");
            }
        }
        [Command("Roll FATE")]
        public async Task FATE()
        {
            Random r = new Random();
            int FATENUM = r.Next(1, 82);

            if (FATENUM <= 19)
            {
                await Context.Channel.SendMessageAsync(Context.User.Username + " rolled a 0!");
                await Context.Channel.SendMessageAsync("That is pretty boring if you ask me...");
            }
            else if (FATENUM > 19 & FATENUM <= 35)
            {
                await Context.Channel.SendMessageAsync(Context.User.Username + " rolled a +1!");
                await Context.Channel.SendMessageAsync("Better than nothing I always say!");
            }
            else if (FATENUM > 35 & FATENUM <= 45)
            {
                await Context.Channel.SendMessageAsync(Context.User.Username + " rolled a +2!");
                await Context.Channel.SendMessageAsync("Double it BABY!");
            }
            else if (FATENUM > 45 & FATENUM <= 49)
            {
                await Context.Channel.SendMessageAsync(Context.User.Username + " rolled a +3!");
                await Context.Channel.SendMessageAsync("Hey that's pretty good!");
            }
            else if (FATENUM == 50)
            {
                await Context.Channel.SendMessageAsync(Context.User.Username + " rolled a +4!");
                await Context.Channel.SendMessageAsync("Whoa! You are truly almighty!");
            }
            else if (FATENUM > 50 & FATENUM <= 66)
            {
                await Context.Channel.SendMessageAsync(Context.User.Username + " rolled a -1!");
                await Context.Channel.SendMessageAsync("It's not that bad...");
            }
            else if (FATENUM > 66 & FATENUM <= 76)
            {
                await Context.Channel.SendMessageAsync(Context.User.Username + " rolled a -2!");
                await Context.Channel.SendMessageAsync("Ouch!");
            }
            else if (FATENUM > 76 & FATENUM <= 80)
            {
                await Context.Channel.SendMessageAsync(Context.User.Username + " rolled a -3!");
                await Context.Channel.SendMessageAsync("Have fun with that...");
            }
            else if (FATENUM == 81)
            {
                await Context.Channel.SendMessageAsync(Context.User.Username + " rolled a -4!");
                await Context.Channel.SendMessageAsync("Wow! You're screwed!");
            }
        }
        [Command("flip")]
        public async Task filp()
        {
            Random r = new Random();
            string[] result = new string[] { "heads", "tails" };
            string resultselection = result[r.Next(0, result.Length)];

            await Context.Channel.SendMessageAsync("The fumplebuck landed on " + resultselection + "!");
        }
        [Command("generate human")]
        public async Task gethuman()
        {
            string json = "";
            using (WebClient client = new WebClient())
            {
                json = client.DownloadString("https://randomuser.me/api/?nat=US");
            }

            var dataObject = JsonConvert.DeserializeObject<dynamic>(json);

            string firstname = UppercaseFirst(dataObject.results[0].name.first.ToString());
            string lastname = UppercaseFirst(dataObject.results[0].name.last.ToString());
            string avatarURL = dataObject.results[0].picture.large.ToString();

            string UppercaseFirst(string s)
            {
                // Check for empty string.
                if (string.IsNullOrEmpty(s))
                {
                    return string.Empty;
                }
                // Return char and concat substring.
                return char.ToUpper(s[0]) + s.Substring(1);
            }

            var embed = new EmbedBuilder();
            embed.WithThumbnailUrl(avatarURL);
            embed.WithTitle("Generated Human");
            embed.AddInlineField("First Name", firstname);
            embed.AddInlineField("Last Name", lastname);
            embed.WithColor(new Color(255, 0, 0));

            await Context.Channel.SendMessageAsync("", embed: embed);
        }
        #endregion
        #region Reaction Stuff Commands
        [Command("shame")]
        public async Task HandleReactionMessage([Remainder] string Shamed)
        {
            string UserImage = Context.User.GetAvatarUrl();
            var embed = new EmbedBuilder();
            embed.WithTitle("The Shamening.");
            embed.WithAuthor($"Initiated by {Context.User.Username}!", UserImage);
            embed.WithColor(new Color(255, 0, 0));
            embed.WithDescription($"{Context.User.Username} wants to throw tomatos at {Shamed}!");
            embed.AddInlineField("Need help?", "If you want to join in on the fun add a 🍅 to the message.");
            embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/422551692186222595/424344069615910912/Tomato-by-Rones.png");
            RestUserMessage msg = await Context.Channel.SendMessageAsync("", false, embed);
            Global.MessageIdToTrack = msg.Id;
        }
        [Command("vote")]
        public async Task Vote([Remainder] string BallotTitle)
        {
            string UserImage = Context.User.GetAvatarUrl();
            var embed = new EmbedBuilder();
            embed.WithTitle($"Vote on {BallotTitle}.");
            embed.WithAuthor($"Vote created by {Context.User.Username}.", UserImage);
            embed.WithColor(new Color(6, 86, 244));
            embed.WithDescription($"{Context.User.Username} started a vote on {BallotTitle}.");
            embed.AddInlineField("Need help?", "If you want to vote click ✅ for yes and ❌ for no.");
            RestUserMessage msg = await Context.Channel.SendMessageAsync("", false, embed);
            await msg.AddReactionAsync(new Emoji("✅"));
            await msg.AddReactionAsync(new Emoji("❌"));
        }
        #endregion
        #region Joke Commands
        [Command("are you online?")]
        public async Task areyouonline()
        {
            await Context.Channel.SendMessageAsync("Yes.");
        }
        [Command("tell me a joke")]
        public async Task joke()
        {
            await Context.Channel.SendMessageAsync("You know what's a joke?");
            await Context.Channel.SendMessageAsync(Context.User.Username + "!");
        }
        [Command("coding joke")]
        public async Task codingjoke()
        {
            await Context.Channel.SendMessageAsync("Hello World!");
        }
        [Command("omae wa mou shindeiru")]
        public async Task Dead()
        {
            var embed = new EmbedBuilder();
            embed.WithColor(new Color(255, 0, 0));
            embed.WithDescription("NANI!");
            embed.WithThumbnailUrl("https://cdn.discordapp.com/attachments/411715542924263427/419950181363220480/Mr.Fumpledump_red_eyes.png");

            await Context.Channel.SendMessageAsync("", false, embed);
        }
        [Command("porn")]
        public async Task Gay()
        {
            var embed = new EmbedBuilder();
            embed.WithColor(255, 148, 149);
            embed.WithImageUrl("https://cdn.discordapp.com/attachments/420406882964996116/421485784978423808/Mr.FumpledumpSenpai.png");


            await Context.Channel.SendMessageAsync("", false, embed);
        }
        #endregion
        #region Conversion stuff
        [Command("Convert To Hex")]
        public async Task ConvertToHex([Remainder]string asciiString)
        {
            string hex = "";
            foreach (char c in asciiString)
            {
                int tmp = c;
                hex += String.Format("{0:x2}", (uint)System.Convert.ToUInt32(tmp.ToString()));
            }
            await Context.Channel.SendMessageAsync(hex);
        }
        [Command("Convert To Binary")]
        public async Task ConvertToBin([Remainder]string asciiString)
        {
            byte[] binarr = System.Text.Encoding.ASCII.GetBytes(asciiString);

            StringBuilder binaryStringBuilder = new StringBuilder();
            foreach (byte b in binarr)
            {
                binaryStringBuilder.Append(Convert.ToString(b, 2));
            }
            await Context.Channel.SendMessageAsync(binaryStringBuilder.ToString());
        }
        #endregion
        #region Miscellaneous Commans
        [Command("hello")]
        public async Task Hello(string color = "red")
        {
            string css = "<style>\n    h1{\n        color:" + color + ";\n    }\n    </style>\n";
            string html = String.Format("<h1>Hello {0}!</h1>", Context.User.Username);
            var converter = new HtmlToImageConverter
            {
                Width = 300,
                Height = 85
            };
            var jpgBytes = converter.GenerateImage(css + html, NReco.ImageGenerator.ImageFormat.Jpeg);
            await Context.Channel.SendFileAsync(new MemoryStream(jpgBytes), "hello.jpg");
        }
        [Command("echo")]
        public async Task Echo([Remainder]string message)
        {
            string UserImage = Context.User.GetAvatarUrl();
            var embed = new EmbedBuilder();
            embed.WithTitle("Echo");
            embed.WithAuthor($"Echoed by {Context.User.Username}.", UserImage);
            embed.WithColor(new Color(255, 255, 255));
            embed.WithDescription($"{message}");

            await Context.Channel.SendMessageAsync("", false, embed);
        }
        [Command("Birthday")]
        public async Task Birthday()
        {
            string TristenAvatar = "https://cdn.discordapp.com/attachments/483302550666346498/507027612980346881/e1c52d65-caad-567d-8c4e-3bfc0e2f2aca.png";
            var embed = new EmbedBuilder();
            embed.WithTitle("Tristen's Birthday Party Invitation!");
            embed.WithAuthor($"{Context.User.Username} you have been invited to Tristen's Birthday Pary.", TristenAvatar);
            embed.WithColor(new Color(0, 255, 0));
            embed.WithImageUrl(TristenAvatar);
            embed.WithDescription("You have been invited to Tristen's birthday party the info for it is down below");
            embed.AddField("Place", "The party will take place at Tristen's place at `7604 canton drive Biloxi Mississippi`.");
            embed.AddField("Times", "The part will take place on `Saturday` from `2 to whenever he feels like it`.");
            embed.AddField("Info", "At the party there will be `pizza, cake and if you wish a sleepover` (`Make sure to bring a sleeping bag`).");
            embed.AddField("RSVP/Questions", "If you want to notify them that you are comeing or if you have any questions call `228-235-6199 for tristen` and `228-297-4422 for his dad`.");

            await Context.Channel.SendMessageAsync("", false, embed);
        }
        [Command("Ping")]
        public async Task Ping()
        {
            await Context.Channel.SendMessageAsync("Pong");
        }
        [Command("Bing")]
        public async Task Bing()
        {
            await Context.Channel.SendMessageAsync("Bong");
        }
        [Command("Ching")]
        public async Task Ching()
        {
            await Context.Channel.SendMessageAsync("Chong");
        }
        [Command("Ding")]
        public async Task Ding()
        {
            await Context.Channel.SendMessageAsync("Dong");
        }
        [Command("Fail")]
        public async Task Fail()
        {
            await Context.Channel.SendMessageAsync("YOU FAILED!");
        }
        #endregion
        #region Kingdom Of Fumpledump Commands
        [Command("bananas")]
        public async Task Bananas()
        {
            await Context.Channel.SendMessageAsync("are chom choms!");
        }
        [Command("Law")]
        public async Task Law(int LawNum)
        {
            if (LawNum <= 0)
            {
                await Context.Channel.SendMessageAsync("We don't have any laws under 1...");
            }
            else if (LawNum == 1)
            {
                await Context.Channel.SendMessageAsync("```1. No spamming!```");
            }
            else if (LawNum == 2)
            {
                await Context.Channel.SendMessageAsync("```2. Don’t ping people for stupid reasons!!!```");
            }
            else if (LawNum == 3)
            {
                await Context.Channel.SendMessageAsync("```3. You can be punished without breaking a specified law if the action is deemed shitty enough by the Pope or King!```");
            }
            else if (LawNum == 4)
            {
                await Context.Channel.SendMessageAsync("```4. Make sure to use each channel for its specific purpose.```");
            }
            else if (LawNum == 5)
            {
                await Context.Channel.SendMessageAsync("```5. When you are done with bots that join voice channels make sure they leave before you go.```");
            }
            else if (LawNum == 6)
            {
                await Context.Channel.SendMessageAsync("```6. You are only allowed to post NSFW stuff in the brothel.```");
            }
            else if (LawNum == 7)
            {
                await Context.Channel.SendMessageAsync("```7. Don’t stay in game specific voice channels if you are not playing the game!```");
            }
            else if (LawNum == 8)
            {
                await Context.Channel.SendMessageAsync("```8. 8 is great!```");
            }
            else if (LawNum == 9)
            {
                await Context.Channel.SendMessageAsync("```9. Don’t dox people.```");
            }
            else if (LawNum == 10)
            {
                await Context.Channel.SendMessageAsync("```10. Don’t abuse your powers!```");
            }
            else if (LawNum == 11)
            {
                await Context.Channel.SendMessageAsync("```11. Bananas are chom choms!```");
            }
            else if (LawNum == 12)
            {
                await Context.Channel.SendMessageAsync("```12. When you get into a heated argument with someone, please move to the tavern text channel.```");
            }
            else if (LawNum == 13)
            {
                await Context.Channel.SendMessageAsync("```13. You are not allowed to use real life pictures of people if someone expresses that they do not want the pictures on the server.```");
            }
            else if (LawNum == 14)
            {
                await Context.Channel.SendMessageAsync("```14. OBEY!```");
            }
            else if (LawNum == 15)
            {
                await Context.Channel.SendMessageAsync("```15. You are not allowed to abuse the leveling system!```");
            }
            else if (LawNum == 16)
            {
                await Context.Channel.SendMessageAsync("```16. A person who is challenged does not have to accept and will not lose honor for declining it.```");
            }
            else if (LawNum == 16)
            {
                await Context.Channel.SendMessageAsync("```16. A person who is challenged does not have to accept and will not lose honor for declining it.```");
            }
            else if (LawNum == 17)
            {
                await Context.Channel.SendMessageAsync("```17. Do not attempt to impersonate someone else in this server!```");
            }
            else if (LawNum >= 18)
            {
                await Context.Channel.SendMessageAsync($"We currently don't have any laws over 17!");
            }
        }
        #endregion
    }
}
  