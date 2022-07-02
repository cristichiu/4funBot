const { prefix } = require("../settings.json");
module.exports = {
    name: "avatar",
    description: "Vezi cat de frumos e prietenul tau:D",
    model: `${prefix} avatar [user]`,
    permissions: [],
    aliases: ["av", "pfp"],
    async execute(option) {
        const { Discord, args, message } = option
        let target = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user || message.author;
        if(!target) return message.channel.send("Ceva nu a mers bine:(")
        const avatarEmbed = new Discord.MessageEmbed({
            color: "RANDOM",
            author: { name: target.tag },
            image: { url: target.displayAvatarURL({ dynamic: true, size: 4096, format: 'png' }) },
            footer: {text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL()},
            timestamp: Date.now()
        })
        if(message.author.id === target.id) avatarEmbed.footer = null
        message.channel.send({embeds: [avatarEmbed]})
    }
}