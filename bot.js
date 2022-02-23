const Discord = require('discord.js');
const fs = require('fs');

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
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const [command, ...args] = message.content.trim().substring(prefix.length).split(/\s+/);
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
}
);

client.login('TOKEN');