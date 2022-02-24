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
            {name: 'Rule 1:', value: 'Be nice ... <#801455167056510976>'},
            {name: 'Rule 2:', value: 'a3mel 3a9lek'}
        )
        message.channel.send({embeds: [newEmbed]});
    }
}
// testing embeds for rules command ... not finished yet.