module.exports =
{
    name: 'ban',
    description: 'tnt ban @user reason_for_ban',
    execute(message, args)
    {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply('You do not have permission to use that command.');
        if (args.length === 0) return message.reply('Please mention the user u want me to ban.');
        const member = message.guild.members.cache.get(args[0].substring(3, args[0].length - 1)); // this is used to get the user as a GuildMember object
        const username = member.user.username;
        const discriminator = member.user.discriminator;
        if(member)
        {
            try
            {
                message.guild.members.ban(args[0].substring(3, args[0].length - 1));
                message.reply(`${username}#${discriminator} was banned.`);
            }
            catch (error)
            {
                console.log(error);
                message.reply(`${username}#${discriminator} was not banned.\nmaybe you can't ban that user.`);
            }
        }
        else
        {
            message.reply("Couldn't find the mentioned user.");
        }
    }
}