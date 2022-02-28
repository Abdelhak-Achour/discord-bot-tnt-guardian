module.exports =
{
    name: 'rules',
    description: 'gives server rules in short and rules channel.',
    execute (message, Discord)
    {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#D82148')
        .setTitle('Rules')
        .addFields(
            {name: 'All rules in:', value: '<#943600351561531542>'}
        )
        message.channel.send({embeds: [newEmbed]});
    }
}
// testing embeds for rules command ... not finished yet.