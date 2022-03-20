#Imports
import discord
import json

#Openning & Loading Json Files
with open('botData.json') as f:
    botData = json.load(f)
with open('privateData.json') as f:
    privateData = json.load(f)
with open('colors.json') as f:
    colors = json.load(f)

bot = discord.Client() #Bot Set Up
cmdPrefix = botData['commandPrefix'] #Command Prefix Set Up Which Is $

@bot.event
async def on_ready():
    print('{0.user} is online!'.format(bot))

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return

    if message.content[0] != cmdPrefix: #No Prefix So No Message
        return

    if message.content.lower() == '{0}ping'.format(cmdPrefix): #Converts Message To Lowercase and Checks Command
        await message.channel.send("Pong")
    else:
        await message.channel.send("`Sorry I do not know that command.`")

#Bot Runs With Discord Token
bot.run(privateData['Discord_Token'])