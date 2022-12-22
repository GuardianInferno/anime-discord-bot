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
                const exampleEmbed = new EmbedBuilder()
                    .setTitle(res.data.data[x].title)
                    .setURL(res.data.data[x].url)
                    .setThumbnail(res.data.data[x].images.jpg.image_url)
                    .setDescription('use command for more info on anime')
                interaction.channel.send({embeds: [exampleEmbed]})
            }
        })
        console.log(anime)
    }
}