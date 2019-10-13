const Discord = require('discord.js');
const mcserver = require('mc-hermes');

module.exports.run = async (client, message, args, color, langUsing) => {

  let language = require(`../messages/messages_${langUsing}.json`);

  mcserver.pc({ server: args.join(" ") })
    .then((data)=>{

      let EmbedTitleMessage = language["mcserver"].embedTitle;
      const EmbedTitle = EmbedTitleMessage.replace("${server}", args.join(" "));

    	const embed = new Discord.RichEmbed()
    	.setAuthor(client.user.username, client.user.avatarURL)
    	.setTitle(`${EmbedTitle}`)
    	.addField(`${language["mcserver"].version}`, data.version.name)
    	.addField(`${language["mcserver"].players}`, `${data.players.online}/${data.players.max}`)
      .setImage(`https://mcapi.us/server/image?ip=${args.join(" ")}&theme=dark`)
    	.setColor(color)
    	.setTimestamp()

      if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
        message.channel.send(`${language["mcserver"].noEmbedPermission}`);
        return;
      };

    	message.channel.send({embed: embed});
    });
};

module.exports.help = {
  name: 'mcserver'
}
