const fs = require("fs");
const { prefix } = require("../settings.json");
module.exports = {
    name: "help",
    description: "Vezi toate comenzile mele",
    model: `${prefix} help [Nume comanda]`,
    permissions: [],
    aliases: [],
    async execute(option) {
        const { client, Discord, args, message } = option
        let helpCmd = false; let findCmd = null;
        if(args[0]) {
            findCmd = client.commands.get(args[0]) || client.commands.find(c => c.aliases && c.aliases.includes(args[0]));
            if(findCmd) { helpCmd = true } else { findCmd = null }
        }
        if(helpCmd) {
            if(findCmd == null) return console.log("ceva nu a mers bine la comanda help cmd:(")
            const helpCmdEmbed = new Discord.MessageEmbed({
                color: "WHITE",
                author: { name: `Informații detaliate despre comanda: ${findCmd.name}` },
                fields: [
                    { name: 'Descriere', value: findCmd.description, inline: false, },
                    { name: 'Model', value: findCmd.model, inline: false, },
                ],
                footer: {text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL()},
                timestamp: Date.now()
            })
            if(findCmd.permissions.length != 0) helpCmdEmbed.addField("Permisiuni necesare", findCmd.permissions.join(", "), false)
            if(findCmd.aliases.length != 0) helpCmdEmbed.addField("Aliasuri", findCmd.aliases.join(", "), false)
            message.channel.send({embeds: [helpCmdEmbed]})
        } else {
            let allCMD = ''
            const files = require('../index').allCmdFile
            for(let i=0; i<files.length; i++) {
                const commands = require(`../commands/${files[i]}`)
                allCMD += `\`${commands.name}\`, `
            }
            allCMD += `\n\n> Pentru detalii \`ice help [nume comandă]\``
            message.channel.send({embeds: [new Discord.MessageEmbed({
                color: "WHITE",
                author: { name: "Toate comenzile mele!" },
                description: allCMD,
                footer: {text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL()},
                timestamp: Date.now()
            })]})
        }
    }
}