const Discord = require('discord.js');
module.exports = (client, msg) => {
    if (msg.author.bot || msg.system) return;

    if (msg.channel.name.startsWith("confess-")) {
        let cnt = msg.content.toLowerCase()
        let confessChan = msg.guild.channels.cache.filter(c => c.name.toLowerCase() == "confessions" && c.type == "text");
        if (!confessChan.size > 0) return msg.channel.send("The Confessions category doesn't exist, I need one to do my work.\nSomeone with admin permissions needs to say \`start confession\` or someone with channel making permissions needs to make the channel.");
        msg.delete();
        if (!cnt || typeof cnt !== "string") return msg.channel.send("You must give text to send to the confessions channel (images will not send unless they're a link).");
        return confessChan.first().send(cnt).catch(console.log)
    }

    if (msg.content.startsWith("c!")) {
        let prefix = "c!";
        const args = msg.content.split(' ').slice(2);
        const command = msg.content.substring(prefix.length).split(/[ \n]/)[0].trim()
        const perms = client.elevation(msg);
        let cmd;
        if (client.commands.has(command)) {
            cmd = client.commands.get(command);
        } else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command));
        }
        if (cmd) {
            var flags = [];
            while (args[0] && args[0][0] === "-") {
                flags.push(args.shift().slice(1));
            }
            if (cmd.conf.serverOnly && !cmd.conf.allowedServers.includes(msg.guild.id)) return;
            if (perms < cmd.conf.permLevel) return;
            try {
                cmd.run(client, msg, args, perms, flags);
            } catch (e) {
                console.log(e);
            };
        };
    }
}