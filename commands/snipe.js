const { prefix } = require("../settings.json");
module.exports = {
    name: "snipe",
    description: "Poți vedea ultimele mesaje șterse",
    model: `${prefix} snipe [all sau nr. mesaj]`,
    permissions: [],
    aliases: ["lastmessagedelete"],
    async execute(option) {
        const { Discord, args, snipe, message } = option
        const getTarget = message.guild.members.cache.get(message.author.id)
        if(!args[0]) {
            let allow = false
            if(getTarget.roles.cache.has("988896327771500595")) allow = true
            if(getTarget.roles.cache.has("855068233240281099")) allow = true
            if(getTarget.permissions.has("ADMINISTRATOR")) allow = true
            if(getTarget.roles.cache.has("990311860295331890")) allow = true
            if(!allow) return message.channel.send("Din pacate nu ai acces la aceasta comanda")
            if(snipe.length === 0) return message.channel.send("nu sunt mesaje sterse!")
            let info = {
                messageAuthor: 0,
                time: 0,
                channelId: 0,
                messageContent: 0,
            }; let x = true;
            snipe.forEach(m => {
                if(m.channelId === message.channel.id) {
                    x = false
                    info.messageAuthor = m.messageAuthor
                    info.time = m.time
                    info.channelId = m.channelId
                    info.messageContent = m.messageContent
                    info.channelName = m.channelName
                }
            })
            if(x) {
                const lastArray = snipe[snipe.length-1]
                message.channel.send({embeds: [
                    new Discord.MessageEmbed({
                        color: "BLUE",
                        title: `Mesaj șters: <t:${Math.floor(lastArray.time / 1000)}:R>`,
                        description: `\`\`\`\n${lastArray.messageContent}\`\`\`Trimis de **${lastArray.messageAuthor}** pe canalul **${lastArray.channelName}**`,
                        footer: {text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL()},
                        timestamp: Date.now()
                    })
                ]})
            } else {
                message.channel.send({embeds: [
                    new Discord.MessageEmbed({
                        color: "BLUE",
                        title: `Mesaj șters: <t:${Math.floor(info.time / 1000)}:R>`,
                        description: `\`\`\`\n${info.messageContent}\`\`\`Trimis de **${info.messageAuthor}** pe canalul **${info.channelName}**`,
                        footer: {text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL()},
                        timestamp: Date.now()
                    })
                ]})
            }
        }
        if(args[0] === "all") {
            let allow = false
            if(getTarget.roles.cache.has("988896327771500595")) allow = true
            if(getTarget.permissions.has("ADMINISTRATOR")) allow = true
            if(getTarget.roles.cache.has("990312057796702209")) allow = true
            if(!allow) return message.channel.send("Din pacate nu ai acces la aceasta comanda")
            if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Nu ai permisiunea de a folosi aceasta comanda!\nÎncearcă să folosești doar \`ice snipe\`")
            let allMessage = ""
            if(snipe.length === 0) return message.channel.send("nu sunt mesaje sterse!")
            snipe.forEach(m => {
                if(m.messageContent.length > 300) {
                    allMessage += `\`\`\`\n${snipe.indexOf(m)+1}. ${m.messageContent.split("").splice(m.messageContent.length-300).join("")}...(more)\`\`\`Trimis de ${m.messageAuthor} pe canalul ${m.channelName}: ${m.time}\n\n`
                } else {
                    allMessage += `\`\`\`\n${snipe.indexOf(m)+1}. ${m.messageContent}\`\`\`Trimis de ${m.messageAuthor} pe canalul ${m.channelName}: <t:${Math.floor(m.time / 1000)}:R>\n\n`
                }
            })
            message.channel.send({embeds: [
                new Discord.MessageEmbed({
                    color: "BLUE",
                    title: "Ultimele 10 mesaje sterse, pentru detalii scrie \`ice snipe (nr.mes)\`",
                    description: allMessage,
                    footer: {text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL()},
                    timestamp: Date.now()
                })
            ]})
        }
        if(!isNaN(args[0])) {
            if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Nu ai permisiunea de a folosi aceasta comanda!\nÎncearcă să folosești doar \`ice snipe\`")
            if(args[0] > 10) return message.channel.send("Numarul trebuie sa fie mai mic decat 10")
            if(args[0] < 1) return message.channel.send("Numarul trebuie sa fie mai mare decat 1")
            if(args[0] > snipe.length) return message.channel.send("Nu sunt suficiente mesaje sterse!")
            message.channel.send({embeds: [
                new Discord.MessageEmbed({
                    color: "BLUE",
                    title: `Mesaj sters: <t:${Math.floor(snipe[args[0]-1].time / 1000)}:R>`,
                    description: `\`\`\`\n${snipe[args[0]-1].messageContent}\`\`\`Trimis de ${snipe[args[0]-1].messageAuthor} pe canalul ${snipe[args[0]-1].channelName}`,
                    footer: {text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL()},
                    timestamp: Date.now()
                })
            ]})
        }
    }
}