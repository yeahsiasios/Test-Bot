const Discord = require('discord.js');
const fs = require('fs');
let prefixes = JSON.parse(fs.readFileSync("./Storage/prefixes.json", "utf8"));

module.exports.run = async (client, message, args, color, langUsing) => {

  let language = require(`../messages/messages_${langUsing}.json`);

  var argresult = message.content.substring(1).split("!");
  if(argresult[1] === undefined || argresult[2] === undefined) {

    let noArgumentsMessage = language["embed"].noArguments;
    const noArguments = noArgumentsMessage.replace("${prefix}", prefixes[message.guild.id].prefixes);

    message.channel.send(`${noArguments}`);
    return;

  };
    const embed = new Discord.RichEmbed()
    .setAuthor(`${argresult[1]}`, client.user.avatarURL)
    .setDescription(`${argresult[2]}`)
    .setThumbnail(client.user.avatarURL)
    .setFooter(`This guild's prefix is ${prefixes[message.guild.id].prefixes} || Developed by ♦ kMagic ♦#6276`, client.user.avatarURL)
    .setColor(color)

    message.channel.send({embed: embed})
};

module.exports.help = {
  name: 'embed'
}
