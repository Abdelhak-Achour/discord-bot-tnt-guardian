const creds = require('./creds');
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

client.on('guildMemberAdd', guildMember =>
{
    if (guildMember.user.bot)
    {
        const botRoleID = guildMember.guild.roles.cache.find(role => role.name === 'Bots').id;
        guildMember.roles.add(botRoleID);
    }
    else
    {
        const memberRoleID = guildMember.guild.roles.cache.find(role => role.name === 'TNT lovers').id;
        guildMember.roles.add(memberRoleID);
        const welcomeEmbed = new Discord.MessageEmbed()
        .setColor('#D82148')
        .setTitle('A new TNT lover joined the server!')
        .setDescription(`${guildMember}, welcome to our server.\n**o(◑ω◐)づ**\nmake sure to read our <#943600351561531542>,\nread <#943602904965722212> for info about our channels\nand please enjoy your stay.`)
        .setImage('https://images-ext-1.discordapp.net/external/Z66q3rXhdUNIFo-3gDOyHUJE0GU0vSQuZt6plRfnKNA/https/cdn-longterm.mee6.xyz/plugins/welcome/images/943595019770691671/fd101b6326c5b8487d49b2c398534f1067783f3287b0371c30070107ea776f95.jpeg')
        .setThumbnail(guildMember.user.displayAvatarURL());
        guildMember.guild.channels.cache.get('943628384938897429').send({embeds: [welcomeEmbed]});
    }
});

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
    else if (command === 'clear')
    {
        client.commands.get(command).execute(message, args);
    }
    else if (command === 'mute')
    {
        client.commands.get(command).execute(message, args);
    }
}
);

client.login(creds.token);