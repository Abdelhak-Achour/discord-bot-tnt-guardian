module.exports =
{
    name: 'kick',
    description: 'tnt kick @user reason_for_kick',
    execute(message, args)
    {
        console.log(message.member.permissions.has('KICK_MEMBERS'));
        console.log(message.author.discriminator);
        console.log(message.author.username);
        if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply('You do not have permission to use that command.');
        if (args.length === 0) return message.reply('Please mention the user u want me to kick.');
        const member = message.guild.members.cache.get(args[0].substring(3, args[0].length - 1)); // this is used to get the user as a GuildMember object
        console.log(args[0].substring(3, args[0].length - 1));
        if (member)
        {
            member
                .kick(args.slice(1, args.length).join(' '))
                .then((member) =>
                {
                    message.reply(`${member} was kicked.`);
                })
                .catch((error) =>
                {
                    message.reply(`Can't kick ${member} for some reason.`);
                });
        }
        else
        {
            message.reply("Couldn't find the mentioned user.");
        }
    }
}

// message.guild.members.kick(args[0].substring(3, args[0].length - 1)).then( )