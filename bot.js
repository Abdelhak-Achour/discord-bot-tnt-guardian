const creds = require('./creds');
const Discord = require('discord.js');
const fs = require('fs');
const { channel } = require('diagnostics_channel');

const myIntents = new Discord.Intents();
myIntents.add(
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILDS
    );

const client = new Discord.Client({intents: myIntents});


const prefix = 'tnt ';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`); //alt+96 for backquote
    client.commands.set(command.name, command);
}

client.once('ready', () =>
{
    console.log("the_tnt_guardian is online.");
    client.user.setActivity("(tnt )blow em up", {type: "PLAYING"});
}
);

client.on("messageCreate", message =>
{

    if(message.author.bot) return;
    msg = message.content.toLowerCase();
    if (msg === "never gonna")
    {
        message.channel.send("give you up");
    }
    else if (msg === "i need tnt")
    {
        message.channel.send("here take some");
    }
    if(!msg.startsWith(prefix)) return;
    const [command, ...args] = msg.trim().substring(prefix.length).split(/\s+/);
    if (!client.commands.has(command)) return message.reply("I have no such command.");
    if(command === 'ping')
    {
        client.commands.get(command).execute(message, args);
    }
    else if (command === 'youtube')
    {
        client.commands.get(command).execute(message);
    }
    else if (command === 'nimo')
    {
        client.commands.get(command).execute(message);
    }
    else if (command === 'echo')
    {
        client.commands.get(command).execute(message, args);
    }
    else if (command === 'kick')
    {
        client.commands.get(command).execute(message, args);
    }
    else if (command === 'ban')
    {
        client.commands.get(command).execute(message, args);
    }
    else if (command === 'rules')
    {
        client.commands.get(command).execute(message, Discord);
    }
}
);

client.login(creds.token);