const { prefix } = require("../settings.json");
module.exports = {
    name: "ppsize",
    description: "Vezi marimea penisului prietenului tau sau a ta:D",
    model: `${prefix} penisrate [user]`,
    permissions: [],
    aliases: ["pp", "penis", "penissize", "penisrate", "psize", "ps"],
    async execute(option) {
        const { Discord, args, message } = option
        let target = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user || message.author;
        if(!target) return message.channel.send("Ceva nu a mers bine:(")
        const randomPenisSize = Math.floor(Math.random() * 30)
        let penisSize = "=";
        for(let i=0; i<Math.floor(randomPenisSize/1.5); i++) {
            penisSize += "="
        }
        const randomPenisNames = [ "dilgaului", "anacondei", "șarpelui", "furtunului", "veveriței", "dicului" ]
        const randomPenisName = randomPenisNames[Math.floor(Math.random() * randomPenisNames.length)]
        const wrongChange = Math.floor(Math.random() * 9 + 1)

        const ppEmbed = new Discord.MessageEmbed({
            color: "RANDOM",
            author: { name: `Mărimea ${randomPenisName} lui ${target.tag} este de ${randomPenisSize}cm`, icon_url: target.avatarURL() },
            description: `8${penisSize}D`,
            footer: {text: `cerut de: ${message.author.tag}`, iconURL: message.author.avatarURL()},
            timestamp: Date.now()
        })
        if(message.author.id == target.id) ppEmbed.footer = null
        if(wrongChange == 2) {
            ppEmbed.author.name = `La ${target.tag} nu-i gasim marimea ${randomPenisName}`
            ppEmbed.description = `Aici avem lipsa:(`
        }
        message.channel.send({embeds: [ppEmbed]})
    }
}