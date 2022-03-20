const Discord = require("discord.js");
const response = require("../responses.json");
const logcommand = require("../logcommand.js");
const color = require("../colors.json");

module.exports.run = async (bot, message, args) => {
  //Logging Command
  logcommand(message, "human");

  //$human
  const randomUser = require('random-user');

  test('Getting a simple user', async () => {
    expect.assertions(6);
    const simpleUser = await randomUser('simple');
    expect(typeof simpleUser).toBe('object');
    expect(simpleUser).toHaveProperty('firstName');
    expect(simpleUser).toHaveProperty('lastName');
    expect(simpleUser).toHaveProperty('email');
    expect(simpleUser).toHaveProperty('username');
    expect(simpleUser).toHaveProperty('password');
  });

  test('Getting a full user', async () => {
    expect.assertions(1);
    const user = await randomUser();
    expect(typeof user).toBe('object');
  });
}

module.exports.help = {
  name: "human",
  aliases: []
}
