const Jikan = require('jikan-node');
const Discord = require('discord.js');

const mal = new Jikan();

module.exports =
{
    name: 'manga',
    aliases: ['m'],
    description: 'gives info about a manga',
    async execute(message, args)
    {
        if (args.length === 0) return message.reply('Please give a manga title to look up.');
        const search_results = await mal.search('manga', args.join(' '));
        const manga = await mal.findManga(search_results.results[0].mal_id);
        let genres = [];
        for (let i=0;i<manga.genres.length;i++)
        {
            genres.push(manga.genres[i].name);
        }
        let authors = [];
        for (let i=0;i<manga.authors.length;i++)
        {
            authors.push(manga.authors[i].name);
        }
        if (genres.includes('Hentai'))
        {
            message.reply("if i got the right manga ... i think it's a hentai which i can't help you with : )");
            return;
        }
        let english_title = '';
        if (manga.title_english != null && manga.title_english != manga.title)
        {
            english_title = manga.title_english;
        }
        const info_embed = new Discord.MessageEmbed()
        .setColor('#1C6DD0')
        .setTitle(`${manga.title}: ${english_title}`)
        .setThumbnail(manga.image_url)
        .setDescription(manga.synopsis)
        .addFields(
                {
                    name: ':medal:Score:',
                    value: `${manga.score}`,
                    inline: true
                },
                {
                    name: ':trophy:Rank:',
                    value: `${manga.rank}`,
                    inline: true
                },
                {
                    name: ':bar_chart:Popularity:',
                    value: `${manga.popularity}`,
                    inline: true
                },
                {
                    name: ':dividers:Type:',
                    value: manga.type,
                    inline: true
                },
                {
                    name: ':film_frames:Volumes:',
                    value: `${manga.volumes}`,
                    inline: true
                },
                {
                    name: ':film_frames:Chapters:',
                    value: `${manga.chapters}`,
                    inline: true
                },
                {
                    name: ':label:Genres:',
                    value: genres.join(', '),
                    inline: true
                },
                {
                    name: ':clapper:Status:',
                    value: manga.status,
                    inline: true
                },
                {
                    name: ':satellite_orbital:Published:',
                    value: manga.published.string,
                    inline: true
                },
                {
                    name: ':pencil2:Authors:',
                    value: authors.join(' '),
                    inline: true
                },
                {
                    name: ':information_source:URL for further info:',
                    value: manga.url,
                    inline: true
                }
        )
        .setFooter({text: 'Info source: MyAnimeList. Visit site for further info.'})
        message.channel.send({embeds: [info_embed]});
    }
}