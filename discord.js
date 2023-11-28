require('dotenv').config(); // Loads environment variables from a .env file
const { Client, IntentsBitField } = require('discord.js'); // Imports necessary Discord.js modules

// Create a new Discord client instance
const client = new Client({
    //Specific intents we want to be avail
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates, // Make sure to add VoiceStates intent if you're using voiceStateUpdate
    ]
})

// Set desired prefix here
const prefix = '!'; 

// Event listener for when the bot is ready
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`); // Logs the bot's username with a message when it's online
});

// Event listener for incoming messages(ping response)
client.on('messageCreate', (message) => {
    // Check if the author of the message is a bot or if the message doesn't start with the defined prefix
    if (message.author.bot || !message.content.toLowerCase().startsWith(prefix)) {
        return; // If true, exit early and ignore the message
    }

    // Extract arguments and command from the message content
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Check if the command matches 'ping' (case-insensitive)
    if (command === 'ping') {
        // If the command is 'ping', reply with 'I hear you, PONG!'
        message.reply('I hear you, PONG!');
    }
});

// Log in to Discord using the bot token from the environment variables
client.login(process.env.TOKEN); // in .env you should have TOKEN = with the token number.