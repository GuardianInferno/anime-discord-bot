const {REST, Routes} = require('discord.js')
const dotenv = require('dotenv');
dotenv.config()
const clientID = process.env.CLIENTID
const token = process.env.TOKEN
const guildID = process.env.GUILDID
const fs = require('node:fs')

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles){
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
} 

const rest = new REST({version:'10'}).setToken(token);

(async ()=>{
    try{
        console.log(`Started refreshing ${commands.length} application (/) commands.`)
        // test server only
        // const data = rest.put(
        //     Routes.applicationGuildCommands(clientID, guildID),
        //     {body:commands}
        // )

        // all servers
        const data = rest.put(
            Routes.applicationCommands(clientID),
            {body:commands}
        )
        
        console.log(`Sucessfully reloaded ${data.length} application (/) commands.`)
    } catch(error){
        console.error(error)
    }
})()