using Discord.WebSocket;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiscordMrFumpleBot.Core.UserAccounts
{
    public static class UserAccounts
    {
        private static List<UserAccount> accounts;

        private static string accountsFile = "Resources/accounts.json";

        static UserAccounts()
        {
            if(DataStorage.SaveExists(accountsFile))
            {
                accounts = DataStorage.LoadUserAccounts(accountsFile).ToList();
            }
            else
            {
                accounts = new List<UserAccount>();
                SaveAccounts();
            }
        }

        public static void SaveAccounts()
        {
            DataStorage.SaveUserAccounts(accounts, accountsFile);
        }

        public static UserAccount GetAccount(SocketUser user)
        {
            return GetOrCreateAccount(user.Id);
        }

        private static UserAccount GetOrCreateAccount(ulong id)
        {
            var result = from a in accounts
                         where a.ID == id
                         select a;

            var account = result.FirstOrDefault();
            if (account == null) account = CreateUserAccount(id);
            return account;
        }

        public static List<UserAccount> GetAllAccounts()
        {
            return accounts.ToList();
        }

        private static UserAccount CreateUserAccount(ulong id)
        {
            var newAccount = new UserAccount()
            {
                ID = id,
                NAME = "Unknown",
                WORD = "Unknown",
                COINS = 100,
                STASH = 0,
                XP = 0,
                SLAVES = 0,
                BID = 0,

                STOCK1ABBREVIATION = "FSAO",
                STOCK2ABBREVIATION = "FSAT",
                STOCK3ABBREVIATION = "FSATH",
                STOCK4ABBREVIATION = "FSAF",
                STOCK5ABBREVIATION = "FSAFI",
                STOCK6ABBREVIATION = "FSAS",
                STOCK7ABBREVIATION = "FSASE",
                STOCK8ABBREVIATION = "FSAE",
                STOCK9ABBREVIATION = "FSAN",

                STOCK1NAME = "FumpleStock1Name",
                STOCK2NAME = "FUMPLESTOCK2NAME",
                STOCK3NAME = "FUMPLESTOCK3NAME",
                STOCK4NAME = "FUMPLESTOCK4NAME",
                STOCK5NAME = "FUMPLESTOCK5NAME",
                STOCK6NAME = "FUMPLESTOCK6NAME",
                STOCK7NAME = "FUMPLESTOCK7NAME",
                STOCK8NAME = "FUMPLESTOCK8NAME",
                STOCK9NAME = "FUMPLESTOCK9NAME",

                STOCK1 = 0,
                STOCK2 = 0,
                STOCK3 = 0,
                STOCK4 = 0,
                STOCK5 = 0,
                STOCK6 = 0,
                STOCK7 = 0,
                STOCK8 = 0,
                STOCK9 = 0,
            };

            accounts.Add(newAccount);
            SaveAccounts();
            return newAccount;
        }
    }
}
