require('dotenv').config(); // Loads environment variables from a .env file
const { Client, IntentsBitField,} = require('discord.js'); // Imports necessary Discord.js modules 9MessageActionRow, MessageButton )

// Create a new Discord client instance with the specified intents
const client = new Client({ 
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ] });

// Set desired prefix here
const prefix = '!'; 

// Event listener for when the bot is ready
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`); // Logs the bot's username with a message when it's online
});

// Event listener for incoming messages (commands)
client.on('messageCreate', async (message) => {
    // Check if the author of the message is a bot or if the message doesn't start with the defined prefix
    if (message.author.bot || !message.content.toLowerCase().startsWith(prefix)) {
      return; // If true, exit early and ignore the message
    }
  
    // Extract arguments and command from the message content
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
    // Check if the command matches 'ping' (case-insensitive)
    if (command === 'ping') {
      message.reply('I hear you, PONG!'); // If the command is 'ping', reply with 'I hear you, PONG!'
    } else if (command === 'createitem') { // If the command is 'createitem', trigger modal for creating an item
        const row = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId('create_item')
            .setLabel('Create Item')
            .setStyle('PRIMARY')
        );
    
        await message.channel.send({
          content: 'Click the button to create an item!',
          components: [row],
        }).catch(console.error);
      }
    });

// Event listener for interaction (e.g., buttons, modals)
client.on('interactionCreate', async (interaction) => {
    // Check if the interaction is triggered by a button
    if (!interaction.isButton()) return;
  
    // Check if the clicked button has a custom ID named 'create_item'
    if (interaction.customId === 'create_item') {
        // Respond to the interaction by sending a message asking for the item name
        await interaction.reply({
            content: 'Enter item name:',
            ephemeral: true, // Makes the bot's response only visible to the user who clicked the button
        });
        
        // Define a filter to collect messages only from the user who clicked the button
        const filter = (msg) => msg.author.id === interaction.user.id;
        
        // Create a message collector to collect user input (item name)
        const collector = interaction.channel.createMessageCollector({ filter, max: 1 });
        
        // Event listener for when a message is collected
        collector.on('collect', async (msg) => {
            // Get the item name from the collected message
            const itemName = msg.content.trim();
            
            // Handle the received item name (for now, just acknowledging the creation)
            await interaction.followUp(`Item "${itemName}" created!`);
            
            // Stop the message collector to prevent further collection
            collector.stop();
        });
    }
}); 

// Log in to Discord using the bot token from the environment variables
client.login(process.env.TOKEN); // in .env you should have TOKEN = with the token number.