using Discord;
using Discord.WebSocket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiscordMrFumpleBot.Core.LevelingSystem
{
    internal static class Leveling
    {
        internal static async void UserSentMessage(SocketGuildUser user, SocketTextChannel channel)
        {
            // if the user has a timeout, ignore them
            var userAccount = UserAccounts.UserAccounts.GetAccount(user);
            uint oldLevel = userAccount.LevelNumber;
            userAccount.XP += 10;
            UserAccounts.UserAccounts.SaveAccounts();
            uint newLevel = userAccount.LevelNumber;

            if(oldLevel != userAccount.LevelNumber)
            {
                userAccount.COINS += userAccount.LevelNumber*50;

                var embed = new EmbedBuilder();
                embed.WithColor(224, 64, 251);
                embed.WithTitle("LEVEL UP!");
                embed.WithDescription($"{user.Username} just leveled up!");
                embed.AddInlineField("Level", newLevel);
                embed.AddInlineField("XP", userAccount.XP);
                embed.AddInlineField("FumpleBucks", userAccount.COINS);

                await channel.SendMessageAsync("", embed: embed);
            }
        }
    }
}
