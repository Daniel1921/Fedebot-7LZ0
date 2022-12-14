const Discord = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const client = new Discord.Client({intents: 32767});


client.on('ready', () => {

    console.log(`El bot esta listo, su nombre es: ${client.user.tag}`)


// Lista De comandos

    client.application.commands.set([
        {
            name: 'registro',
            description: 'Este comando se utiliza para Registrarse en el discord, debe tener su mismo nick que en Albion',
            options: [
                {
                    type: 3,
                    name: 'user',
                    description: 'El usuario que se desea registrar',
                    required: true
                }
            ]
        }
    ])


});


// 

client.on('interactionCreate', (int) => {

    if(int.isCommand() && int.commandName === 'registro') {

        const usuario = int.options.getString('user')

        axios.get(`https://gameinfo.albiononline.com/api/gameinfo/search?q=${usuario}`)

        .then(function (response) {           
         
            if(response.data.players.length === 0) {

              return  int.reply(` El usuario ${usuario}, No esta escrito correctamente, porfavor vuelve a intentarlo!`);

            } else if(response.data.players[0].GuildName !== 'La Federacion Y' || response.data.players[0].GuildName === '') {

              return  int.reply(` El usuario ${response.data.players[0].Name}, No pertenece a La Federacion Y :cry: , No esperes a unirte con nosotros `);

            }    
            
            int.reply(` El usuario ${usuario}, se ha registrado en el servidor, Bienvenido! :green_heart:  `);

        })


       
        
    }
})




client.login(process.env.TOKEN_DISCORD);

