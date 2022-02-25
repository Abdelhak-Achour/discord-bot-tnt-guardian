const ms = require('ms');

module.exports =
{
    name: 'mute',
    description: 'tnt mute @mention amount_of_time ... to mute a member for a certain amount of time given like 10s or 10m or 10h or 10d.',
    execute(message, args)
    {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply('You do not have permission to use that command.');
        if (!args[0]) return message.reply('Please mention a user.');
        const target = message.mentions.users.first(); // getting the target user as a user object
        if (!target) return message.reply("Couldn't find that member."); // if target user not found then return
        const tid = target.id; // id of the target user to mute
        let member = message.guild.members.cache.get(tid); // getting the target user as a member object
        const mutedID = message.guild.roles.cache.find(role => role.name === 'muted').id; // get the muted role id ... it won't work if the muted role doesn't exist in the server
        let memberRolesIDsList = [];
        for (let x = 0;x<member.roles.cache.size-1;x++)
        {
            memberRolesIDsList.push(member.roles.cache.at(x).id);
        }
        if (args[1])
        {
            if (!isNaN(args[1].slice(0, -1)) && (args[1].endsWith("s") || args[1].endsWith("m") || args[1].endsWith("h") || args[1].endsWith("d")))
            {
                for (let y = 0;y<member.roles.cache.size-1;y++)
                {
                    member.roles.remove(member.roles.cache.at(y).id);
                }
                member.roles.add(mutedID);
                message.channel.send(`<@${member.user.id}> has been muted.`);
                setTimeout(function()
                {
                    member.roles.remove(mutedID);
                    for (let z = 0;z<memberRolesIDsList.length;z++)
                    {
                        member.roles.add(memberRolesIDsList[z]);
                    }
                }, ms(args[1]));
            }
            else
            {
                message.reply('Please provide a valid duration and a correct syntax.');
            }
        }
        else
        {
            for (let y = 0;y<member.roles.cache.size-1;y++)
                {
                    member.roles.remove(member.roles.cache.at(y).id);
                }
                member.roles.add(mutedID);
                message.channel.send(`<@${member.user.id}> has been muted.`);
        }
    }
}