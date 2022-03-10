module.exports =
{
    name: 'meme',
    description: 'tnt meme gets a random meme from a random meme subreddit in reddit',
    async execute(message, rclient, Discord, args)
    {
        const memes_subreddits_list = ["memes", "meme"];
        const post = await rclient.subreddits.getRandomPost(memes_subreddits_list[Math.floor(Math.random()*memes_subreddits_list.length)]);
        do
        {
            const post = await rclient.subreddits.getRandomPost(memes_subreddits_list[Math.floor(Math.random()*memes_subreddits_list.length)]);
        }while ((!(post.url.endsWith(".gif"))) && (!(post.url.endsWith(".jpg"))) && (!(post.url.endsWith(".png"))) && (!(post.url.endsWith(".jpeg"))))
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#F76E11")
        .setTitle(post.title)
        .setImage(post.url)
        .setFooter({text: `Posted by u/${post.author} in r/${post.subreddit}.`});
        message.channel.send({embeds: [newEmbed]});
    }
}

