using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DiscordMrFumpleBot.Core.UserAccounts
{
    public class UserAccount
    {
        public ulong ID { get; set; }

        public string NAME { get; set; }

        public string WORD { get; set; }

        public uint COINS { get; set; }

        public uint STASH { get; set; }

        public uint XP { get; set; }

        public uint SLAVES { get; set; }

        public uint BID { get; set; }



        public string STOCK1NAME { get; set; }

        public string STOCK2NAME { get; set; }

        public string STOCK3NAME { get; set; }

        public string STOCK4NAME { get; set; }

        public string STOCK5NAME { get; set; }

        public string STOCK6NAME { get; set; }

        public string STOCK7NAME { get; set; }

        public string STOCK8NAME { get; set; }

        public string STOCK9NAME { get; set; }



        public string STOCK1ABBREVIATION { get; set; }

        public string STOCK2ABBREVIATION { get; set; }

        public string STOCK3ABBREVIATION { get; set; }

        public string STOCK4ABBREVIATION { get; set; }

        public string STOCK5ABBREVIATION { get; set; }

        public string STOCK6ABBREVIATION { get; set; }

        public string STOCK7ABBREVIATION { get; set; }

        public string STOCK8ABBREVIATION { get; set; }

        public string STOCK9ABBREVIATION { get; set; }



        public uint STOCK1 { get; set; }

        public uint STOCK2 { get; set; }

        public uint STOCK3 { get; set; }

        public uint STOCK4 { get; set; }

        public uint STOCK5 { get; set; }

        public uint STOCK6 { get; set; }

        public uint STOCK7 { get; set; }

        public uint STOCK8 { get; set; }

        public uint STOCK9 { get; set; }

        public uint LevelNumber
        {
            get
            {
                //Xp = Level ^ 2 * 50
                //Level = Sqrt Xp / 50
                return (uint)Math.Sqrt(XP / 50);
            }
        }
    }
}
