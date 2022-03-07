module.exports =
{
    name: 'echo',
    description: 'outputs the args in an arrays of the command as a reply.',
    execute(message, args)
    {
        message.reply(args.join(' '));
        console.log(args);
        console.log(message.author.id);
        console.log(typeof message.author.id);
    }
}