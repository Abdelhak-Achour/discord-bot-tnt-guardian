const Discord = require('discord.js');
const fs = require('fs');
const snoots = require('snoots');
require('dotenv').config();

const myIntents = new Discord.Intents();
myIntents.add
(
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILDS
);

const client = new Discord.Client({intents: myIntents});

const rclient = new snoots.Client
(
    {
        userAgent: process.env.TTG_REDDIT_USERAGENT,
        creds:
        {
            clientId: process.env.TTG_REDDIT_CLIENT_ID,
            clientSecret: process.env.TTG_REDDIT_CLIENT_SECRET,
        },
    }
);

const prefix = 'tnt ';

let automod = true;

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
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

client.on('guildMemberRemove', guildMember =>
{
    try
    {
        if (guildMember.user.bot) return;
    guildMember.guild.channels.cache.get('943934793907843102').send(`૮₍ ˃ ⤙ ˂ ₎ა\n./づ︻┻┳══━一             **${guildMember.user.tag}** left the server.`);
    }
    catch(error)
    {
        console.log(error);
    }
});

client.on("messageCreate", message =>
{
    try
    {
        let warn = false;
        if(message.author.bot) return;
        msg = message.content.toLowerCase();
        if ((message.author.id === process.env.KYOMA_DISCORD_ID || message.author.id === process.env.HASHIRA_DISCORD_ID || message.author.id === process.env.MR_DEVIL_TNT_DISCORD_ID) && msg === 'turn automod on/off')
        {
            automod = !automod;
            message.reply('automod turned on');
            return;
        }
        if (msg === "never gonna")
        {
            message.channel.send("give you up");
            return;
        }
        else if (msg === "i need tnt")
        {
            message.channel.send("here take some");
            return;
        }
        else if (!msg.startsWith(prefix) && automod && (message.author.id === process.env.KYOMA_DISCORD_ID || message.author.id === process.env.MR_DEVIL_TNT_DISCORD_ID || message.author.id === process.env.HASHIRA_DISCORD_ID))
        {
            // detection code
            fs.readFileSync('nsfw.json', (error, data) =>
            {
                let nsfw = JSON.parse(data);
                
            });
            try
            {
                let nsfw = JSON.parse(fs.readFileSync('nsfw.json'));
                for (let word of nsfw.notAllowedWords)
                {
                    if (msg.includes(word))
                    {
                        warn = true;
                        break;
                    }
                }
            }
            catch
            {
                console.log("error reading file.");
            }
            // action code
            if (warn)
            {
                let memberRolesIDsList = [];
                let timer = "0s";
                fs.readFile('warns.json', (error, data) =>
                {
                    let warns = JSON.parse(data);
                    if (message.author.id in warns.id)
                    {
                        warns.id[message.author.id]++;
                        if (warns.id[message.author.id] >= 2 && warns.id[message.author.id] < 7)
                        {
                            message.delete().then(message.channel.send(`${message.member} warned and muted.`)).catch();
                            const mutedID = message.guild.roles.cache.find(role => role.name === 'muted').id;
                            for (let x = 0;x<message.member.roles.cache.size-1;x++)
                            {
                                memberRolesIDsList.push(message.member.roles.cache.at(x).id);
                            }
                            for (let y = 0;y<message.member.roles.cache.size-1;y++)
                            {
                                message.member.roles.remove(message.member.roles.cache.at(y).id);
                            }
                            message.member.roles.add(mutedID);
                            fs.writeFile("warns.json", JSON.stringify(warns), function(error, result){if (error){console.log(error);}});
                            const timers = ["5m", "30m", "3h", "24h", "7d"];
                            timer = timers[warns.id[message.author.id]-2];
                        }
                        else if (warns.id[message.author.id] >= 7)
                        {
                            message.delete().then(message.guild.members.ban(message.author.id)).catch();
                            warns.id[message.author.id] = 0;
                            fs.writeFile("warns.json", JSON.stringify(warns), function(error, result){if (error){console.log(error);}});
                        }
                    }
                    else
                    {
                        warns.id[message.author.id] = 1;
                        message.delete().then(message.channel.send(`${message.member} warned.`)).catch();
                        fs.writeFile("warns.json", JSON.stringify(warns), function(error, result){if (error){console.log(error);}});
                    } // test it on other users cuz it can't mute u
                });
                if (!(timer === "0s"))
                {
                    setTimeout(function()
                    {
                        message.member.roles.remove(mutedID);
                        for (let z = 0;z<memberRolesIDsList.length;z++)
                        {
                            message.member.roles.add(memberRolesIDsList[z]);
                        }
                    }, ms(timer)
                    );
                }
            }
            return;
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
        else if (command === 'meme')
        {
            client.commands.get(command).execute(message, rclient, Discord);
        }
        else if (command === 'animeme')
        {
            client.commands.get(command).execute(message, rclient, Discord);
        }
        else if (command === 'animeirl')
        {
            client.commands.get(command).execute(message, rclient, Discord);
        }
        else if (command === 'ras')
        {
            client.commands.get(command).execute(message, rclient, Discord);
        }
    }
    catch (error)
    {
        console.log(error);
    }
}
);

client.login(process.env.TTG_BOT_TOKEN);