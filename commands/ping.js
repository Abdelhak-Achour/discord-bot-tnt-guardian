module.exports = 
{
    name: 'ping',
    description:'usual ping pong command',
    execute(message, args)
    {
        message.channel.send('pong');
    }
}