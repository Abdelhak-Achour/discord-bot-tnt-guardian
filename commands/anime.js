const Jikan = require('jikan-node');
const Discord = require('discord.js');

const mal = new Jikan();

module.exports =
{
    name: 'anime',
    aliases: ['a'],
    description: 'gives info about an anime',
    async execute(message, args)
    {
        const search_results = await mal.search('anime', 'steins;gate');
        //console.log(search_results.results[0]);
        const anime = await mal.findAnime(search_results.results[0].mal_id);
        //console.log(anime);
        let genres = [];
        for (let i=0;i<anime.genres.length;i++)
        {
            genres.push(anime.genres[i].name);
        }
        console.log(genres);
        let studios = [];
        for (let i=0;i<anime.studios.length;i++)
        {
            studios.push(anime.studios[i].name);
        }
        console.log(studios);
        if (genres.includes('Hentai'))
        {
            message.reply("if i got the right ... i think it's a hentai which i can't help you with : )");
        }
        let english_title = '';
        if (anime.title_english != null && anime.title_english != anime.title)
        {
            english_title = anime.title_english;
        }
        let aired = 'not aired';
        if( anime.airing)
        {
            aired = 'aired';
        }
        const info_embed = new Discord.MessageEmbed()
        .setColor('#1C6DD0')
        .setTitle(`${anime.title}: ${english_title}`)
        .setThumbnail(anime.image_url)
        .setDescription(anime.synopsis)
        .addFields(
                {
                    name: ':medal:Score:',
                    value: `${anime.score}`,
                    inline: true
                },
                {
                    name: ':trophy:Rank:',
                    value: `${anime.rank}`,
                    inline: true
                },
                {
                    name: ':bar_chart:Popularity:',
                    value: `${anime.popularity}`,
                    inline: true
                },
                {
                    name: ':dividers:Type:',
                    value: anime.type,
                    inline: true
                },
                {
                    name: ':film_frames:Episodes:',
                    value: `${anime.episodes}`,
                    inline: true
                },
                {
                    name: ':label:Genres',
                    value: genres.join(' '),
                    inline: true
                },
                {
                    name: ':clapper:Status:',
                    value: anime.status,
                    inline: true
                },
                {
                    name: ':satellite_orbital:Aired:',
                    value: aired,
                    inline: true
                },
                {
                    name: ':pencil2:Studio:',
                    value: studios.join(' '),
                    inline: true
                },
                {
                    name: ':stopwatch:Duration:',
                    value: anime.duration,
                    inline: true
                },
                {
                    name: ':bookmark_tabs:Source:',
                    value: anime.source,
                    inline: true
                },
                {
                    name: ':information_source:URL for further info:',
                    value: anime.url,
                    inline: true
                }
        )
        .setFooter({text: 'Info source: MyAnimeList. Visit site for further info.'})
        message.channel.send({embeds: [info_embed]});
    }
}