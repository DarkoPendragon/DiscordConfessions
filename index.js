const Discord = require('discord.js')
const klaw = require('klaw')
const path = require("path");
class Confessions extends Discord.Client {
    constructor(options) {
        super(options);
        this.confessionBot = true;
        this.commands = new Map();
        this.aliases = new Map();
        this.web_port = process.env.PORT;
        this.wait = require("util").promisify(setTimeout);
        this.runningGuild = "MAIN SERVER ID"; // replace this
    }

    async sendConfession(msg) {
        if (!msg.content || msg.content.length == 0) return false;
        let guild = await this.getGuild(this.runningGuild)
        let confchan = guild.channels.cache.filter(c => c.name.toLowerCase() == "confessions" && c.type == "text").first()
        if (!confchan) return false;
        confchan.send(msg.content).then(m => {
            msg.react("✅").catch(console.log)
        })
    }

    async getGuild(id) {
        return new Promise(async (resolve, reject) => {
            if (this.guilds.cache.has(id)) resolve(this.guilds.cache.get(id))
            else {
                const guild = await this.guilds.fetch(id, true, true)
                resolve(guild)
            }
        })
    }

    async getMember(gid, mid) {
        return new Promise(async (resolve, reject) => {
            const guild = await this.getGuild(gid)
            if (guild.members.cache.has(mid)) resolve(guild.members.cache.get(mid))
            else {
                const member = await guild.members.fetch({ user: mid, force: true, cache: true })
                resolve(member)
            }
        })
    }

    elevation(message) {
        if (message.channel.type === 'dm') return 4;
        let permlvl = 0;

        if (message.member.permissions.has("KICK_MEMBERS")) permlvl = 1;
        if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
        if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;
        if (message.member.id === message.member.guild.ownerID) permlvl = 4;
        return permlvl;
    }
}

const client = new Confessions({
    messageCacheMaxSize: 450,
    disabledEvents: ['TYPING_START']
})
require('./util/utils')(client);

async function init() {
    //===========================================================================
    // Confession
    //===========================================================================
    klaw("./commands").on("data", (item) => {
        const cmdFile = path.parse(item.path);
        if (!cmdFile.ext || cmdFile.ext !== ".js") return;
        try {
            let props = require(`${cmdFile.dir}${path.sep}${cmdFile.name}${cmdFile.ext}`)
            console.log(`[C] Loading Command: ${props.help.name}${" ".repeat(25 - props.help.name.length)}♥`);
            client.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name);
            });
        } catch (e) {
            return console.log(new Error(`FAIL: ${cmdFile.name}: ${e.stack}`));
        };
    });

    klaw("./util/events").on("data", (item) => {
        const evtFile = path.parse(item.path)
        try {
            if (!evtFile.ext || evtFile.ext !== ".js") return
            console.log(`[C] Loading Event: ${evtFile.base}${" ".repeat(27 - evtFile.base.length)}♥`);
            const event = require(`./util/events/${evtFile.name}${evtFile.ext}`)
            client.on(evtFile.name, event.bind(null, client))
        } catch (e) {
            console.log(new Error(`EVENT_FAIL: ${evtFile.name}: ${e.stack}`))
        }
    });

    client.login("BOT TOKEN"); // replace this
};
init();