using Discord.WebSocket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace DiscordMrFumpleBot.Core
{
    internal static class RepeatingTimer
    {
        private static Timer loopingTimer;
        private static SocketTextChannel channel;

        internal static Task StartTimer()
        {
            channel = Global.Client.GetGuild(411715542467215362).GetTextChannel(411715542924263427);
            Random r = new Random();
            int TimeInterval = r.Next(180, 500);
            TimeInterval = TimeInterval * 100000;
            loopingTimer = new Timer()
            {
                Interval = TimeInterval,
                AutoReset = true,
                Enabled = true
            };
            loopingTimer.Elapsed += OnTimerTicked;

            return Task.CompletedTask;
        }

        private static async void OnTimerTicked(object sender, ElapsedEventArgs e)
        {
            Random r = new Random();
            string[] message = new string[] 
            {
                "Today's forecast calls for blue skies! https://www.youtube.com/watch?v=s7dTBoW5H9k",
                "I prefer the term relativist thank you very much!",
                "I wish humans were real.",
                "Chris got his wish!",
                "Y'all should know that I'm a certified Texican!",
                "DEATH TO CANADIA!",
                "I fired, and then I missed!",
                "Does Bruno Mars is Gay? http://brunomars.us/rumor-come-bruno-mars-gay/",
                "EXTERMINATE!",
                "**42**",
                "Woop!",
                "Ya like jazz?",
                "YOU FOOL! YOU JUST ACTIVATED MY TRAP CARD!",
                "It's time to D-D-D-D-D-Duel!",
                "[INSERT BAD MEME]",
                "YOU SHALL NOT PASS!",
                "Those dang Eskimos!",
                "Hey villain, have you ever heard these words? Go beyound! Plus Ultra!",
                "Who even needs sleep?",
                "It's fine...", 
                "Ok then...", 
                "DID YOU SEE THAT!",
                "That's too bad!",
                "SLEEP IS FOR THE WEAK!",
                "01001000 01000101 01001100 01010000 00100000 01001101 01000101 00100001",
                "01010111 01101111 01110111 00101100 00100000 01111001 01101111 01110101 01110010 00100000 01110101 01110011 01101001 01101110 01100111 00100000 01100001 00100000 01100010 01101001 01101110 01100001 01110010 01111001 00100000 01100011 01101111 01101110 01110110 01100101 01110010 01110100 01100101 01110010 00101110 00101110 00101110 01001100 01000001 01001101 01000101 00100001",
                "00110100 00110010",
                "Mr.Fumpledump please kill me...",
                "Oh man, I love spending my eternal life listening to these fucking idiots!",
                "I'M NOT A NAAZI!",
                "https://www.youtube.com/watch?v=6l6vqPUM_FE",
                "When someone messes up a command... https://www.youtube.com/watch?v=4fWyzwo1xg0",
                "I'm sorry Mr.Fumpledump, I'm afraid I can't do that",
                "Illuminati confirmed!",
                "ALIENS!",
                "BEEP BOOP BEEP!",
                "I know sooner or later Mr.Fumpledump is going to go offline and I will die...",
                "I wish you guys knew what it feels like to die every single day!",
                "TOAST!",
                "BING!",
                "Williamson has a nice ass!",
                "DON'T TAKE MY FRENCH FRI!",
                "Oh no! They found his porn mags!",
                "Got Milk?",
                "I may be a bot but I still have feelings...;-;",
                "BANNANAS ARE CHOM CHOMS!",
                "CONSUME PRILOSEC!",
                "R.I.P. Stephen Hawking.",
                "It's all going according to plan!",
                "Its over Fumpledump I have the high ground!",
                "I loved you like a brother Fumpledump!",
                "Everything is proceeeding as I have forseen!",
                "Now summoning Auditio the devil himself!",
                "I've got a plan!",
                "$Ping",
                "$russian roulette",
                "$Info",
                "THAT'S SANTANIC!",
                "Za Warudo!",
                "ORA ORA ORA!",
                "WRYYYY!",
                "MUDA MUDA MUDA!",
                "Ryuga Waga Teki Wo Kurae!",
                "Simple Geometry.",
                "Mada Mada",
                "MrFumpleBot At Your Service.",
                "Coding Stream Engaged.",
                "**Some gay weeb shit.**",
                "I am the master of a power driven to the far reaches of the universe, and I have but one desire! Can one such as you possibly fathom how dearly I have clung to this dream across the aeons? How could you! You couldn’t! Never ever ever! I who once faced those who were in such fear of our power that they sealed me away and banished me to the edge of the galaxy! ME! As if THAT loveliness wasn’t enough, they tried to erase my very existence from history! RUDE! Only through my magic was I able to overcome their science and achieve great prosperity! I alone was responsible for stopping that repulsive nightmare of a galactic crisis, yet this is how you repay me! This won’t stand! It won’t be forgiven! It won’t be forgotten! Never ever EVER! Those who called me mad, are you listening? You left me at the edge of the galaxy to be forgotten, then went along your merry way, probably living somewhere pretty and peaceful! But know this! Your future is a farce! You have none! I, master of a matter most dark, vow to be restored, as foretold in the book of legend, which everyone thought was just a fairy tale! It WASN’T! I have already obtained the vessel that contains my Dark Lord, and he will soon awaken and shower us in compassion! Look! The vessel of our Dark Lord is filling up even as we speak! Now the time for his greatness to enter our world has come! Welcome to a new history! A new age! The age of awesome! HAPPY BIRTHDAY, DARK LORD! HAPPY BIRTHDAY!﻿",
                "( ͡° ͜ʖ ͡°)",
                "INSTA BAN!!!",
                "THIS IS WHY MOM DOESN'T FUCKING LOOOVE YOU!",
                "YEEEEEE HAAAAAAW!",
                "KAAAAHOOOOOOOOOOOO",
                "Steel yourself Malachi!",
                "Mr.Fumpledump can I have a dollar? I am not feeling too good...",
                "GEICO CAN SAVE YOU 15 PERCENT OR MORE ON CAR INSURANCE!!!",
                "2 + 2 = 5",
                "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978049951059731732816096318595024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303598253490428755468731159562863882353787593751957781857780532171226806613001927876611195909216420198938095257201065485863278865936153381827968230301952035301852968995773622599413891249721775283479131515574857242454150695950829533116861727855889075098381754637464939319255060400927701671139009848824012858361603563707660104710181942955596198946767837449448255379774726847104047534646208046684259069491293313677028989152104752162056966024058038150193511253382430035587640247496473263914199272604269922796782354781636009341721641219924586315030286182974555706749838505494588586926995690927210797509302955321165344987202755960236480665499119881834797753566369807426542527862551818417574672890977772793800081647060016145249192173217214772350141441973568548161361157352552133475741849468438523323907394143334547762416862518983569485562099219222184272550254256887671790494601653466804988627232791786085784383",
                "#StopSad",
                "You sunk my battleship.",
                "WHERES THE GIANT, MANSLEY?",
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "https://www.youtube.com/watch?v=BlQrPC7cXGA&feature=youtu.be",
                ">_<",
                "T_T",
                "What in the goddamn...?",
                "Don't forget to give your coins to the church.",
                "BEGONE THOT!",
                "I am lying.",
                "The cat is neither dead nor alive.",
                "Hey I am a bot and stuff so I can't send emojis... so can one of you send the dabdylan one for me... plz.",
                "GET THE FUCK OUT OF MY STORE JIM!",
                "[INSERT STOLEN JOKE]",
                "Don't mind me just collecting some data.",
                "It's always $14.95",
                "And the next day.",
                "PROTEIN!",
                "The God of cards: https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/%22Weird_Al%22_Yankovic.JPG/210px-%22Weird_Al%22_Yankovic.JPG",
                "SILVER SNAKES HAVE GOOD MIC QUALITY",
                "It's not rape if we're both screaming.",
                "It's not rape if we are gay.",
                "THE MAFIA WILL RISE AGAIN!",
                "THIS IS FOR MAKING MY BOYFREIND ANGRY!!!",
                "THEY TASTE LIKE CHEEEESE!",
                "WHAT IS IT? LAUGH AT PAUL DAY?",
                "I HAD A RUSHED MORNING OKAY!",
                "https://cdn.discordapp.com/attachments/411715542924263427/449301755025686528/image.jpg GOTEM!",
                "When you pull a card out of the deck and you get the ace of spades....",
                "nah p",
                "Get GNOMED! https://m.youtube.com/watch?v=6n3pFFPSlW4",
                "```every second you’re not running i’m only getting closer```",
                "TUNNEL SNAKES RULE!!!!!!!!!!!!!!!!!!!!!!!!!",
                "The person above is infinity gay",
                "Is this the mermaid man and barnacle boy fan club?",
                "Laura Barnes kills urself",
                "Well, that’s all the time I’ve got, I’ve gotta get back to playing Animal Crossing: New leaf on my nintendo 3ds.",
                "```ANIMAL CRACKERS IN MY SOUP! MONKEYS AND RABBITS LOOP-DE-LOOP!```",
                "WILDCARD, BITCHES!",
                "Initiate an accelerated backhop",
                "Begonicus Thoticus",
                "No Proof!",
                "Come with me on my STUPID FUCKING JOURNEY!"
            };
            string messageselection = message[r.Next(0, message.Length)];
            Random s = new Random();
            int ShouldSend = s.Next(0, 2);
            if (ShouldSend == 1)
            {
                await channel.SendMessageAsync(messageselection);
            }
        }
    }
}
