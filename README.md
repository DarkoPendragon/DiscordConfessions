# DiscordConfessions
This is a old Discord.js bot made awhile back. It allows users to "confess" things without other users (mostly) knowing. A lot of useless things have been removed from it but it runs the same.  
  
# How it Runs
Confessions will look for a channel starting with `confess-` (the rest will be a user ID) and send whatever message there to the channel named `confessions`. Users can use the `c!open` command to create their confessions channel (it will be perm-locked to them). Messages in the `confess-` channels will be deleted upon sending. That's pretty much it.

# Quick Setup
Confessions has a command to auto-create a category and channel for it to use. Using `c!start` will do so.

# SideNote
I did plan to make it where you could DM the bot your confession and then select the server to send it to, but I never did. If you send a message to your channel then anyone with the Administrator permission can also see it and will be able to tell when you send messages from said channel. If I get bored enough I'll add the DM feature. And yes, I am aware this could be a *loooot* better.
