const { prefix } = require("../settings.json");
module.exports = {
    name: "gayrate",
    description: "Vezi cât de gay ești tu sau prietenul tău",
    model: `${prefix} gayrate [user]`,
    permissions: [],
    aliases: ["gr", "gay"],
    async execute(option) {
        const { Discord, args, message } = option
        let target = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user || message.author;
        if(!target) return message.channel.send("Ceva nu a mers bine:(")
        const gayRate = Math.floor(Math.random() * 100)
        const gayEmbed = new Discord.MessageEmbed({
            color: "RANDOM",
            author: { name: `gay rate 3000 machine`, icon_url: target.avatarURL() },
            description: `${target.tag} este \`${gayRate}%\` gay!`,
            footer: {text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL()},
            timestamp: Date.now()
        })
        if(message.author.id === target.id) gayEmbed.footer = null
        message.channel.send({embeds: [gayEmbed]})
    }
}