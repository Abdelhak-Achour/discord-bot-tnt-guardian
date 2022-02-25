module.exports =
{
    name: 'clear',
    description: 'tnt clear amount_of_msgs ... to clear a certin amount messages in a channel',
    async execute(message, args)
    {
        if (!args[0]) return message.reply('You must specify the amount of messages to delete.');
        if (args[0] === 'evil') return message.reply('thass kinda too much for me to do but ill try.');
        if (isNaN(args[0])) return message.reply('Please give a number not a something else.');
        if (args[0] > 50) return message.reply('You cannot delete more than 50 messages at a time.');
        if (args[0] < 1) return message.reply('The number of messages to delete must be greater than 0.');   
        await message.channel.messages.fetch({limit: args[0]}).then(messages =>
            {
                message.channel.bulkDelete(messages);
            });
    }
}