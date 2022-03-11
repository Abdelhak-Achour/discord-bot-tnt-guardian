module.exports =
{
    name: 'animeme',
    description: 'tnt animeme gets a random anime meme from a random anime meme subreddit in reddit',
    async execute(message, rclient, Discord)
    {
        const animemes_subreddits_list = ["animememes", "Animemes"];
        let post = await rclient.subreddits.getRandomPost(memes_subreddits_list[Math.floor(Math.random()*animemes_subreddits_list.length)]);
        do
        {
            post = await rclient.subreddits.getRandomPost(memes_subreddits_list[Math.floor(Math.random()*animemes_subreddits_list.length)]);
        }while ((!(post.url.endsWith(".gif"))) && (!(post.url.endsWith(".jpg"))) && (!(post.url.endsWith(".png"))) && (!(post.url.endsWith(".jpeg")) && (!(post.over18))))
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#F76E11")
        .setTitle(post.title)
        .setImage(post.url)
        .setFooter({text: `Posted by u/${post.author} in r/${post.subreddit}.`});
        message.channel.send({embeds: [newEmbed]});
    }
}
