const { prefix } = require("../settings.json");
module.exports = {
    name: "user",
    description: "Ofera cateva informatii despre membri",
    model: `${prefix} user [user]`,
    permissions: [],
    aliases: [],
    async execute(option) {
        const { Discord, args, message } = option
        let target = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user || message.author;
        let nrDeInvitatii = 0;
        if(!target) return message.channel.send("Ceva nu a mers bine:(")
        await message.guild.invites.fetch().then((invites) => {
            invites.forEach(invite => {
                if(invite.inviter.id == target.id) { nrDeInvitatii += invite.uses } 
            })
        })
        const userInfoEmbed = new Discord.MessageEmbed({
            color: "GREEN",
            author: { name: `Informații despre ${target.tag}` },
            fields: [
                { name: 'A intrat cu', value: `<t:${Math.floor(getUser.joinedTimestamp / 1000)}:R>`, inline: false, },
                { name: 'User ID', value: target.id, inline: false, },
                { name: 'Invitații', value: nrDeInvitatii.toString(), inline: false, },
            ],
            footer: {text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL()},
            thumbnail: { url: target.avatarURL() },
            timestamp: Date.now()
        })
        if(message.author.id === target.id) userInfoEmbed.footer = null
        if(getUser.nickname != null) { userInfoEmbed.addField('Poreclă', getUser.nickname, false) }
        message.channel.send({embeds: [userInfoEmbed]})
    }
}