exports.run = async (client, msg, args) => {
  const mem = await client.getMember(msg.guild.id, msg.author.id)
  console.log(mem)
  if (mem.hasPermission("MANAGE_CHANNELS")) {
    let boothChannel = msg.guild.channels.cache.filter(c => c.name.toLowerCase() == "confession booth" && c.type == "category");
    if (boothChannel.size > 0) return msg.reply("a category named Confession Booth already exists.");;
    let r = msg.guild.roles.resolve(msg.guild.roles.cache.get(msg.guild.id));
    msg.guild.channels.create(`Confession Booth`, {type: "category"}).then((ch) => {
      let confessChannel = msg.guild.channels.cache.filter(c => c.name.toLowerCase() == "confessions" && c.type == "text");
      if (confessChannel.size > 0) return msg.reply("a textchannel named confessions already exists. The bot should work now, if it doesn't contact Darko Pendragon#3219 or try giving the bot Admin permissions (should get around setting permissions errors).");
      msg.guild.channels.create(`confessions`, {type: "text",topic:"Say \`open confession\` to make your own channel."}).then((chan) => {
        chan.setParent(ch.id, false).then((c) => {
          c.updateOverwrite(r.id, {SEND_MESSAGES: false}).catch((e) => msg.author.send(`An error occured:\n\`\`\`\nSET_CHANNEL_OVERWRITES: ${e && e.message ? e.message : e}\n\`\`\``));
          msg.author.send("The bot should work now, if it doesn't contact Darko Pendragon#3219.")
        }).catch((e) => msg.author.send(`An error occured:\n\`\`\`\nSET_PARENT: ${e && e.message ? e.message : e}\n\`\`\``));
      }).catch((e) => msg.author.send(`An error occured:\n\`\`\`\nCREATE_CHANNEL: ${e && e.message ? e.message : e}\n\`\`\``));
    }).catch((e) => msg.author.send(`An error occured:\n\`\`\`\nCREATE_CATEGORY: ${e && e.message ? e.message : e}\n\`\`\``));
  } else {
    return msg.author.send("I lack the Manage Channels permission. You may still make the channels yourself.\nA category channel named \`Confession Booth\`, and a channel under that called \`confessions\` must be present for this bot to work.")
  }
};

exports.conf = {
  enabled: true,
  serverOnly: false,
  allowedServers: [],
  aliases: [],
  permLevel: 3
};

exports.help = {
  type: 'utility',
  name: 'start',
  requireLog: false,
  description: 'Creates a confession booth category, confessions channel, and (should) set permissions for those two channels. If anything goes wrong give the bot admin permissions.',
  usage: 'start'
};
