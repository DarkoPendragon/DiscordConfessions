exports.run = async (client, msg, args) => {
  let boothChannel = msg.guild.channels.cache.filter(c => c.name.toLowerCase() == "confession booth" && c.type == "category");
  if (!boothChannel.size > 0) return msg.channel.send("The Confession Booth category doesn't exist, I need one to do my work.\nSomeone with admin permissions needs to say \`start confession\` or someone with channel making permissions needs to make the channel.");

  if (msg.guild.channels.cache.has(`confess-${msg.author.id}`)) {
    let c = msg.guild.channels.cache.get(`confess-${msg.author.id}`);
    c.updateOverwrite(msg.author.id, {VIEW_CHANNEL: true}).catch(console.log);
    c.send(`<@${msg.author.id}>, your channel already exists.`);
  } else {
    let r = msg.guild.roles.resolve(msg.guild.roles.cache.get(msg.guild.id));
    msg.guild.channels.create(`confess-${msg.author.id}`, {
      type: "text",
      topic: "Your own personal channel to rant about anything.",
      permissionOverwrites: [
        {id: r, deny: ["VIEW_CHANNEL"]},
        {id: msg.author.id, allow: ["VIEW_CHANNEL"]}
      ]
    }).then(chan => {
      setTimeout(() => {
        chan.setParent(boothChannel.first().id, false).then(() => {
          chan.updateOverwrite(r.id, {VIEW_CHANNEL: false, SEND_MESSAGES: false}).then(() => {
            chan.updateOverwrite(msg.author.id, {VIEW_CHANNEL: true, SEND_MESSAGES: true}).then(() => {
              chan.send(`Here is your personal confession/ranting channel. Messages sent here will be deleted and sent to Confession Booth (<#${boothChannel.first().id}>). No one will know you sent them~`);
            }).catch((e) => msg.author.send(`An error occured:\n\`\`\`\nSET_CHANNEL_OVERWRITES: ${e && e.message ? e.message : e}\n\`\`\``));
          }).catch((e) => msg.author.send(`An error occured:\n\`\`\`\nSET_CHANNEL_OVERWRITES: ${e && e.message ? e.message : e}\n\`\`\``));
        }).catch((e) => msg.author.send(`An error occured:\n\`\`\`\nCREATE_CHANNEL: ${e && e.message ? e.message : e}\n\`\`\``));
      }, 1000) // I dont know why but this fixed something
    }).catch(e => {
      console.log(e);
      msg.author.send(`Something went wrong making your channel, you can try to ask Darko Pendragon#3219 to fix it. Error:\n\`\`\`\n${e && e.message ? e.message : e}\n\`\`\``);
    });
  }
};
exports.conf = {
  enabled: true,
  serverOnly: false,
  allowedServers: [],
  aliases: [],
  permLevel: 0
};

exports.help = {
  type: 'utility',
  name: 'open',
  requireLog: false,
  description: 'Opens your own confession channel within a server.',
  usage: 'open'
};
