import discord
import random
import re
import markovify
import textwrap
r = random
f = open("corpus.txt", "a+")
client = discord.Client()
token = "PUT YOUR DISCORD APP TOKEN HERE"

async def addentry(message):
	f.write(message.content + "\n")
	f.flush()
async def get_markov(message):
	f.seek(0)
	string = f.read()
	#replace 'string' with the optimized thing to work and then comment out the two lines above
	markov = markovify.NewlineText(string)
	try:
		markovd_final = markov.make_short_sentence(1999)
	except:
		return ("Error generating message <3 (dink is cool)")
	if (markovd_final is "None."):
		return("Error generating message <3 (dink is cool)")
	return str(markovd_final)
async def shitposter(message):
	f2.seek(0)
	string2 = f2.read()
	markov2 = markovify.Text(string2)
	markovd_final2 = markov2.make_short_sentence(1999)
	i = 0
	while i < 11:
		string = await get_markov(message)
		print(string)
		print("trying")
		if not (string is "None"):
			#string = string.format(message)
			await client.send_message(message.channel, string)
			return 1
		else:
			print(i)
			print("trying again")
			i = i + 1
	await client.send_message(message.channel, "I couldn't find a suitable message.")
async def markov(message):
	i = 0
	while i < 11:
		string = await get_markov(message)
		string = str(string)
		string += "."
		print(string)
		print("trying")
		if not (string is "None."):
			#string = string.format(message)
			await client.send_message(message.channel, string)
			return 1
		else:
			print(i)
			print("trying again")
			i = i + 1
			await client.send_message(message.channel, "I couldn't find a suitable message.")





@client.event
async def on_message(message):
	# runs when we see a message
	if message.content.startswith("!bmarkov"):
		await shitposter(message)
	if message.content.startswith("!markov"):
		await markov(message)

        # add the message to our corpus
	await addentry(message)

# not sure why this is commented out
#client.login(token)
print("logged in!")
client.run(token)
