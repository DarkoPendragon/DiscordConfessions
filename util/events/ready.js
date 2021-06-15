const Discord = require('discord.js');
module.exports = async (client) => {
  console.log(`------------\nReady fired for confession bot\n------------`);
  client.user.setPresence({activity: { name: "your woes | c!help", type: "LISTENING" }});
}
