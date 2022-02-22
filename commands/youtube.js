const { Channel } = require("discord.js")

module.exports =
{
    name: 'youtube',
    description: 'give the YouTube channel link of Mr Devil TNT',
    execute(message)
    {
        message.channel.send("YouTube coming soon.");
    }
}