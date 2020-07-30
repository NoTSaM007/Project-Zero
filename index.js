const { CommandoClient } = require('discord.js-commando');
const { Structures } = require('discord.js');
const path = require('path');
const { prefix, token } = require('./config.json');

Structures.extend('Guild', function(Guild) {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        volume: 1
      };
      this.triviaData = {
        isTriviaRunning: false,
        wasTriviaEndCalled: false,
        triviaQueue: [],
        triviaScore: new Map()
      };
    }
  }
  return MusicGuild;
});

const client = new CommandoClient({
  commandPrefix: prefix,
  owner: '211774244294623243',
  invite: 'https://discord.gg/ZsSx8XB'
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['music', 'Music Commands'],
    ['gif', 'GIF Generate'],
    ['moderation', 'Server Moderation'],
    ['auto', 'Auto Reply'],
    ['info', 'Informations'],
    ['others', 'Other Commands']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false,
    unknowmCommand: false,
    commandState: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
  console.log('Ready!');
  client.user.setActivity(`Music | ${prefix}help | ${client.registry.commands.size}`, {
    type: 'LISTENING'
  });
  
});

		client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'joins-and-leaves'); 
  if (!channel) return;
  channel.send(`Welcome ${member} | ${member.user.tag}!`);
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'joins-and-leaves'); 
  if (!channel) return;
  channel.send(`${member} | ${member.user.tag} has left the server.`);
});

client.login(token);