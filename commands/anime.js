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
        if (args.length === 0) return message.reply('Please give an anime title to look up.');
        const search_results = await mal.search('anime', args.join(' '));
        const anime = await mal.findAnime(search_results.results[0].mal_id);
        let genres = [];
        for (let i=0;i<anime.genres.length;i++)
        {
            genres.push(anime.genres[i].name);
        }
        let studios = [];
        for (let i=0;i<anime.studios.length;i++)
        {
            studios.push(anime.studios[i].name);
        }
        if (genres.includes('Hentai'))
        {
            message.reply("if i got the right ... i think it's a hentai which i can't help you with : )");
            return;
        }
        let english_title = '';
        if (anime.title_english != null && anime.title_english != anime.title)
        {
            english_title = anime.title_english;
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
                    name: ':label:Genres:',
                    value: genres.join(', '),
                    inline: true
                },
                {
                    name: ':clapper:Status:',
                    value: anime.status,
                    inline: true
                },
                {
                    name: ':satellite_orbital:Aired:',
                    value: anime.aired.string,
                    inline: true
                },
                {
                    name: ':pencil2:Studio:',
                    value: studios.join(', '),
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
