const Discord = require('discord.js');
exports.run = async (client, message, args, perms, flags) => {
  if (!args[0]) {
    const perms = client.elevation(message);
    const hex = client.ranHex();
    var cats = new Map();
    client.commands.forEach(c => {
      if (c.conf.enabled == true && perms >= c.conf.permLevel) {
        let n = c.help.type.toProperCase(c.help.type);
        if (!cats.has(n)) {
          cats.set(n, {
            name: n,
            array: []
          });
        };
        cats.get(n).array.push(c.help.name);
      }
    });

    var embed = new Discord.MessageEmbed();
    embed.setTitle(`Commands Info`)
    embed.setDescription(`Use \`c!help commandname\` to view help on a command. You have **class ${perms}** access. Use \`c!start\` (must be admin) to open your confession booth. Use \`c!open\` to make your own secret confession channel.`)
    embed.setAuthor('Confessions')
    cats.forEach(cat => {
      embed.addField(cat.name, cat.array.join(", "));
    });
    embed.setColor(hex)
    embed.setTimestamp()
    embed.setThumbnail(client.user.avatarURL());
    embed.setFooter(`Made by ${client.users.cache.get("693300262672138290").tag}`, client.users.cache.get("693300262672138290").avatarURL());
    if (flags.includes("c")) {
      message.channel.send({
        embed
      }).catch(() => {
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`Commands Info`)
        embed.setDescription(`Use \`c!help commandname\` to view help on a command. You have **class ${perms}** access. Use \`c!start\` (must be admin) to open your confession booth. Use \`c!open\` to make your own secret confession channel.`)
        embed.setAuthor('Confessions')
        cats.forEach(cat => {
          embed.addField(cat.name, cat.array.join(", "));
        });
        embed.setColor(hex)
        embed.setTimestamp()
        embed.setThumbnail(client.user.avatarURL())
        embed.setFooter(`Made by ${client.users.cache.get("693300262672138290").tag}`, client.users.cache.get("693300262672138290").avatarURL());
        return message.channel.send({
          embed
        }).catch(console.error);
      });
    } else {
      message.author.send({
        embed
      }).catch(() => {
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`Commands Info`)
        embed.setDescription(`Use \`c!help commandname\` to view help on a command. You have **class ${perms}** access. Use \`c!start\` (must be admin) to open your confession booth. Use \`c!open\` to make your own secret confession channel.`)
        embed.setAuthor('Confessions')
        cats.forEach(cat => {
          embed.addField(cat.name, cat.array.join(", "));
        });
        embed.setColor(hex)
        embed.setTimestamp()
        embed.setThumbnail(client.user.avatarURL())
        embed.setFooter(`Made by ${client.users.cache.get("693300262672138290").tag}`, client.users.cache.get("693300262672138290").avatarURL());
        return message.channel.send({
          embed
        }).catch(console.error);
      });
    }
  } else {
    let command = args.slice(0).join(' ');
    if (client.commands.has(command)) {
      let perms = client.elevation(message);
      command = client.commands.get(command);
      if (perms < command.conf.permLevel) return;
      if (command.conf.serverOnly && !command.conf.allowedServers.includes(message.guild.id)) return;

      const embed = new Discord.MessageEmbed();
      embed.setAuthor(`${command.help.name}`)
      embed.setDescription(`${command.help.description}`)
      embed.setColor(0x610161)
      embed.setTimestamp()
      embed.addField('Usage:', `c!${command.help.usage}`)
      if (command.conf.aliases.length > 0) embed.addField('Aliases:', `${command.conf.aliases.join(", ")}`, true)
      if (command.help.requireLog) embed.addField(`Requires Logging:`, `true`, true)
      embed.setThumbnail(client.user.avatarURL())
      embed.setFooter(`Made by ${client.users.cache.get("693300262672138290").tag}`, client.users.cache.get("693300262672138290").avatarURL());
      return message.channel.send({
        embed
      }).catch(console.error);
    } else {
      message.reply(`please give me a valid command.`);
    }
  };
};

exports.conf = {
  enabled: true,
  serverOnly: false,
  allowedServers: [],
  aliases: ['h', 'halp', 'commands', 'cmds'],
  permLevel: 0
};

exports.help = {
  type: 'utility',
  name: 'help',
  requireLog: false,
  description: 'Displays all the available commands for your access level or displays help for a command.',
  usage: 'help [command]'
};
