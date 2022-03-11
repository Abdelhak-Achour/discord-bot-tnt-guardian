module.exports =
{
    name: 'ras',
    description: 'tnt ras gets a random anime screenshot from random_anime_screenshot subreddit in reddit',
    async execute(message, rclient, Discord)
    {
        const subreddits_list = ["animenocontext", "animescreenshots"];
        const post = await rclient.subreddits.getRandomPost(subreddits_list[Math.floor(Math.random()*subreddits_list.length)]);
        do
        {
            const post = await rclient.subreddits.getRandomPost(subreddits_list[Math.floor(Math.random()*subreddits_list.length)]);
        }while ((!(post.url.endsWith(".gif"))) && (!(post.url.endsWith(".jpg"))) && (!(post.url.endsWith(".png"))) && (!(post.url.endsWith(".jpeg")) && (!(post.over18))))
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#F76E11")
        .setTitle(post.title)
        .setImage(post.url)
        .setFooter({text: `Posted by u/${post.author} in r/${post.subreddit}.`});
        message.channel.send({embeds: [newEmbed]});
    }
}
