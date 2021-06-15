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
    }


    ranHex(dontReplace) {
        var random = Math.random();
        var exponent = --random.toExponential().split('-')[1];
        random *= Math.pow(10, exponent);
        if (dontReplace) return '#' + (~~(random * (1 << 24))).toString(16);
        if (!dontReplace) return '0x' + (~~(random * (1 << 24))).toString(16);
    }

    ranInt() {
        let r = parseInt(Math.floor((Math.random() * 255) + 1));
        let g = parseInt(Math.floor((Math.random() * 255) + 1));
        let b = parseInt(Math.floor((Math.random() * 255) + 1));
        return r << 16 | g << 8 | b;
    }

    elevation(message) {
        if (message.channel.type === 'dm') return 4;
        let permlvl = 0;

        if (message.member.permissions.has("KICK_MEMBERS")) permlvl = 1;
        if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
        if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;
        if (message.member.id === message.member.guild.ownerID) permlvl = 4;
        if (client.info.bot.creators.includes(message.author.id)) permlvl = 5;
        return permlvl;
    }
}

const client = new Confessions({
    messageCacheMaxSize: 450,
    disabledEvents: ['TYPING_START']
})
require('./util/utils')(client);

const init = async () => {
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

    client.login("your bot token goes here");
};
init();