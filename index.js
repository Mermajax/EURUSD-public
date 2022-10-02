// Require the necessary discord.js classes and bot functions
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const config = require('./config.json')
const mongoose = require('mongoose')
const { setNick } = require('./updateNick.js')

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    mongoose.connect(config.mongoURL, {
        useUnifiedTopology: true
    })
    setNick(client)
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);