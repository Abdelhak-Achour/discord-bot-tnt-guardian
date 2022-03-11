module.exports =
{
    name: 'rag',
    description: 'tnt rag gets a random anime or manga gif from a random anime gif subreddit in reddit',
    async execute(message, rclient, Discord)
    {
        const subreddits_list = ["animegif", "animegifs"];
        let post = await rclient.subreddits.getRandomPost(subreddits_list[Math.floor(Math.random()*subreddits_list.length)]);
        do
        {
            post = await rclient.subreddits.getRandomPost(subreddits_list[Math.floor(Math.random()*subreddits_list.length)]);
        }while ((!(post.url.endsWith(".gif"))) && (!(post.url.endsWith(".jpg"))) && (!(post.url.endsWith(".png"))) && (!(post.url.endsWith(".jpeg")) && (!(post.over18))))
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#F76E11")
        .setTitle(post.title)
        .setImage(post.url)
        .setFooter({text: `Posted by u/${post.author} in r/${post.subreddit}.`});
        message.channel.send({embeds: [newEmbed]});
    }
}
