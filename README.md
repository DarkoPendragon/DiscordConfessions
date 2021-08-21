# DiscordConfessions
This is a old Discord.js bot made awhile back. It allows users to "confess" things without other users (mostly) knowing. A lot of useless things have been removed from it but it runs the same.  
  
# How it Runs
Confessions will look for a channel starting with `confess-` (the rest will be a user ID) and send whatever message there to the channel named `confessions`. Users can use the `c!open` command to create their confessions channel (it will be perm-locked to them). Messages in the `confess-` channels will be deleted upon sending. That's pretty much it. You may also DM the bot a confession and it will send your confession to the main server.

# Quick Setup
Confessions has a command to auto-create a category and channel for it to use. Using `c!start` will do so.  
On the script side, you need to replace `client.login("BOT TOKEN");` with your bots application token, and `this.runningGuild = "MAIN SERVER ID";` with your servers ID.