const { SlashCommandBuilder } = require("discord.js");
const axios = require('axios')
const url = "https://api.jikan.moe/v4"
const {EmbedBuilder} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('airing')
        .setDescription('See all the airing anime'),
    async execute(interaction){
        const anime = []
        await axios.get(`${url}/seasons/now`).then((res)=>{
            //console.log(res.data.data)
            for(x in res.data.data){
                anime.push({
                    title: res.data.data[x].title,
                    url: res.data.data[x].url,
                    thumbnail: res.data.data[x].images.jpg.image_url,
                    description: 'use command for more info on anime',
                    airing: res.data.data[x].aired.string,
                    episodes: res.data.data[x].episodes,
                })
            }
            console.log(anime)

            const exampleEmbed = new EmbedBuilder()
                .setTitle('Anime Airing this season')
            for(x in anime){
                console.log(x)
                exampleEmbed.addFields({name:anime[x].title, value:anime[x].airing})
            }
            interaction.channel.send({embeds: [exampleEmbed]})
        })
    }
}