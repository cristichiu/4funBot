const { prefix } = require("../settings.json");
module.exports = {
    name: "clear",
    description: "Poti șterge mesajele",
    model: `${prefix} clear [nr]`,
    permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES", "MANAGE_GUILD"],
    aliases: [],
    async execute(option) {
        const { Discord, args, message } = option
        if(!args[0]) return message.channel.send("Ai uitat sa adaugi un numar (ATENTIE: trebuie sa fie mai mare decat 0 si mai mic decat 100).")
        if(isNaN(args[0])) return message.channel.send("Trebuie sa folosesti un numar!")
        if(args[0] < 1) return message.channel.send("Numarul trebuie sa fie mai mare decat 0.")
        if(args[0] > 100) return message.channel.send("Numarul trebuie sa fie mai mic decat 100")
        message.delete()
        message.channel.bulkDelete(args[0])
        const infoMes = await message.channel.send({embeds: [new Discord.MessageEmbed({
            color: "GREEN",
            title: `Tocmai au fost șterse ${args[0]} mesaje de catre ${message.author.tag}`,
            footer: {iconURL: message.author.avatarURL()},
            timestamp: Date.now()
        })]})
        setTimeout(async () => {
            infoMes.delete()
        }, 5000)
    }
}